import { IsString, Matches, MaxLength, MinLength, IsEmail } from "class-validator";
export class changePass{
    @IsEmail()
    @Matches( /^[^\s@]+@[^\s@]+\.[^\s@]+$/,{message:'Incorrect Email Form'})
    email: string;
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;
}
