const env = require('sugar-env')

export interface IStorageConfig {
  signedUrlTtl: number,
  bucket: string,
  credentials: {
    accessKeyId: string,
    secretAccessKey: string
  },
  endpoint: string,
  hashingAlgorithm: string
}

export interface IMulterConfig {
  maxUploadSize: number
}

export interface IAppConfig {
  s3: IStorageConfig,
  multer: IMulterConfig
}

export const config: IAppConfig = {
  s3: {
    signedUrlTtl: env.get('STORAGE_SIGNEDURL_TTL', 3000),
    bucket: env.get('STORAGE_BUCKET'),
    credentials: {
      accessKeyId: env.get('STORAGE_CREDENTIALS_ACCESS_KEY_ID'),
      secretAccessKey: env.get('STORAGE_CREDENTIALS_SECRET_ACCESS_KEY')
    },
    endpoint: env.get('STORAGE_ENDPOINT'),
    hashingAlgorithm: env.get('STORAGE_HASHING_ALGORITHM', 'sha256')
  },
  multer: {
    maxUploadSize: env.get('STORAGE_MAX_UPLOAD_SIZE', 5 * 1024 * 1024)
  }
}
