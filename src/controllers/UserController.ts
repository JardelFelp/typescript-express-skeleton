import { Request, Response } from 'express'
import { UserModel } from '../models/UserModel'

class UserController {
  public async create(request: Request, response: Response) {
    try {
      const { body: user } = request.body

      const userResponse = await UserModel.create(user)

      response.send(userResponse)
    } catch (error) {
      response.status(404).send(error)
    }
  }

  public async list(request: Request, response: Response) {
    try {
      const userResponse = await UserModel.find()

      response.send(userResponse)
    } catch (error) {
      response.status(404).send(error)
    }
  }
}

export default UserController
