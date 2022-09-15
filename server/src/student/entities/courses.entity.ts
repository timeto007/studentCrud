import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';

@Entity('course')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  course: string;
  @ManyToOne(() => Student, (student) => student.course, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  student: Student;
}
