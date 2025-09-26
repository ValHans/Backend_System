import { Controller, Post, Body, Get, Patch, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'; // Sesuaikan path jika perlu
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('createProfile')
  @ApiOperation({ summary: 'Membuat profil untuk pengguna yang login' })
  @ApiBody({ type: CreateProfileDto })
  @ApiResponse({ status: 201, description: 'Profil berhasil dibuat.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  createProfile(@Request() req, @Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(req.user.userId, createProfileDto);
  }

  @Get('getProfile')
  @ApiOperation({ summary: 'Mendapatkan profil pengguna yang login dengan token user' })
  @ApiResponse({ status: 200, description: 'Berhasil mengambil data profil.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Profil tidak ditemukan.' })
  getProfile(@Request() req) {
    return this.profileService.findOneByUserId(req.user.userId);
  }

  // --- DECORATOR UNTUK UPDATE PROFILE ---
  @Patch('updateProfile') // Menggunakan PATCH untuk update parsial
  @ApiOperation({ summary: 'Memperbarui profil pengguna yang login' })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({ status: 200, description: 'Profil berhasil diperbarui.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Profil tidak ditemukan.' })
  updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(req.user.userId, updateProfileDto);
  }
}

// ---- Tanpa Swagger ----
// import { Controller, Post, Body, Get, Put, UseGuards, Request, Query } from '@nestjs/common';
// import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
// import { ProfileService } from './profile.service';
// import { CreateProfileDto } from './dto/create-profile.dto';
// import { UpdateProfileDto } from './dto/update-profile.dto';

// @Controller()
// @UseGuards(JwtAuthGuard) // Melindungi semua endpoint di controller ini
// export class ProfileController {
//   constructor(private readonly profileService: ProfileService) {}

//   @Post('/createProfile')
//   createProfile(@Request() req, @Body() createProfileDto: CreateProfileDto) {
//     return this.profileService.create(req.user.userId, createProfileDto);
//   }

//   @Get('/getProfile')
//   getProfile(@Request() req, @Query('id') id?: string) {
//     // If `id` query param is provided, search by MongoDB _id
//     // Otherwise, use userId from JWT
//     const identifier = id ?? req.user.userId;
//     return this.profileService.findOneByUserId(identifier);
//   }

//   @Put('/updateProfile')
//   updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
//     return this.profileService.update(req.user.userId, updateProfileDto);
//   }
// }