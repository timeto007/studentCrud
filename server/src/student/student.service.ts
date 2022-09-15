import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Address } from './entities/address.entity';
import { Course } from './entities/courses.entity';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
    @InjectRepository(Course) private readonly courseRepo: Repository<Course>,
  ) {}

  async doAddressQuery(id) {
    return this.studentRepo.query(`SELECT * FROM student where id=${id} `);
  }

  async doCourseQuery() {
    return this.courseRepo.query(`SELECT * FROM course ;`);
  }

  async create(createStudentDto: CreateStudentDto) {
    const course = new Course();
    course.course = createStudentDto.course;
    await this.courseRepo.save(course);

    const address = new Address();
    address.address = createStudentDto.address;
    await this.addressRepo.save(address);

    const student = new Student();
    student.id = createStudentDto.id;
    student.name = createStudentDto.name;
    student.address = address;
    student.course = [course];
    return this.studentRepo.save(student);
  }

  findAll() {
    return this.studentRepo.find();
  }

  findOne(id: number): Promise<Student> {
    return this.studentRepo.findOneBy({ id });
  }

  async update(updateStudentDto: UpdateStudentDto) {
    let studentId = updateStudentDto.id;

    let studentData = await this.doAddressQuery(studentId);

    await this.addressRepo.update(studentData[0].addressId, {
      address: updateStudentDto.address,
    });

    let courseData = await this.doCourseQuery();
    let array = courseData.filter((a) => a.studentId === studentId);

    await this.courseRepo.update(array[0].id, {
      course: updateStudentDto.course,
    });

    return await this.studentRepo.update(studentId, {
      name: updateStudentDto.name,
    });
  }

  async remove(id: number) {
    let studentData = await this.doAddressQuery(id);
    await this.studentRepo.delete(id);
    return this.addressRepo.delete(studentData[0].addressId);
  }
}
