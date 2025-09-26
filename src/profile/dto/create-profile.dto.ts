import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsString, IsDateString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateProfileDto {
  @ApiPropertyOptional({
    description: 'Nama tampilan untuk pengguna',
    example: 'Nama Saya',
  })
  @IsString()
  displayName: string;

  @ApiPropertyOptional({
    description: 'Jenis kelamin pengguna',
    example: 'Male/Female',
  })
  @IsString()
  gender: string;

  @ApiPropertyOptional({
    description: 'Tanggal lahir pengguna',
    example: '1990-01-01',
  })
  @IsDateString()
  birthday: string;

  @ApiPropertyOptional({
    description: 'Tinggi badan pengguna dalam cm',
    example: 170,
  })
  @IsNumber()
  @IsOptional()
  height?: number;

  @ApiPropertyOptional({
    description: 'Berat badan pengguna dalam kg',
    example: 65,
  })
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiPropertyOptional({
    description: 'Daftar minat pengguna',
    example: ['music', 'sports', 'travel'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interests?: string[];
}