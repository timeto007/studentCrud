import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity('proof')
export class Proof {
  @PrimaryColumn()
  id: number;

  @Column()
  proof: string;
  @ManyToOne(() => Student, (student) => student.course, { cascade: true })
  student: Student;
}
