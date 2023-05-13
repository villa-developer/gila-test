import axios from 'axios'
import { expect, test, describe } from '@jest/globals'

const base = 'http://127.0.0.1:3000/api'
const notificationsUrl = `${base}/notifications`

describe('Test notification routes', () => {
  const defaultNotification = {
    id: 1,
    channel: 'sms',
    category: 'finance',
    userName: 'User One',
    message: 'Bla bla bla',
    status: 'SENDED',
    created_at: '2023-05-11 12:20'
  }

  test('Get notifications', async () => {
    const res = await axios.get(notificationsUrl)
    const data = res.data
    console.log(data)
    expect(res.status).toBe(200)
    expect(data.length).toBeGreaterThan(0)
    expect(data[0]).toEqual(defaultNotification)
  })

  test('Create notification', async () => {
    const notification = {
      category: 'finance',
      message: 'Bla bla bla'
    }

    const res = await axios.post(notificationsUrl, notification)
    expect(res.status).toBe(200)
  })
})

describe('Test authentication routes', () => {
  test('Fail authenticate user', async () => {
    const loginRequest = {
      email: 'ing.carlosagaton@gmail.com',
      password: 'password'
    }
    try {
      await axios.post('http://127.0.0.1:3000/api/auth/signin', loginRequest)
    } catch (error: any) {
      const errorResponse = error.response
      expect(errorResponse.status).toBe(400)
    }
  })

  test('Sucess authenticate user', async () => {
    const loginRequest = {
      email: 'one@gmail.com',
      password: 'password'
    }

    const res = await axios.post('http://127.0.0.1:3000/api/auth/signin', loginRequest)
    expect(res.status).toBe(200)
  })
})
