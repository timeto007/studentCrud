import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Address } from './entities/address.entity';
import { Course } from './entities/courses.entity';
import { Student } from './entities/student.entity';
export declare class StudentService {
    private readonly studentRepo;
    private readonly addressRepo;
    private readonly courseRepo;
    constructor(studentRepo: Repository<Student>, addressRepo: Repository<Address>, courseRepo: Repository<Course>);
    doAddressQuery(id: any): Promise<any>;
    doCourseQuery(): Promise<any>;
    create(createStudentDto: CreateStudentDto): Promise<any>;
    findAll(): any;
    findOne(id: number): Promise<Student>;
    update(updateStudentDto: UpdateStudentDto): Promise<any>;
    remove(id: number): Promise<any>;
}
