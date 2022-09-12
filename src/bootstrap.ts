import path from 'path'
import dotenv from 'dotenv'
import Mongoose, { ConnectOptions } from 'mongoose'

import RequireDir from 'require-dir'

const initializeDotEnv = () => {
  const nodeEnv = process.env.NODE_ENV || 'production'
  console.log(`[INFO] Application started. Enviroment: ${nodeEnv}`)

  dotenv.config({
    path: path.resolve(__dirname, `../../env/.env.${nodeEnv}`)
  })
}

export const bootstrap = async(callback: () => void) => {
  try {
    initializeDotEnv()

    if (process.env.MONGO_CONNECTION_STRING) {
      await Mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as ConnectOptions)

      RequireDir('./models')

      console.log('[INFO] Database successfully connected')
    }

    callback()
  } catch (error) {
    console.error('[ERROR] Trying again in 10 seconds')
    console.error(error)
    setTimeout(() => bootstrap(callback), 10000)
  }
}
