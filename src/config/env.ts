import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT,
  DB: {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'admin',
    PASSWORD: process.env.DB_PASSWORD || 'password',
    DATABASE: process.env.DB_NAME || 'grocery',
    DIALECT: 'postgres',
    DB_URL: process.env.DB_URL || "",
  },
  SECRET_KEY: process.env.SECRET_KEY || 'supersecretkey',
};
