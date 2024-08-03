import { Model, DataTypes } from "sequelize";
import { sequelize } from "../services/sequelize";
import { User } from "./users";

export class Document extends Model {
  public id!: number;
  public userId!: number;
  public url?: string;
  public name!: string;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Document.init({
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
  url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'documents',
  modelName: 'Document',
  sequelize
});