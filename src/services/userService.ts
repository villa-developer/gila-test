import { LoginRequest, User } from '../types'
import usersData from './users.json'
const users: User[] = usersData as User[]

export const doLogin = (request: LoginRequest): User | undefined => {
  const user = users.find(user => { return user.email === request.email && user.password === request.password })

  if (user !== null) {
    return user
  }

  return undefined
}
