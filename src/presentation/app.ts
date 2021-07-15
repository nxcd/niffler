import expresso from '@expresso/app'
import errors from '@expresso/errors'

import { routes } from './routes'
import S3 from '../data/storage/S3'
import { IAppConfig } from '../app-config'

import { StorageService } from '../services/StorageService'
import { StorageRepository } from '../data/repositories/StorageRepository'

export const app = expresso(async (app, config: IAppConfig, environment) => {
  const s3Client = S3.createClient(config.s3)

  const storageRepository = new StorageRepository(s3Client, { bucket: config.s3.bucket, ttl: config.s3.signedUrlTtl })
  const storageService = new StorageService(storageRepository)

  app.get('/download/*', routes.download.factory(storageService))
  app.get('/*', routes.find.factory(storageService))
  app.post('/*', routes.upload.factory(s3Client, config.s3))

  app.use(errors(environment))
})
