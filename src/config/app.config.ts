import { registerAs } from '@nestjs/config';

export default registerAs('appCongig', () => ({
  environment: process.env.NODE_ENV || 'production',
}));
