import { Optional } from 'sequelize'

export interface ISend {
  send: () => Promise<boolean>
}

export enum Channel {
  Sms = 'sms',
  Mail = 'e-mail',
  Push = 'push notification'
}

export enum Category {
  Sport = 'sport',
  Finance = 'finance',
  Movies = 'movies'
}

export interface NotificationAttributes {
  id: number
  userId: number
  channel: Channel
  category: Category
  userName: string
  message: string
  status: string
}

export interface Response {
  success: boolean
  message: string
  data: any
}

export interface LoginSucessResponse {
  categories: Category[]
  token: string
  name: string
}

export interface UserAttributes {
  id: number
  name: string
  email: string
  phone_number: string
  subscribed: string
  channels: string
  password: string
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export type LoginRequest = Omit<UserAttributes, 'id' | 'name' | 'phone_number' | 'subscribed' | 'channels'>

export type NotificationCreationAttributes = Omit<NotificationAttributes, 'id'>
