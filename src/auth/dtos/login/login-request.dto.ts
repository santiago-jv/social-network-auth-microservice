import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    type: 'string',
    description: 'User email',
    example: 'x@g.com',
  })
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'User password',
    example: '123456',
  })
  password: string;
}
