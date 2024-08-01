import { Model, DataTypes } from "sequelize";
import { sequelize } from "../services/sequelize";
import { User } from "./users";

export class Property extends Model {
  public id!: number;
  public possessorId!: number;
  public address!: string;
  public announcement!: string;
  public pricePerNight!: number;
  public availabilityCalendar?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Property.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  possessorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  announcement: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  pricePerNight: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  availabilityCalendar: {
    type: DataTypes.JSON,
    allowNull: true
    }
}, {
  tableName: 'properties',
  modelName: 'Property',
  timestamps: false,
  sequelize
});