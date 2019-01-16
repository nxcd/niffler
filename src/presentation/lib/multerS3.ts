import path from 'path'
import uuid from 'uuid/v1'
import { StorageEngine as MulterStorageEngine } from 'multer'
import mime from 'mime-types'
import multerS3 from 'multer-s3'
import S3 from 'aws-sdk/clients/s3'


export interface IMulterFactoryParams {
  bucket: string,
  endpoint: string,
  credentials: {
    accessKeyId: string,
    secretAccessKey: string
  }
}

export function factory ({ bucket, endpoint, credentials: { accessKeyId, secretAccessKey }  }: IMulterFactoryParams): { storage: MulterStorageEngine, s3: S3 } {
  const s3 = new S3({
    endpoint,
    accessKeyId,
    secretAccessKey,
    s3ForcePathStyle: true,
    signatureVersion: 'v4'
  })

  const storage = multerS3({
    s3,
    bucket,
    key: (_req, _file, cb) => cb(null, uuid()),
    metadata: (_req, file, cb) => cb(null, {
      name: path.basename(file.originalname),
      enconding: file.encoding
    }),
    contentType: (_req, file, cb) => {
      return cb(null, mime.lookup(file.originalname) || multerS3.AUTO_CONTENT_TYPE.toString())
    }
  })

  return { storage, s3 }
}
