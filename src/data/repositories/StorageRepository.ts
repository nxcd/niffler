import { S3 } from 'aws-sdk'
import { IFile } from '../../domain/structures/interfaces/IFile'

export interface IStorageRepositoryConfig {
  ttl: number,
  bucket: string
}

export class StorageRepository {
  private readonly s3: S3
  private readonly ttl: number
  private readonly bucket: string

  constructor (s3: S3, { bucket, ttl }: IStorageRepositoryConfig) {
    this.s3 = s3
    this.ttl = ttl
    this.bucket = bucket
  }

  async findById (id: string): Promise<IFile> {
    const {
      ContentType: mimetype,
      ContentLength: size,
      LastModified: createdAt,
      Metadata: metadata
    } = await this.s3.getObject({ Key: id, Bucket: this.bucket })
      .promise()

    const { name } = metadata || { name: '' }

    const signedUrl = this.s3.getSignedUrl('getObject', {
      Key: id,
      Expires: this.ttl,
      Bucket: this.bucket,
      ResponseContentDisposition: `attachment; filename ="${name}"`
    })

    const file = {
      id,
      name,
      signedUrl,
      mimetype: mimetype || '',
      size: size || 0,
      createdAt: createdAt || ''
    }

    return file
  }
}
