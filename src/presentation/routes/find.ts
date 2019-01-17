const rescue = require('express-rescue')
const { validate } = require('@expresso/expresso')

import { Request, Response, RequestHandler } from 'express'
import { StorageService } from '../../services/StorageService'

export function factory (service: StorageService): RequestHandler[] {
  return [
    validate.query({
      type: 'object',
      properties: {
        ttl: {
          type: 'number'
        }
      }
    }),
    rescue(async (req: Request, res: Response) => {
      const { params: { file: fileId }, query: { ttl } } = req
      const file = await service.find(fileId, { ttl })

      res.status(200)
        .json(file)
    })
  ]
}
