import { Model, DataTypes } from "sequelize";
import { sequelize } from "../services/sequelize";
import { User } from "./users";

export class Payment extends Model {
  public id!: number;
  public userId!: number;
  public amount!: number;
  public paymentDate!: Date;
  public paymentMethod!: string;
  public status!: 'pending' | 'completed';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  paymentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    allowNull: false
    }
}, {
  tableName: 'payments',
  modelName: 'Payment',
  sequelize
});