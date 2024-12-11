import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import Order from './order';

// Define creation attributes for User
interface UserAttributes {
  id: string;
  name: string;
  password: string;
  role: 'admin' | 'user';
}

// Define optional fields for creation
type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public password!: string;
  public role!: 'admin' | 'user';
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);

// Define associations
User.hasMany(Order, {
  foreignKey: 'userId',
  as: 'orders', // Alias for the association
});

Order.belongsTo(User, {
  foreignKey: 'userId', // Foreign key in the 'Order' model
  as: 'user', // Alias for the association
});

export default User;
