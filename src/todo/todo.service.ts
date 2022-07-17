import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TodoEntity, TodoStatus } from 'src/Entity/todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createTodoDto } from 'src/DTO/create-todo.dto';
import { UserEntity } from 'src/Entity/user.entity';


@Injectable()
export class TodoService {

    

    constructor(@InjectRepository(TodoEntity) private repo:Repository <TodoEntity>){

    };

 async getAllTodos(user : UserEntity){
     
   const query = await this.repo.createQueryBuilder('todo');
   query.where('todo.userId = :userId', {userId: user.id});

   try{
       return await query.getMany();
   }catch(err){
       throw new InternalServerErrorException('No todo found');
   }

    //return await this.repo.find();

 }

   async createTodo(createTodoDto: createTodoDto , user: UserEntity){

    const todo = new TodoEntity();
    const {title , description}= createTodoDto;
    todo.title= title;
    todo.description = description;
    todo.status = TodoStatus.OPEN;
    todo.userId = user.id;



       this.repo.create(todo);

       try{
        return await this.repo.save(todo);
       }catch(err){
           throw new InternalServerErrorException('problem here')
       }
       

   }
   
   async update( id: number , status : TodoStatus, user: UserEntity){
     
    const todo = await this.repo.findOneBy({id});
    todo.status = status ;




    try{
        
       
        await this.repo.update({id, userId: user.id},{status});
        return this.repo.findOneBy({id});
    }catch(err){

      throw new InternalServerErrorException('Something went wrong'); 
    }
      

   }

   async delete(id :number , user: UserEntity ){

      const result = await this.repo.delete({id, userId: user.id})


       if(result.affected === 0){
           throw new NotFoundException(' todo not deleted');
       }else{
           return {success: true} 
       }
    
   }

}
