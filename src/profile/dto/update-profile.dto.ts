import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional({
    description: 'Nama tampilan baru untuk pengguna',
    example: 'Nama Baru Saya',
  })
  @IsString()
  @IsOptional()
  displayName?: string;

  @ApiPropertyOptional({
    description: 'Gender pengguna',
    example: 'Male/Female',
  })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiPropertyOptional({
    description: 'Tanggal lahir pengguna',
    example: '1990-01-01',
  })
  @IsDateString()
  @IsOptional()
  birthday?: string;

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