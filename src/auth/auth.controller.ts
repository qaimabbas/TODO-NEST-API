import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { UserLoginDto } from 'src/DTO/userlogin.dto';
import { AuthService } from './auth.service';



//http://localhost:3000/api/auth
@Controller('auth')
export class AuthController {


 constructor(private authService: AuthService){

 }



 @Post('register')
 registration(@Body(ValidationPipe) regDto: RegisterUserDto){

    return this.authService.registerUser(regDto);

 }

 @Post('login')
 signin(@Body(ValidationPipe) loginDto: UserLoginDto){

    return this.authService.loginUser(loginDto);

 }

}
