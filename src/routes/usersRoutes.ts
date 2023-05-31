import express from 'express'
import UserController from '../controllers/UsersController'
import LoginController from '../controllers/loginController'
const router = express.Router()

const userController = new UserController()
const loginController = new LoginController()

router.get('/users', (req, res) => { userController.index(req, res) })
router.post('/signin', (req, res): void => { void loginController.signin(req, res) })

export default router
