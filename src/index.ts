import express from 'express'
import cors from 'cors'
import notificationRouter from './routes/notifications'
import usersRouter from './routes/users'

const app = express()

app.use(cors({
  origin: '*'
}))

app.use(express.json())
const PORT = 3000

app.use('/api/notifications', notificationRouter)
app.use('/api/auth', usersRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
