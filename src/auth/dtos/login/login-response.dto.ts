import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    type: 'string',
  })
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
