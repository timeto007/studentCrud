"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const address_entity_1 = require("./student/entities/address.entity");
const student_entity_1 = require("./student/entities/student.entity");
const courses_entity_1 = require("./student/entities/courses.entity");
const proof_entity_1 = require("./student/entities/proof.entity");
exports.config = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: '12345',
    database: 'project2',
    synchronize: true,
    entities: [student_entity_1.Student, address_entity_1.Address, courses_entity_1.Course, proof_entity_1.Proof],
};
//# sourceMappingURL=ormconfig.js.map