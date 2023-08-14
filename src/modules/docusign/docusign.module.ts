import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { ConfigService } from '@nestjs/config';
import { DocuSignService } from './docusign.service';

@Module({
  imports: [HttpModule],
  providers: [DocuSignService],
  exports: [DocuSignService],
})
export class DocuSignModule {}
