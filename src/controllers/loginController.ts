import User from '../models/users'
import { Category, LoginRequest, LoginSucessResponse, Response } from '../types'
import { parseString } from '../utils/validations'

export default class LoginController {
  public async signin (req: any, res: any): Promise<any> {
    const response: Response = {
      success: false,
      message: '',
      data: []
    }

    try {
      const loginRequest = this.toLoginRequest(req.body)
      const user = await User.findOne({ where: loginRequest })

      if (user != null) {
        const categoties: Category[] = user.subscribed.split(',') as Category[]
        const data: LoginSucessResponse = {
          name: user.name,
          token: user.id,
          categories: categoties
        }

        response.success = true
        response.data.push(data)
        return res.send(response)
      }

      response.message = 'Invalid email or password'
      return res.status(400).send(response)
    } catch (error: any) {
      response.message = error.message
      return res.status(400).send(response)
    }
  }

  private toLoginRequest (object: any): LoginRequest {
    const loginRequest: LoginRequest = {
      email: parseString(object.email, 'email'),
      password: parseString(object.password, 'password')
    }

    return loginRequest
  }
}
