const rescue = require('express-rescue')
const { HttpError } = require('@expresso/expresso')

import { Request, Response, RequestHandler } from 'express'

type ExtendedRequest = Request & { file: { key: string } }

export function factory (uploadMinioMidleware: RequestHandler): RequestHandler[] {
  return ([
    uploadMinioMidleware,
    rescue(async (req: ExtendedRequest, res: Response) => {
      if(!req.file) {
        throw new HttpError.UnprocessableEntity({ message: 'missing file' })
      }

      res.status(201)
        .json({ id: req.file.key })
    })
  ])
}
