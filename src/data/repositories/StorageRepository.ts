import { S3 } from 'aws-sdk'
import { IFile } from '../../domain/structures/interfaces/IFile'

export interface IStorageRepositoryFindConfig {
  ttl: number
}

export class StorageRepository {
  private readonly s3: S3
  private readonly bucket: string

  constructor (s3: S3, bucket: string) {
    this.s3 = s3
    this.bucket = bucket
  }

  async findById (id: string, { ttl }: IStorageRepositoryFindConfig): Promise<IFile> {
    const {
      ContentType: mimetype,
      ContentLength: size,
      LastModified: createdAt,
      Metadata: metadata
    } = await this.s3.getObject({ Key: id, Bucket: this.bucket })
      .promise()

    const signedUrl = this.s3.getSignedUrl('getObject', {
      Key: id,
      Expires: ttl,
      Bucket: this.bucket
    })

    const { name, enconding } = metadata || { name: '', enconding: '' }

    const file = {
      id,
      name,
      enconding,
      signedUrl,
      mimetype: mimetype || '',
      size: size || 0,
      createdAt: createdAt || ''
    }

    return file
  }
}
