import { Model, DataTypes } from "sequelize";
import { sequelize } from "../services/sequelize";

export class User extends Model {
  public id!: number;
  public username!: string;
  public firstName!: string;
  public lastName!: string;
  public phoneNumber?: string;
  public email!: string;
  public password!: string;
  public role!: 'landlord' | 'traveler' | 'admin';
  public dateOfBirth!: Date;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set(value: string) {
      this.setDataValue('username', value.toLowerCase());
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set(value: string) {
      this.setDataValue('email', value.toLowerCase());
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('landlord', 'traveler', 'admin'),
    allowNull: false
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'users',
  modelName: 'User',
  sequelize
});