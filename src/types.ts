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

export interface NotificationEntry {
  id: number
  channel: Channel
  category: Category
  userName: string
  message: string
  status: string
  created_at: string
}

export interface User {
  id: number
  name: string
  phone_number: string
  subscribed: Category[]
  channels: Channel[]
  email: string
  password: string
}

export interface LoginSucessResponse {
  success: boolean
  message: string
  categories: Category[]
  token: string
  name: string
}

export type LoginRequest = Omit<User, 'id' | 'name' | 'phone_number' | 'subscribed' | 'channels'>

export type NewNotificationEntry = Omit<NotificationEntry, 'id' | 'status' | 'created_at'>
