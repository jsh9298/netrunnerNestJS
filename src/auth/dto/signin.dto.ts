import { IsString, MaxLength, MinLength } from "class-validator";
export class SignInDto{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    userId : string;
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;
}
