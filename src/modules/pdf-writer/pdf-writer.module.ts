import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { PdfWriterService } from './pdf-writer.service';
@Module({
  imports: [],
  providers: [PdfWriterService],
  exports: [PdfWriterService],
})
export class PdfWriterModule {}
