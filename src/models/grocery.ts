import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
interface GroceryAttributes {
  id: string;
  name: string;
  price: number; // Add the price attribute
  stock: number;
}

class Grocery extends Model<GroceryAttributes> implements GroceryAttributes {
  public id!: string;
  public name!: string;
  public price!: number;
  public stock!: number;
}

Grocery.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'groceries',
    timestamps: true,
  }
);

export default Grocery;
