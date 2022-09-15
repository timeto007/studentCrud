import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  address: string;

  @OneToOne(() => Student, (student) => student.address, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  student: Student;
}
