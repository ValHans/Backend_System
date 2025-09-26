import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { getZodiacSign, getHoroscopeSign } from '../common/utils/astrology';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async create(userId: string, createProfileDto: CreateProfileDto) {
    const { birthday } = createProfileDto;
    const zodiac = getZodiacSign(new Date(birthday));
    const horoscope = getHoroscopeSign(new Date(birthday));

    const newProfile = new this.profileModel({
      ...createProfileDto,
      userId,
      zodiac,
      horoscope,
    });
    return newProfile.save();
  }

  async findOneByUserId(userId: string) {
    const profile = await this.profileModel.findOne({ userId }).exec();
    if (!profile) {
      throw new NotFoundException(`Profile for user #${userId} not found`);
    }
    return profile;
  }

  async update(userId: string, updateProfileDto: UpdateProfileDto) {
    const existingProfile = await this.profileModel.findOneAndUpdate(
      { userId },
      { $set: updateProfileDto },
      { new: true },
    ).exec();

    if (!existingProfile) {
      throw new NotFoundException(`Profile for user #${userId} not found`);
    }

    // Jika tanggal lahir diperbarui, hitung ulang zodiak dan horoskop
    if (updateProfileDto.birthday) {
        existingProfile.zodiac = getZodiacSign(new Date(updateProfileDto.birthday));
        existingProfile.horoscope = getHoroscopeSign(new Date(updateProfileDto.birthday));
        await existingProfile.save();
    }

    return existingProfile;
  }
}