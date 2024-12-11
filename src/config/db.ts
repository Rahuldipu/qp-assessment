import { Sequelize } from 'sequelize';
import { config } from './env';

const sequelize = new Sequelize(
  config.DB.DB_URL
);

export default sequelize;
