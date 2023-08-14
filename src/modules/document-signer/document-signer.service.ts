import { Injectable } from '@nestjs/common/decorators';
import { DocuSignService } from '../docusign/docusign.service';
import { PandaDocAPIService } from '../pandadoc/pandadoc.service';
import { PdfWriterService } from '../pdf-writer/pdf-writer.service';

@Injectable()
export class DocumentSignerService {
  constructor(
    private readonly pdfWriterService: PdfWriterService,
    private readonly pandaDocAPIService: PandaDocAPIService,
    private readonly docuSignService: DocuSignService,
  ) {}

  async createDoc() {
    console.log('_________START_________');
    const arrbuff = this.pdfWriterService.createPdfFile();
    await this.pandaDocAPIService.createDocument(arrbuff, [
      {
        email: 'aymankaddioui@gmail.com',
        first_name: 'Ayman',
        last_name: 'Kaddioui',
        role: 's1',
        signing_order: 1,
      },
      {
        email: 'aymen@flowdigitalstudio.com',
        first_name: 'Aymen',
        last_name: 'Flow',
        role: 's2',
        signing_order: 2,
      },
    ]);
    console.log('__________END__________');
  }

  async createDoc_v2() {
    console.log('_________START_________');
    const arrbuff = this.pdfWriterService.createPdfFile_v2();
    await this.docuSignService.connect();
    await this.docuSignService.createDocument(arrbuff, {
      email: 'aymankaddioui@gmail.com',
      name: 'aymankaddioui',
      recipientId: '1',
    });
    console.log('__________END__________');
  }
}
