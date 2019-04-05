const expresso = require('@expresso/expresso')

import { routes } from './routes'
import { Express } from 'express'
import S3 from '../data/storage/S3'
import { IAppConfig } from '../app-config'

import { StorageService } from '../services/StorageService'
import { StorageRepository } from '../data/repositories/StorageRepository'

export const app = expresso(async (app: Express, config: IAppConfig) => {
  const s3Client = S3.createClient(config.s3)

  const storageRepository = new StorageRepository(s3Client, { bucket: config.s3.bucket, ttl: config.s3.signedUrlTtl })
  const storageService = new StorageService(storageRepository)

  app.get('/:file', routes.find.factory(storageService))
  app.post('/', routes.upload.factory(s3Client, config.s3))
})
