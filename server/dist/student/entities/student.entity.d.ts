import { Address } from './address.entity';
import { Course } from './courses.entity';
export declare class Student {
    id: number;
    name: string;
    address: Address;
    course: Course[];
}
