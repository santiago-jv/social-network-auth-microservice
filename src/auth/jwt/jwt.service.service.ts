import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { readFile } from 'fs/promises';

@Injectable()
export class JwtServiceService {
  async generateToken(payload: Object) {
    const dateNowInSeconds = Math.floor(Date.now() / 1000);
    const expirationDate = dateNowInSeconds + 60 * 60;
    payload = {
      ...payload,
      iat: dateNowInSeconds,
      exp: expirationDate,
    };

    const privateKey = await readFile('private_key.pem', 'utf8');

    return sign({ payload }, privateKey, {
      algorithm: 'RS256',
      expiresIn: expirationDate,
    });
  }

  async verifyToken(token: string) {
    const publicKey = await readFile('public_key.pem', 'utf8');

    return sign(token, publicKey);
  }
  
}
