import { app } from './app'
import server from '@expresso/server'
import { config } from '../app-config'

export function start () {
  return server.start(app, config)
}
