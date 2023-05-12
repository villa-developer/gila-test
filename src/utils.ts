import { Category, Channel, LoginRequest, LoginSucessResponse, NewNotificationEntry, User } from './types'

const isString = (string: string): boolean => {
  return typeof string === 'string'
}

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date))
// }

const isCategory = (string: any): boolean => {
  return Object.values(Category).includes(string)
}

const isChannel = (string: any): boolean => {
  return Object.values(Channel).includes(string)
}

const parseChannel = (channelFromRequest: any): Channel => {
  if (!isString(channelFromRequest) || !isChannel(channelFromRequest)) {
    throw new Error('Incorrect or misising channel')
  }

  return channelFromRequest
}

const parseCategory = (categoryFromRequest: any): Category => {
  if (!isString(categoryFromRequest) || !isCategory(categoryFromRequest)) {
    throw new Error('Incorrect or misising category')
  }

  return categoryFromRequest
}

const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest)) {
    throw new Error('Incorrect or missing name')
  }

  return nameFromRequest
}

const parseMessage = (commentFormRequest: any): string => {
  if (!isString(commentFormRequest)) {
    throw new Error('Incorrect or missing message')
  }

  return commentFormRequest
}

const parseString = (stringFromRequest: any, key: string): string => {
  if (!isString(stringFromRequest)) {
    throw new Error(`Incorrect or missing ${key}`)
  }

  return stringFromRequest
}

// const parseStatus = (statusFromRequest: any): string => {
//   if (!isString(statusFromRequest)) {
//     throw new Error('Incorrect or missing status')
//   }

//   return statusFromRequest
// }

// const parseCreatedAt = (createdAtFromRequest: any): string => {
//   if (!isString(createdAtFromRequest) || !isDate(createdAtFromRequest)) {
//     throw new Error('Incorrect or missing date')
//   }

//   return createdAtFromRequest
// }

export const toNewNotificationEntry = (object: any, user: User): NewNotificationEntry => {
  const newNotification: NewNotificationEntry = {
    channel: parseChannel(user.channels[0]),
    category: parseCategory(object.category),
    userName: parseName(user.name),
    message: parseMessage(object.message)
  }

  return newNotification
}

export const toLoginRequest = (object: any): LoginRequest => {
  const loginRequest: LoginRequest = {
    email: parseString(object.email, 'email'),
    password: parseString(object.password, 'password')
  }

  return loginRequest
}

export const toLoginSuccessResponse = (message: string, categories: Category[], token: string, name: string): LoginSucessResponse => {
  const response: LoginSucessResponse = {
    success: true,
    message,
    categories,
    token,
    name
  }

  return response
}
