import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtServiceService } from './jwt/jwt.service.service';
import { RegisterResponseDto } from './dtos/register/register-response.dto';
import { LoginRequestDto } from './dtos/login/login-request.dto';
import { LoginResponseDto } from './dtos/login/login-response.dto';
import { RegisterRequestDto } from './dtos/register/register-request.dto';
import { UserService } from 'src/user/user.service';
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtServiceService,
    private readonly userService: UserService,
    private readonly encryptionService: EncryptionService,
  ) {}
  async register(data: RegisterRequestDto): Promise<RegisterResponseDto> {
    const user = await this.userService.findOne({ email: data.email });
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const newUser = await this.userService.create({
      name: data.name,
      email: data.email,
      password: await this.encryptionService.hashPassword(data.password),
    });

    const token = await this.jwtService.generateToken({
      id: newUser.id,
      name: newUser.name,
    });

    return new RegisterResponseDto(token);
  }

  async login(data: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userService.findOne({ email: data.email });
    console.log(user);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await this.encryptionService.comparePassword(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const token = await this.jwtService.generateToken({
      id: user.id,
      name: user.name,
    });

    return new LoginResponseDto(token);
  }
}
