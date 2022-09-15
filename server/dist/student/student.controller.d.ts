import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
export declare class StudentController {
    private readonly studentService;
    private topicArray;
    private serviceName;
    constructor(studentService: StudentService);
    create(createStudentDto: CreateStudentDto): Promise<any>;
    findAll(): any;
    update(updateStudentDto: UpdateStudentDto): Promise<any>;
    remove(id: number): Promise<any>;
}
