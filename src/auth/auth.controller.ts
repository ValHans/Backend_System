import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'; // <-- Impor decorator

@ApiTags('Authentication') // <-- Memberi label grup untuk semua endpoint di controller ini
@Controller() // <-- Sebaiknya beri nama path controller agar lebih terstruktur
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test-api')
  @ApiOperation({ summary: 'Test endpoint to check if API is running' }) // <-- Deskripsi singkat
  @ApiResponse({ status: 200, description: 'Returns a success message.' })
  testApi() {
    return { message: 'API is working!' };
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 409, description: 'Email or username already exists (Conflict).' })
  @ApiBody({ type: RegisterDto }) // <-- Memberi tahu Swagger DTO apa yang digunakan
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in a user to get a JWT token' })
  @ApiResponse({ status: 200, description: 'Login successful, returns JWT token.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials (Unauthorized).' })
  @ApiBody({ type: LoginDto })
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}

// below without decorator swagger

// import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { RegisterDto } from './dto/register.dto';
// import { LoginDto } from './dto/login.dto';

// @Controller()
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Get('test-api')
//   testApi() {
//     return { message: 'API is working!' };
//   }

//   @Post('/register')
//   register(@Body() registerDto: RegisterDto) {
//     return this.authService.register(registerDto);
//   }

//   @Post('/login')
//   @HttpCode(HttpStatus.OK)
//   login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
//     console.log('--- LOGIN DTO RECEIVED ---:', loginDto);
//     return this.authService.login(loginDto);
//   }
// }