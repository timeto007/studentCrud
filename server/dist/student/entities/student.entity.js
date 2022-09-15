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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const typeorm_1 = require("typeorm");
const address_entity_1 = require("./address.entity");
const courses_entity_1 = require("./courses.entity");
let Student = class Student {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => address_entity_1.Address, (address) => address.address),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", address_entity_1.Address)
], Student.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => courses_entity_1.Course, (course) => course.student),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Student.prototype, "course", void 0);
Student = __decorate([
    (0, typeorm_1.Entity)('student')
], Student);
exports.Student = Student;
//# sourceMappingURL=student.entity.js.map