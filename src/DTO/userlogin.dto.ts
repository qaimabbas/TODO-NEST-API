
import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";
export class UserLoginDto{



    @IsNotEmpty()
    username : string ;
    @IsNotEmpty()
    password : string ;

}