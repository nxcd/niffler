const env = require('sugar-env')

export interface IStorageConfig {
  signedUrlTtl: number,
  bucket: string,
  credentials: {
    accessKeyId: string,
    secretAccessKey: string
  },
  endpoint: string
}

export interface IMulterConfig {
  maxUploadSize: number
}

export interface IAppConfig {
  storage: IStorageConfig,
  multer: IMulterConfig
}

export const config: IAppConfig = {
  storage: {
    signedUrlTtl: env.get('STORAGE_SIGNEDURL_TTL', 3000),
    bucket: env.get('STORAGE_BUCKET'),
    credentials: {
      accessKeyId: env.get('STORAGE_CREDENTIALS_ACCESS_KEY_ID'),
      secretAccessKey: env.get('STORAGE_CREDENTIALS_SECRET_ACCESS_KEY')
    },
    endpoint: env.get('STORAGE_ENDPOINT')
  },
  multer: {
    maxUploadSize: env.get('STORAGE_MAX_UPLOAD_SIZE', 5 * 1024 * 1024)
  }
}
