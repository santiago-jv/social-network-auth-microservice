import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecretsManagerModule } from './secrets-manager/secrets-manager.module';
import { SecretsManagerService } from './secrets-manager/secrets-manager.service';
import { DatabaseCredentials } from './secrets-manager/secret-value-interfaces/database-credentials.interface';
import { PostsModule } from './posts/posts.module';


@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [SecretsManagerModule],
      inject: [SecretsManagerService],
      useFactory: async (secretsManagerService: SecretsManagerService) => {
        const credentials = (await secretsManagerService.getSecretValue(
          'database-credentials',
        )) as DatabaseCredentials;
        return {
          type: 'postgres',
          host: credentials.host,
          port: credentials.port,
          username: credentials.username,
          password: credentials.password,
          database: credentials.name,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
