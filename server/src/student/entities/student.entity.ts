import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Course } from './courses.entity';

@Entity('student')
export class Student {
  @PrimaryColumn()
  id: number;
  @Column({ nullable: true })
  name: string;

  @OneToOne(() => Address, (address) => address.address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Course, (course) => course.student)
  @JoinColumn()
  course: Course[];
}
