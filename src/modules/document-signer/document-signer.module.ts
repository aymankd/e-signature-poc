import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { DocuSignModule } from '../docusign/docusign.module';
import { PandaDocAPIModule } from '../pandadoc/pandadoc.module';
import { PdfWriterModule } from '../pdf-writer/pdf-writer.module';
import { DocumentSignerController } from './document-signer.controller';
import { DocumentSignerService } from './document-signer.service';
@Module({
  imports: [PdfWriterModule, PandaDocAPIModule, DocuSignModule],
  controllers: [DocumentSignerController],
  providers: [DocumentSignerService],
  exports: [DocumentSignerService],
})
export class DocumentSignerModule {}
