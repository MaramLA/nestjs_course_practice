import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'nestjs-blog',
  entities: ['**/*.entity.js'],
  migrations: ['migration/*.js'],
});

// migration generattion command for nest.js:
// npx typeorm migration:generate src/migration/firstMigration -d dist/typeorm-cli.config
