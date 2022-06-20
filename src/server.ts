import { bootstrap } from './bootstrap'

import app from './app'
import express from 'express'

bootstrap(() => {
  console.log('[info] Initializing express application')
  app.use(express.json())

  app.use(express.urlencoded({ extended: true }))

  app.get('/', (req, res) => {
    res.send('Welcome do Node Express Skeleton')
  })

  app.listen(process.env.PORT || 3333, '0.0.0.0')
})
