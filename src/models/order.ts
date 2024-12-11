import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './user'; // Importing the User model

interface OrderAttributes {
  id?: string;
  userId: string;
  items: { id: string; quantity: number }[];
  totalAmount: number;
}

class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: string;
  public userId!: string;
  public items!: { id: string; quantity: number }[];
  public totalAmount!: number;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User, // References the User model
        key: 'id',   // User model's primary key
      },
      onDelete: 'CASCADE', // Optional: Delete orders if the user is deleted
      onUpdate: 'CASCADE',
    },
    items: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: true,
  }
);

export default Order;
