import multer, { StorageEngine as MulterStorageEngine } from 'multer'
import { RequestHandler } from 'express'
import { IMulterConfig } from '../../app-config';

export function upload (storage: MulterStorageEngine, { maxUploadSize }: IMulterConfig): RequestHandler {
  return multer({ storage, limits: { fileSize: maxUploadSize } })
    .single('file')
}
