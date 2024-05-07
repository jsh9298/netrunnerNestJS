import { IsString, MaxLength, MinLength } from "class-validator";
export class Profile{
    userId : string;
    level: number;
    reword: number;
}