const expresso = require('@expresso/expresso')

import { routes } from './routes'
import { Express } from 'express'
import multerS3 from './lib/multerS3'
import middlewares from './middlewares'
import { IAppConfig } from '../app-config'

import { StorageService } from '../services/StorageService'
import { StorageRepository } from '../data/repositories/StorageRepository'

export const app = expresso(async (app: Express, config: IAppConfig) => {
  const { storage, s3 } = multerS3.factory({ ...config.storage })

  const multerMiddlewareUpload = middlewares.multer.upload(storage, { ...config.multer })

  const storageRepository = new StorageRepository(s3, { bucket: config.storage.bucket, ttl: config.storage.signedUrlTtl })
  const storageService = new StorageService(storageRepository)

  app.get('/:file', routes.find.factory(storageService))
  app.post('/', routes.upload.factory(multerMiddlewareUpload))
})
