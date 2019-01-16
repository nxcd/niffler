const expresso = require('@expresso/expresso')

import { routes} from './routes'
import { Express } from 'express'
import multerS3 from './lib/multerS3'
import middlewares from './middlewares'
import { IAppConfig } from '../app-config'

export const app = expresso(async (app: Express, config: IAppConfig) => {
  const { storage } = multerS3.factory({ ...config.storage })

  const multerMiddlewareUpload = middlewares.multer.upload(storage, { ...config.multer })

  app.post('/', routes.upload.factory(multerMiddlewareUpload))
})
