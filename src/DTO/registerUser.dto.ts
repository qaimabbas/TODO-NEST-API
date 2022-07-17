import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto{


    @IsNotEmpty()
    username: string;


    @IsNotEmpty()
    @MinLength(6) @MaxLength(12)
    @Matches( /(?:(?=.*\d)| (?=.*\w))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
        message: 'password is too weak Choose stronger password between 6 and 12 characters'
    }
    
    
    )
    password: string;
}