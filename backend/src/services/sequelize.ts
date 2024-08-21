import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('paris-janitor', 'jani', 'tor7', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
}); 