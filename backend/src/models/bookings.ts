import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';
import { User } from './users';
import { Property } from './properties';
//import { Service } from './services';

export class Booking extends Model {
  public id!: number;
  public userId!: number;
  public propertyId!: number;
  public startDate!: Date;
  public endDate!: Date;
  public status!: 'pending' | 'confirmed' | 'cancelled';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Booking.init({
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
  propertyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Property,
      key: 'id'
    }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    allowNull: false
  }
}, {
  tableName: 'bookings',
  modelName: 'Booking',
  sequelize
});
