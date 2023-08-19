import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'admin_db',
  autoLoadEntities: true,
  synchronize: true,
};

export default config;
