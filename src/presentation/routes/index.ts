import { RequestHandler } from 'express'
import { IRouteFactory } from '../structures/interfaces/IRouteMap'
import { StorageService } from '../../services/StorageService'

interface IRoutes {
  upload: IRouteFactory<RequestHandler>,
  find: IRouteFactory<StorageService>
}

export const routes: IRoutes = {
  upload: require('./upload'),
  find: require('./find')
}
