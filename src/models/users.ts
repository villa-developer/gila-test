import { Table, Model, Column } from 'sequelize-typescript'
import { UserAttributes, UserCreationAttributes } from '../types'

@Table
export default class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column
    name!: string

  @Column
    email!: string

  @Column
    phoneNumber!: string

  @Column
    subscribed!: string

  @Column
    channels!: string

  @Column
    password!: string
};
