import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiProperty({
    type: 'string',
    description: 'User name',
    example: 'Santiago',
  })
  name: string;

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
