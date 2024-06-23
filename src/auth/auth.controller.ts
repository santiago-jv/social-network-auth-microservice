import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dtos/register/register-request.dto';
import { RegisterResponseDto } from './dtos/register/register-response.dto';
import { LoginRequestDto } from './dtos/login/login-request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @HttpCode(201)
  async register(
    @Body() body: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.authService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'User logged successfully' })
  async login(@Body() body: LoginRequestDto) {
    return this.authService.login(body);
  }
}
