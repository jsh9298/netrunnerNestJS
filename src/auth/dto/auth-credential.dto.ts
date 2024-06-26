import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    userId : string;
    
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        {message:'Incorrect Password Type'},)
    password: string;

    @IsEmail()
    @Matches( /^[^\s@]+@[^\s@]+\.[^\s@]+$/,{message:'Incorrect Email Form'})
    email: string;
}