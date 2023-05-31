import { UserCreationAttributes } from '../types'
import User from '../models/users'
import usersData from './../mock/users.json'

class UserController {
  users: UserCreationAttributes[] = []

  constructor () {
    this.users = usersData as UserCreationAttributes[]
  }

  public index (_req: any, res: any): void {
    res.send(this.users)
  }

  public async createUsers (): Promise<void> {
    try {
      const users = await User.findAll()
      if (users.length === 0) {
        await User.bulkCreate(usersData)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserController
