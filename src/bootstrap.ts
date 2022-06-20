import path from 'path'
import dotenv from 'dotenv'
import Mongoose from 'mongoose'

import RequireDir from 'require-dir'

const initializeDotEnv = () => {
  const nodeEnv = process.env.NODE_ENV || 'production'
  console.log(`[info] Application started. Enviroment: ${nodeEnv}`)

  dotenv.config({
    path: path.resolve(__dirname, `../../env/.env.${nodeEnv}`)
  })
}

export const bootstrap = (callback = () => null) => {
  try {
    initializeDotEnv()

    if (process.env.MONGO_CONNECTION_STRING) {
      Mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })

      RequireDir('./models')

      console.log('[info] Database successfully connected')
    }

    callback()
  } catch (error) {
    console.error('[error] Erro ao inicializar Mongo', error)
    setTimeout(() => bootstrap(callback), 10000)
  }
}
