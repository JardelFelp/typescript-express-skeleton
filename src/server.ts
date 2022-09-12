import { bootstrap } from './bootstrap'

import App from './app'
import express from 'express'

bootstrap(() => {
  const { express: app } = new App()
  app.use(express.json())

  app.use(express.urlencoded({ extended: true }))

  app.get('/', (req, res) => {
    res.send('Welcome do Node Express Skeleton')
  })

  app.listen(process.env.PORT || 3333)
})
