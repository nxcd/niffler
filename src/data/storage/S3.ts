import S3 from 'aws-sdk/clients/s3'

export interface IS3StorageParams {
  bucket: string,
  endpoint: string,
  credentials: {
    accessKeyId: string,
    secretAccessKey: string
  }
}

export function getInstance ({ endpoint, credentials: { accessKeyId, secretAccessKey } }: IS3StorageParams): S3 {
  return new S3({
    endpoint,
    accessKeyId,
    secretAccessKey,
    s3ForcePathStyle: true,
    signatureVersion: 'v4'
  })
}

export default { createClient: getInstance }
