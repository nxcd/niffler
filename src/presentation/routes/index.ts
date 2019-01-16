import { RequestHandler } from 'express'
import { IRouteFactory } from '../structures/interfaces/IRouteMap'

interface IRoutes {
  upload: IRouteFactory<RequestHandler>
}

export const routes: IRoutes = {
  upload: require('./upload')
}
