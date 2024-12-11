import express from 'express';
import adminRoutes from './routes/adminRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';
import sequelize from './config/db';
import { config } from './config/env';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// Error handling middleware
app.use(errorHandler);

// Database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
