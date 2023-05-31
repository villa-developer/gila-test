import { Category, Channel } from '../types'

const isString = (string: string): boolean => {
  return typeof string === 'string'
}

const isCategory = (string: any): boolean => {
  return Object.values(Category).includes(string)
}

const isChannel = (string: any): boolean => {
  return Object.values(Channel).includes(string)
}

export const parseChannel = (channelFromRequest: any): Channel => {
  if (!isString(channelFromRequest) || !isChannel(channelFromRequest)) {
    throw new Error('Incorrect or misising channel')
  }

  return channelFromRequest
}

export const parseCategory = (categoryFromRequest: any): Category => {
  if (!isString(categoryFromRequest) || !isCategory(categoryFromRequest.trim())) {
    throw new Error('Incorrect or misising category')
  }

  return categoryFromRequest
}

export const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest)) {
    throw new Error('Incorrect or missing name')
  }

  return nameFromRequest
}

export const parseMessage = (commentFormRequest: any): string => {
  if (!isString(commentFormRequest)) {
    throw new Error('Incorrect or missing message')
  }

  return commentFormRequest
}

export const parseString = (stringFromRequest: any, key: string): string => {
  if (!isString(stringFromRequest)) {
    throw new Error(`Incorrect or missing ${key}`)
  }

  return stringFromRequest
}
