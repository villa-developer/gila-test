import Notification from '../../models/notifications'
import { Channel, NotificationCreationAttributes } from '../../types'
import Sender from './Sender'

export default class SmsChannel extends Sender {
  name: string

  constructor (notification: NotificationCreationAttributes) {
    super(notification)
    this.name = Channel.Sms
  }

  async send (): Promise<boolean> {
    try {
      const newNotification = await Notification.create(this.notification)
      if (newNotification instanceof Notification) {
        return true
      }

      return false
    } catch (_error) {
      return false
    }
  }
}
