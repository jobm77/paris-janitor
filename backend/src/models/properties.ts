// models/property.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../services/sequelize";
import { User } from "./users";

export class Property extends Model {
  public id!: number;
  public possessorId!: number;
  public address!: string;
  public announcement!: string;
  public pricePerNight!: number;
  public type!: string;
  public bedrooms!: number;
  public bathrooms!: number;
  public area!: number;
  public amenities?: string[]; 
  public availabilityCalendar?: string;
  public images?: string[];
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
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bedrooms: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bathrooms: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  area: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  amenities: {
    type: DataTypes.JSON,
    allowNull: true
  },
  availabilityCalendar: {
    type: DataTypes.JSON,
    allowNull: true
  },
  images: {
    type: DataTypes.JSON, 
    allowNull: true
  }
}, {
  tableName: 'properties',
  modelName: 'Property',
  timestamps: true,
  sequelize
});
