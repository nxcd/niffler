const expresso = require('@expresso/expresso')

import routes from './routes'
import { Express } from 'express'
import { IAppConfig } from '../app-config'
import { factory as multerS3 } from './lib/multerS3'
import { upload as MulterMiddlewareUpload } from './middlewares/Multer'

export const app = expresso(async (app: Express, config: IAppConfig) => {
  const { storage } = multerS3({ ...config.storage })

  const multerMiddlewareUpload = MulterMiddlewareUpload(storage, { ...config.multer })

  app.post('/', routes.upload.factory(multerMiddlewareUpload))
})
