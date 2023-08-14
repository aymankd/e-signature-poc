import { Controller, Get, Post } from '@nestjs/common';
import { DocumentSignerService } from './document-signer.service';

@Controller('document-signer')
export class DocumentSignerController {
  constructor(private readonly documentSignerService: DocumentSignerService) {}

  @Post('v1')
  createDoc_v1() {
    return this.documentSignerService.createDoc();
  }

  @Post('v2')
  createDoc_v2() {
    return this.documentSignerService.createDoc_v2();
  }
}
