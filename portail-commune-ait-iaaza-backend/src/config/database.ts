import {Sequelize} from 'sequelize'


export const sequelize = new Sequelize(
  process.env.DB_NAME || 'portailaitiazza',
  process.env.DB_USER || 'aymaneuser',
  process.env.DB_PASSWORD || 'lgmada321*',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 20,
      min: 5,
      acquire: 30000,
      idle: 10000,
    },
  }

)