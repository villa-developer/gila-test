import express from 'express'
import NotificationsController from '../controllers/notificationsController'

const router = express.Router()
const notificationController = new NotificationsController()

router.get('/', (req, res) => { void notificationController.index(req, res) })
router.post('/', (req, res) => { void notificationController.store(req, res) })

export default router
