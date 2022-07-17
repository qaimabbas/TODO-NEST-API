import { Module } from '@nestjs/common';
import { hostname } from 'os';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import{TypeOrmModule,TypeOrmModuleOptions} from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

const ormOptions: TypeOrmModuleOptions= {
  type:'postgres',
  host:'localhost',
  port: 5432,
  username:'postgres',
  password:'tanveer',
  database:'nestjs',
  autoLoadEntities:true,
  synchronize :true,
};

@Module({
  imports: [TodoModule,
   TypeOrmModule.forRoot( /*options:*/ ormOptions),
   AuthModule
  
  
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
