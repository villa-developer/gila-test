import { Sequelize } from 'sequelize-typescript'

const sequelize = new Sequelize({
  database: 'database',
  dialect: 'sqlite',
  storage: 'database.sqlite'
})

export default sequelize
