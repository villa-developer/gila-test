import Notification from '../models/notifications'
import User from '../models/users'
import { Category, Channel, NotificationCreationAttributes, Response } from '../types'
import Express from 'express'
import { Op } from 'sequelize'
import Sender from './channels/Sender'
import EmailChannel from './channels/EmailChannel'
import PushChannel from './channels/PushChannel'
import SmsChannel from './channels/SmsChannel'
import { parseCategory, parseChannel, parseMessage, parseName } from '../utils/validations'

export default class NotificationsController {
  async index (_req: Express.Request, res: Express.Response): Promise<Express.Response> {
    const response: Response = {
      success: false,
      message: '',
      data: []
    }

    try {
      const notifications = await Notification.findAll()
      if (notifications.length > 0) {
        response.success = true
        response.data = notifications
        return res.send(response)
      }

      response.message = 'There are not notification entries'
      return res.send(response)
    } catch (_error) {
      return res.send(response)
    }
  }

  async store (req: Express.Request, res: Express.Response): Promise<any> {
    const response: Response = {
      success: false,
      message: '',
      data: []
    }

    try {
      let successfulNotifications: number = 0
      let failureNotification: number = 0
      const category: Category = req.body.category as Category
      const users = await User.findAll({
        where: {
          subscribed: {
            [Op.like]: `%${category.trim()}%`
          }
        }
      })

      if (users.length > 0) {
        for (const user of users) {
          const notificationEntry = this.toNewNotificationEntry(req.body, user)
          if (await this.send(notificationEntry)) {
            successfulNotifications++
          } else {
            failureNotification++
          }
        }
        response.success = true
        response.message = `${successfulNotifications} notification were sent successfuly and ${failureNotification} failed`
        return res.send(response)
      }
      response.message = `There are not users subscribed to ${category} category`
      return res.send(response)
    } catch (error: any) {
      response.message = error.message
      res.send(response)
    }
  }

  private async send (notification: NotificationCreationAttributes): Promise<boolean> {
    let sender: Sender
    switch (notification.channel) {
      case Channel.Mail:
        sender = new EmailChannel(notification)
        break
      case Channel.Push:
        sender = new PushChannel(notification)
        break
      case Channel.Sms:
        sender = new SmsChannel(notification)
        break
      default:
        return false
    }

    return await sender.send()
  }

  private toNewNotificationEntry (object: any, user: User): NotificationCreationAttributes {
    const channel: string = user.channels.split(',')[0]
    const newNotification: NotificationCreationAttributes = {
      userId: user.id,
      channel: parseChannel(channel),
      category: parseCategory(object.category),
      userName: parseName(user.name),
      message: parseMessage(object.message),
      status: 'sended'
    }

    return newNotification
  }
}
