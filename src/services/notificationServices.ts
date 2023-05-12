import { Category, NewNotificationEntry, NotificationEntry, User } from '../types'
import notificationData from './notifications.json'
import usersData from './users.json'

const notifications: NotificationEntry[] = notificationData as NotificationEntry[]
const users: User[] = usersData as User[]

export const getNotifications = (): NotificationEntry[] => notifications

export const findById = (id: number): NotificationEntry | undefined => {
  const notification = notifications.find(notification => notification.id === id)
  if (notification != null) {
    return notification
  }

  return undefined
}

export const addNotification = (newNotification: NewNotificationEntry): NotificationEntry => {
  const timeElapsed = Date.now()
  const today = new Date(timeElapsed)

  const newEntry = {
    id: Math.max(...notifications.map(d => d.id)) + 1,
    status: 'sended',
    created_at: today.toISOString(),
    ...newNotification
  }

  notifications.push(newEntry)

  return newEntry
}

export const getUsers = (category: Category): User[] => {
  const subscribedUsers = users.filter(user => { return user.subscribed.includes(category) })
  return subscribedUsers
}
