const rescue = require('express-rescue')
const { HttpError } = require('@expresso/expresso')

import { Request, Response } from 'express'
import { Instance as MulterInstance } from 'multer'

type ExtendedRequest = Request & { file: { key: string } }

export function factory (uploadMinioMidleware: MulterInstance) {
  return ([
    uploadMinioMidleware,
    rescue(async function uploadRoute (req: ExtendedRequest, res: Response) {
      if(!req.file) {
        throw new HttpError.UnprocessableEntity({ message: 'missing file' })
      }

      res.status(201)
        .json({ id: req.file.key })
    })
  ])
}
