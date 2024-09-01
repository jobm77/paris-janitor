import { Model, DataTypes } from "sequelize";
import { sequelize } from "../services";
import { Booking } from './bookings';
import { Service } from "./services";

export class BookingService extends Model {
  public id!: number;
  public bookingId!: number;
  public serviceId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BookingService.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    bookingId: {
        type: DataTypes.INTEGER,
        references: {
            model: Booking,
            key: 'id'
        }
    },
    serviceId: {
        type: DataTypes.INTEGER,
        references: {
          model: Service,
          key: 'id'
        }
    }
}, {
    tableName: 'booking_services',
    modelName: 'BookingService',
    sequelize
});