import { Address } from './student/entities/address.entity';
import { Student } from './student/entities/student.entity';
import { Course } from './student/entities/courses.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Proof } from './student/entities/proof.entity';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'project2',
  synchronize: true,
  entities: [Student, Address, Course, Proof],
};
