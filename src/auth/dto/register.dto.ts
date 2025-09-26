import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
      description: 'User\'s username (at least 3 characters)',
      example: 'youapp',
  })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({
    description: 'User\'s email address',
    example: 'youapp@example.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @ApiProperty({
    description: 'User\'s password (at least 6 characters)',
    example: 'password123',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
