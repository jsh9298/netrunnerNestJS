import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    id: number;
    userId: string;
    password: string;
    username: string;
    email: string;
    savepoint: number;
    location: string;
    score: number;
    reword: number;
    level: number;
}
