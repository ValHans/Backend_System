import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({
    description: 'ID pengguna penerima (MongoDB ObjectId)',
    example: '68d5544e60bef1dafbab4955', // Contoh ID User B
  })
  @IsMongoId() // Memvalidasi bahwa ini adalah format ID MongoDB
  @IsNotEmpty()
  receiverId: string;

  @ApiProperty({
    description: 'Isi pesan yang akan dikirim',
    example: 'halo userB ini pesan dari userA',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}