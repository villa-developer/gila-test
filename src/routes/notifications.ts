import express from 'express'
import * as notificationService from './../services/notificationServices'
import { toNewNotificationEntry } from '../utils'
const router = express.Router()

router.get('/', (_req, res) => {
  res.send(notificationService.getNotifications())
})

router.get('/:id', (req, res) => {
  res.send(notificationService.findById(+req.params.id))
})

router.post('/', (req, res) => {
  const response = {
    success: false,
    message: ''
  }

  try {
    const users = notificationService.getUsers(req.body.category)
    console.log(users.length)
    if (users.length > 0) {
      let notificationsSended = 0

      users.forEach(user => {
        const newNotification = toNewNotificationEntry(req.body, user)
        notificationService.addNotification(newNotification)
        notificationsSended++
      })

      response.success = true
      response.message = `${notificationsSended} notification sended`
      return res.send(response)
    }

    response.message = 'There are no users subscribed to the specified category'
    return res.send(response)
  } catch (e: any) {
    response.message = e.message
    return res.status(400).send(response)
  }
})

export default router
