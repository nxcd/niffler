import fs from 'fs'
import env from 'sugar-env'
import { IExpressoConfigOptions } from '@expresso/app'

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

export interface IAppConfig extends IExpressoConfigOptions {
  s3: IStorageConfig,
  multer: IMulterConfig
}

function buildConfigFile (): any {
  return JSON.parse(fs.readFileSync(configFilePath, 'utf8'))
}

const configFilePath = env.get('ENVIRONMENT_CONFIG_FILE')
const configFile = configFilePath ? buildConfigFile() : {}

function getEnv (envName: string, defaultValue: any): any {
  if (configFilePath) {
    return configFile[envName] || defaultValue
  }

  return env.get(envName, defaultValue)
}

export const config: IAppConfig = {
  name: 'niffler',
  s3: {
    signedUrlTtl: getEnv('STORAGE_SIGNEDURL_TTL', 3000),
    bucket: getEnv('STORAGE_BUCKET', 'niffler'),
    credentials: {
      accessKeyId: getEnv('STORAGE_CREDENTIALS_ACCESS_KEY_ID', ''),
      secretAccessKey: getEnv('STORAGE_CREDENTIALS_SECRET_ACCESS_KEY', '')
    },
    endpoint: getEnv('STORAGE_ENDPOINT', ''),
    hashingAlgorithm: getEnv('STORAGE_HASHING_ALGORITHM', 'sha256')
  },
  multer: {
    maxUploadSize: getEnv('STORAGE_MAX_UPLOAD_SIZE', 5 * 1024 * 1024)
  }
}
