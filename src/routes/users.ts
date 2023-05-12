import express from 'express'
import * as UserService from './../services/userService'
import { toLoginRequest, toLoginSuccessResponse } from '../utils'
const router = express.Router()

router.post('/signin', (req, res) => {
  const response = {
    success: false,
    message: ''
  }

  try {
    const loginRequest = toLoginRequest(req.body)
    const user = UserService.doLogin(loginRequest)
    if (user != null) {
      const successReponse = toLoginSuccessResponse('Success Login', user.subscribed, user.id.toString(), user.name)
      return res.send(successReponse)
    }

    return res.status(400).send(response)
  } catch (error: any) {
    return res.status(400).send(response)
  }
})

export default router
