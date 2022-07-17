import { Injectable, BadRequestException,InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserLoginDto } from 'src/DTO/userlogin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   
    constructor(@InjectRepository(UserEntity) private repo: Repository <UserEntity>,
        
    private jwt : JwtService
    
    ){

    }


    async registerUser(registerDto: RegisterUserDto){

        const {username , password} = registerDto;
        
        const hashed =  await bcrypt.hash(password,12);
        const salt = await bcrypt.getSalt(hashed);
       
         
        const foundUser = await this.repo.findBy({username});
        if(foundUser){
            throw new InternalServerErrorException();
        }
        else{
              
            const user = new UserEntity();
            user.username = username;
            user.password = hashed;
            user.salt = salt;
    
            this.repo.create(user);
    
           
    
            try{
                return await this.repo.save(user);
            }catch(err){
               throw new InternalServerErrorException('Something went wrong, user was not created.');
            }
        }

        

    }

    async loginUser(userLoginDto : UserLoginDto){
        


        const {username,password}= userLoginDto;

        const user = await this.repo.findOneBy({username});

        if(!user){
            throw new UnauthorizedException('invalid credentials');
        }
        const salt = user.salt;
        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if(isPasswordMatch){
            const jwtPayload = {username};
            const jwtToken = await this.jwt.signAsync(jwtPayload , {expiresIn : '1d', algorithm : 'HS512'});
            return {token: jwtToken}
        }else{
            throw new UnauthorizedException('invalid credentials');
        }

    }




}
