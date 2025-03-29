import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  user: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME || 'nestjs-blog',
  syncronize: process.env.DATABASE_SYNC === 'true' ? true : false,
  autoLoadEntities:
    process.env.DATABASE_AUTO_LOAD_ENTITES === 'true' ? true : false,

  mongoDB_connectionString: process.env.MONGODB_CONNECTION_STRING,
  mongoDB_database: process.env.MONGODB_DATABASE_NAME,
}));
