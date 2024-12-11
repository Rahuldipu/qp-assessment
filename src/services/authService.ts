import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import { config } from '../config/env';
import { NotFoundError } from '../utils/errorUtils';

export const login = async (username: string, password: string) => {
  const user = await User.findOne({ where: { name: username } });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    config.SECRET_KEY,
    { expiresIn: '1d' }
  );

  return token;
};

export const signup = async (username: string, password: string, role: 'admin' | 'user') => {
  // Hash the password before saving it to the database
  const isUserAvailable = await User.findOne({ where: { name: username } });

  if (isUserAvailable) {
    throw new NotFoundError('User already available with this username. Try Other Username');
  }
  const hashedPassword = bcrypt.hashSync(password, 10); // 10 is the salt rounds

  // Create the user with the hashed password
  const user = await User.create({ name: username, password: hashedPassword, role });

  return user;
};
