import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentSignerModule } from './modules/document-signer/document-signer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DocumentSignerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
