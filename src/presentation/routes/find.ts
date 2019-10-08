import rescue from 'express-rescue'

import { Request, Response, RequestHandler } from 'express'
import { StorageService } from '../../services/StorageService'

export function factory (service: StorageService): RequestHandler[] {
  return [
    rescue(async (req: Request, res: Response) => {
      const file = await service.find(req.params[0])

      res.status(200)
        .json(file)
    })
  ]
}
