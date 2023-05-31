import { Table, Model, Column } from 'sequelize-typescript'
import { Category, Channel, NotificationAttributes, NotificationCreationAttributes } from '../types'

@Table
export default class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> {
  @Column
    userId!: number

  @Column
    channel!: Channel

  @Column
    category!: Category

  @Column
    userName!: string

  @Column
    message!: string

  @Column
    status!: string
};
