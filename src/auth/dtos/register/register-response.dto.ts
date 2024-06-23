import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiProperty({
    type: 'string',
  })
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
