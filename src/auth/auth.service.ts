import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor (
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) {}


    async register(registerDto : RegisterDto): Promise<{token: string}> {
        const { username, email, password } = registerDto;

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await this.userModel.create({
            username,
            email,
            password: hashedPassword
        });

        const token = this.jwtService.sign({id: user._id, email: user.email})
        
        return { token };
    }

    async login(loginDto: { email: string, password: string}): Promise<{ token: string }> {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const token = this.jwtService.sign({ id: user._id, email: user.email });
        return { token };
    }
}
