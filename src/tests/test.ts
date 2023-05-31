import axios from 'axios'
import { expect, test, describe } from '@jest/globals'

const base = 'http://127.0.0.1:3000/api'
const notificationsUrl = `${base}/notifications`

describe('Test notification routes', () => {
  test('Create notification', async () => {
    const notification = {
      category: 'finance',
      message: 'Bla bla bla'
    }

    const res = await axios.post(notificationsUrl, notification)
    expect(res.status).toBe(200)
  })

  test('Get notifications', async () => {
    const res = await axios.get(notificationsUrl)
    const data = res.data
    expect(res.status).toBe(200)
    expect(data.data.length).toBeGreaterThan(0)
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
