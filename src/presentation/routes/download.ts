const rescue = require('express-rescue')
const { boom } = require('@expresso/errors')

import { AWSError } from 'aws-sdk'
import { StorageService } from '../../services/StorageService'
import { Request, Response, RequestHandler, NextFunction } from 'express'

export function factory (service: StorageService): RequestHandler[] {
  return [
    rescue(async (req: Request, res: Response) => {
      const file = await service.download(req.params[0])

      res.status(200).send(file)
    }),
    (err: AWSError, _req: Request, _res: Response, next: NextFunction) => {
      if (err.statusCode === 404) {
        throw new boom.notFound(err.message)
      }

      next(err)
    }
  ]
}
