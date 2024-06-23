import { Injectable } from '@nestjs/common';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

@Injectable()
export class SecretsManagerService {
  private client: SecretsManagerClient;
  private region: string;

  constructor() {
    this.region = 'us-east-2';
    this.client = new SecretsManagerClient({ region: this.region });
  }

  async getSecretValue(secretName: string): Promise<object> {
    try {
      const secretKey = `${process.env.NODE_ENV}/${process.env.MICROSERVICE_NAME}/${secretName}`

      const command = new GetSecretValueCommand({ SecretId: secretKey });

      const data = await this.client.send(command);
  
      if (!data.SecretString) {
        throw new Error('El secreto no es una cadena');
      }

      return JSON.parse(data.SecretString);
    } catch (error) {
      console.error('Error al obtener el secreto:', error);
      throw error;
    } finally {
      this.client.destroy();
    }
  }
}
