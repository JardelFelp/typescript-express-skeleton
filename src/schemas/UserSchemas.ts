import Joi from 'joi'

export const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
})
