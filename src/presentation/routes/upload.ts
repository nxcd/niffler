import uuid from 'uuid/v4'
import Busboy from 'busboy'
import crypto from 'crypto'
import stream from 'stream'
import mime from 'mime-types'
import S3 from 'aws-sdk/clients/s3'
import { boom } from '@expresso/errors'
const rescue = require('express-rescue')
import { IStorageConfig } from '../../app-config'
import { Request, Response, RequestHandler, NextFunction } from 'express'

export function factory (s3Client: S3, { hashingAlgorithm, bucket }: IStorageConfig): RequestHandler[] {
  return ([
    rescue(async (req: Request, res: Response, next: NextFunction) => {
      const boy = new Busboy({ headers: req.headers })
      let fileWasFound = false

      boy.on('file', async (fieldName, file, fileName = '') => {
        if (fieldName !== 'file') {
          file.resume()
          return
        }

        fileWasFound = true

        const passStream = new stream.PassThrough()
        const hash = crypto.createHash(hashingAlgorithm)

        file.on('data', chunk => { hash.update(chunk); passStream.write(chunk) })
        file.on('end', () => { passStream.end() })

        const [ subDir ] = Object.values(req.params)

        const fileKey = subDir ? `${subDir}/${uuid()}` : uuid()

        await s3Client.upload({
          Key: fileKey,
          Bucket: bucket,
          Body: passStream,
          ContentType: mime.lookup(fileName) || undefined,
          Metadata: {
            name: fileName.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
            uploadedBy: req.header('x-on-behalf-of') || 'unknown'
          }
        }).promise()

        const copySource = encodeURI(`${bucket}/${fileKey}`)
        const sha256 = hash.digest('hex')
        const sha256Key = subDir ? `${subDir}/${sha256}` : sha256

        await s3Client.copyObject({ Bucket: bucket, Key: sha256Key, CopySource: copySource }).promise()
        await s3Client.deleteObject({ Bucket: bucket, Key: fileKey }).promise()

        res.status(201)
          .json({ id: sha256Key })
      })

      boy.on('finish', () => {
        if (!fileWasFound) {
          next(boom.badData('missing file', { code: 'missing_file' }))
        }
      })

      req.pipe(boy)
    })
  ])
}
