import express from 'express'
import cors from 'cors'
import notificationRouter from './routes/notificationRoutes'
import usersRouter from './routes/usersRoutes'
import sequelize from './database/database'
import User from './models/users'
import UserController from './controllers/UsersController'
import Notification from './models/notifications'

const app = express()

app.use(cors({
  origin: '*'
}))

app.use(express.json())
const PORT = 3000

const userController = new UserController()
void sequelize.sync().then(() => { void userController.createUsers() })
sequelize.addModels([User, Notification])

app.use('/api/notifications', notificationRouter)
app.use('/api/auth', usersRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
