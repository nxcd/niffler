const rescue = require('express-rescue')
const { HttpError } = require('@expresso/expresso')

import { AWSError } from 'aws-sdk'
import { StorageService } from '../../services/StorageService'
import { Request, Response, RequestHandler, NextFunction } from 'express'

export function factory (service: StorageService): RequestHandler[] {
  return [
    rescue(async (req: Request, res: Response) => {
      const file = await service.find(req.params[0])

      res.status(200)
        .json(file)
    }),
    (err: AWSError, _req: Request, _res: Response, next: NextFunction) => {
      if (err.statusCode === 404) {
        throw new HttpError.NotFound({ code: err.code, message: err.message })
      }

      next(err)
    }
  ]
}
