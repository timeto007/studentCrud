"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const address_entity_1 = require("./entities/address.entity");
const courses_entity_1 = require("./entities/courses.entity");
const student_entity_1 = require("./entities/student.entity");
let StudentService = class StudentService {
    constructor(studentRepo, addressRepo, courseRepo) {
        this.studentRepo = studentRepo;
        this.addressRepo = addressRepo;
        this.courseRepo = courseRepo;
    }
    async doAddressQuery(id) {
        return this.studentRepo.query(`SELECT * FROM student where id=${id} `);
    }
    async doCourseQuery() {
        return this.courseRepo.query(`SELECT * FROM course ;`);
    }
    async create(createStudentDto) {
        const course = new courses_entity_1.Course();
        course.course = createStudentDto.course;
        await this.courseRepo.save(course);
        const address = new address_entity_1.Address();
        address.address = createStudentDto.address;
        await this.addressRepo.save(address);
        const student = new student_entity_1.Student();
        student.id = createStudentDto.id;
        student.name = createStudentDto.name;
        student.address = address;
        student.course = [course];
        return this.studentRepo.save(student);
    }
    findAll() {
        return this.studentRepo.find();
    }
    findOne(id) {
        return this.studentRepo.findOneBy({ id });
    }
    async update(updateStudentDto) {
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
    async remove(id) {
        let studentData = await this.doAddressQuery(id);
        await this.studentRepo.delete(id);
        return this.addressRepo.delete(studentData[0].addressId);
    }
};
StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(address_entity_1.Address)),
    __param(2, (0, typeorm_1.InjectRepository)(courses_entity_1.Course)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], StudentService);
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map