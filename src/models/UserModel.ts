import Mongoose from 'mongoose'

export const UserSchema = new Mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
})

export const UserModel = Mongoose.model('User', UserSchema)
