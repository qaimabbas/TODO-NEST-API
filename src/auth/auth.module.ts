import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entity/user.entity';
import {JwtModule}from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtCustomStratgey } from './jwt-custom.strategy';

@Module({
  imports:[
      
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({

      secret : 'wndiuh8743zr3jdiu3h',
      signOptions: {
        algorithm :'HS512',
        expiresIn : '1d'
      }
    }),
    PassportModule.register({

     defaultStrategy : 'jwt'

    })


  ],
  providers: [AuthService , JwtCustomStratgey],
  controllers: [AuthController],
  exports: [PassportModule , JwtCustomStratgey]
})
export class AuthModule { }
