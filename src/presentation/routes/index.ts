import { RequestHandler } from 'express'
import { IRouteFactory } from '../structures/interfaces/IRouteMap'
import { StorageService } from '../../services/StorageService'

interface IRoutes {
  find: IRouteFactory<StorageService>,
  upload: IRouteFactory<RequestHandler>,
  download: IRouteFactory<StorageService>
}

export const routes: IRoutes = {
  find: require('./find'),
  upload: require('./upload'),
  download: require('./download')
}
