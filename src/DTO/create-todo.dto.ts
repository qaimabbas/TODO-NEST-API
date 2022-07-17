import { IsNotEmpty,MaxLength } from "class-validator";

export class createTodoDto{
   
   @IsNotEmpty()
   @MaxLength(15,{message : 'Max length can be 15'})
    title : string;
    @IsNotEmpty()
    description : string;
}