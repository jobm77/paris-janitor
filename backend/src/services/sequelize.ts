import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('paris-janitor', 'jani', 'tor7', {
  host: 'localhost',
  port: 3303,
  dialect: 'mysql'
}); 