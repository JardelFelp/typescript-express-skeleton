import express, { Router } from 'express'
import path from 'path'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import ExpressJoiValidation from 'express-joi-validation'

import swaggerDocumentation from '../docs/swagger'
import UserController from '../controllers/UserController'
import { createUserSchema } from '../schemas/UserSchemas'

const validator = ExpressJoiValidation.createValidator({})

class Routes {
  public router: Router
  protected userController: UserController

  constructor () {
    this.userController = new UserController()

    this.router = express.Router()

    this.initializeDotnevSafe()
    this.initializeSwagger()
    this.initializeRoutes()
  }

  private initializeDotnevSafe (): void {
    const nodeEnv = process.env.NODE_ENV || 'development'
    dotenv.config({
      path: path.resolve(__dirname, `../../env/.env.${nodeEnv}`)
    })
  }

  private initializeSwagger (): void {
    this.router.use('/swagger', swaggerUi.serve)
    this.router.get('/swagger', swaggerUi.setup((swaggerDocumentation)))
  }

  private initializeRoutes (): void {
    this.router.get('/user', this.userController.list)
    this.router.post('/user', validator.body(createUserSchema), this.userController.create)
  }
}

export default new Routes()
