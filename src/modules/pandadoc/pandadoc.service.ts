import { Injectable } from '@nestjs/common/decorators';
import { HttpService } from '@nestjs/axios';
import { Recipient } from './interfaces/pdf.interface';
import { firstValueFrom } from 'rxjs';
import { FormData } from 'formdata-node';
import { Readable } from 'stream';
import { createReadStream } from 'fs';
import { Blob } from 'buffer';

@Injectable()
export class PandaDocAPIService {
  api_key = 'c22248804114aab5caf1c15fe4793288ffbca2c5';
  endpoit = 'https://api.pandadoc.com/public/v1/documents';
  constructor(private readonly httpService: HttpService) {}

  async createDocument(file: ArrayBuffer, recipients: Recipient[]) {
    const formData = new FormData();
    // const stream = fs.createReadStream(file);
    // console.log('stream: ', stream);
    const data = {
      name: 'Sample Document from POC',
      recipients,
      tags: ['created_via_api'],
      parse_form_fields: true,
    };
    console.log('file: ', file);
    const pdfBlob = new Blob([Buffer.from(file)], { type: 'application/pdf' });

    // const fileStream = createReadStream(file);
    // const readableStream = new Readable();
    // readableStream.push(Buffer.from(file));
    // readableStream.push(null);

    formData.append('file', pdfBlob, 'file.pdf');
    formData.append('data', JSON.stringify(data));
    const res = await firstValueFrom(
      this.httpService.post<{ id: string }>(this.endpoit, formData, {
        headers: {
          Authorization: `API-Key ${this.api_key}`,
          'Content-Type': 'multipart/form-data',
        },
        maxBodyLength: Infinity,
      }),
    );
    console.log('Document Created: ', res);
    console.log('Document Id: ', res.data.id);
    await this.getDocumentStatus(res.data.id);
    await this.sendDocument(res.data.id);
  }

  async sendDocument(
    documentId: string,
    message = 'Hello! This document was sent from the PandaDoc API.',
  ) {
    const res = await firstValueFrom(
      this.httpService.post(
        `${this.endpoit}/${documentId}/send`,
        {
          message,
          silent: false,
        },
        {
          headers: {
            Authorization: `API-Key ${this.api_key}`,
            'Content-Type': 'application/json',
          },
        },
      ),
    );
    console.log('Document Sent: ', res);
  }

  async getDocumentStatus(documentId: string, steps = 4): Promise<string> {
    const res = await firstValueFrom(
      this.httpService.get<{ status: 'document.draft' | 'document.uploaded' }>(
        `${this.endpoit}/${documentId}`,
        {
          headers: {
            Authorization: `API-Key ${this.api_key}`,
          },
        },
      ),
    );
    if (res.data.status === 'document.draft') {
      console.log('Document is in draft mode');
      return 'Document is in draft mode';
    }
    // timeout 500ms
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (steps > 0) {
      return await this.getDocumentStatus(documentId, steps - 1);
    }
    throw new Error('Document is not uploaded');
  }
}
