import { Model, DataTypes } from "sequelize";
import { sequelize } from "../services";
//import { Booking } from "./bookings";

export class Service extends Model {
  public id!: number;
  //public bookingId!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public category!: string;
  public isBooked!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Service.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  /*bookingId: {
    type: DataTypes.INTEGER,
    references: {
        model: Booking,
        key: 'id'
    }
  },*/
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isBooked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'services',
  modelName: 'Service',
  sequelize
});

