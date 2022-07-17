import { Controller, Get,Post,Body, ValidationPipe, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { createTodoDto } from 'src/DTO/create-todo.dto';
import { TodoStatus } from 'src/Entity/todo.entity';
import { TodoService } from './todo.service';
import {TodoStatusValidationPipe} from '../pipes/TodoStatusValidation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/Entity/user.entity';
import {user} from '../auth/user.decorator';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodoController {




  constructor(private todoService: TodoService){
      
  }

  @Get()
   getAllTodos(
     
    @user() user: UserEntity

   ) {
      
      return this.todoService.getAllTodos(user);
   };


  @Post()

   createNewTodo(@Body(ValidationPipe) data: createTodoDto,
   
   @user() user: UserEntity
   ){
           
           return this.todoService.createTodo(data , user);

   }
  
   @Patch(':id')
   updateTodo(
       @Body('status',TodoStatusValidationPipe) status: TodoStatus,
       @Param('id') id: number, @user() user: UserEntity
   ){

       return this.todoService.update(id,status, user);

   }

   @Delete(':id')
   deleteTodo(@Param('id') id : number,
   @user() user: UserEntity ){
       return this.todoService.delete(id, user);

   }
   


}
