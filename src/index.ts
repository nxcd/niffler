import * as server from './presentation/server'

server.start()
  .catch(err => {
    console.error('Fatal Error\n================')
    console.error(err)
    process.exit(1)
  })
