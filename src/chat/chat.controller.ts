import { Controller, Get, Query, UseGuards, Request, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';
import { SendMessageDto } from './dto/send-message.dto';

@ApiTags('Chat')
@ApiBearerAuth()
@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('viewMessages')
  @ApiOperation({ summary: 'Melihat riwayat percakapan dengan pengguna lain' })
  @ApiQuery({
    name: 'partnerId',
    required: true,
    description: 'ID dari pengguna partner chat',
    example: '68d5544e60bef1dafbab4955', // Contoh ID User B
  })
  @ApiResponse({ status: 200, description: 'Berhasil mengambil riwayat pesan.' })
  @ApiResponse({ status: 401, description: 'Unauthorized (token tidak valid).' })
  async viewMessages(@Request() req, @Query('partnerId') partnerId: string) {
    const userId = req.user.userId;
    console.log(`--- Fetching Messages ---`);
    console.log(`User ID from Token (userId1): ${userId}`);
    console.log(`Partner ID from URL (userId2): ${partnerId}`);
    return this.chatService.getMessages(userId, partnerId);
  }

  @Post('sendMessage')
  @ApiOperation({ summary: 'Mengirim pesan ke pengguna lain' })
  @ApiBody({ type: SendMessageDto }) // Menjelaskan body request menggunakan DTO
  @ApiResponse({ status: 201, description: 'Pesan berhasil dibuat dan disimpan.' })
  @ApiResponse({ status: 401, description: 'Unauthorized (token tidak valid).' })
  async sendMessage(@Request() req, @Body() sendMessageDto: SendMessageDto) {
    const senderId = req.user.userId;
    const { receiverId, message } = sendMessageDto;
    return this.chatService.createMessage({ senderId, receiverId, message });
  }
}

// --- Code tanpa swagger documentation ---
// import { Controller, Get, Query, UseGuards, Request, Post, Body } from '@nestjs/common';
// import { ChatService } from './chat.service';
// import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'; // Pastikan path ini benar

// @Controller('chat')
// @UseGuards(JwtAuthGuard) // Melindungi semua rute di controller ini
// export class ChatController {
//   constructor(private readonly chatService: ChatService) {}

//   // METHOD YANG PERLU ANDA TAMBAHKAN
//   @Get('viewMessages')
//   async viewMessages(@Request() req, @Query('partnerId') partnerId: string) {
//     const userId = req.user.userId;

//     // Log untuk debugging
//     console.log(`--- Fetching Messages ---`);
//     console.log(`User ID from Token (userId1): ${userId}`);
//     console.log(`Partner ID from URL (userId2): ${partnerId}`);

//     return this.chatService.getMessages(userId, partnerId);
//   }

//   // Method sendMessage (kemungkinan sudah ada atau bisa ditambahkan)
//   @Post('sendMessage')
//   async sendMessage(@Request() req, @Body() body: { receiverId: string; message: string }) {
//       const senderId = req.user.userId;
//       const { receiverId, message } = body;
//       // Di sini Anda bisa memanggil gateway jika perlu, atau langsung service
//       return this.chatService.createMessage({ senderId, receiverId, message });
//   }
// }