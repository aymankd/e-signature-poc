import { Injectable } from '@nestjs/common/decorators';
import { HttpService } from '@nestjs/axios';
import { Recipient } from './interfaces/pdf.interface';
import { firstValueFrom } from 'rxjs';
import { FormData } from 'formdata-node';
import { Readable } from 'stream';
import { createReadStream } from 'fs';
import { Blob } from 'buffer';
import * as DocuSign from 'docusign-esign';
import {
  EnvelopeDefinition,
  Document as DocuDocument,
  Signer,
  SignHere,
  Tabs,
} from 'docusign-esign';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class DocuSignService {
  IntegratorKey = '8e16da013-ce20-43f4-a3a7-3639b510202c';
  client_id = '8ff9d70f-1c43-407c-af98-bb6faa182e28';
  user_id = 'fa49ae71-85b2-4fcb-a189-e87db202fe40';
  scopes = ['signature'];
  key: string;
  dsApiClient: DocuSign.ApiClient;
  envelopeApi: DocuSign.EnvelopesApi;
  token: string | undefined = undefined;
  constructor(private readonly configService: ConfigService) {
    this.dsApiClient = new DocuSign.ApiClient();
    this.dsApiClient.setBasePath('https://demo.docusign.net/restapi');
    this.dsApiClient.setOAuthBasePath('account-d.docusign.com');
    this.envelopeApi = new DocuSign.EnvelopesApi(this.dsApiClient);
    const key = this.configService.get<string>('DOCUSIGN_PRIVATE_RSA');
    if (key) {
      this.key = key;
      console.log('Key found: ', key);
    } else {
      console.log('No key found');
      process.exit(1);
    }
  }

  async createDocument(file: ArrayBuffer, signer: Signer) {
    // ArrayBuffer to base64
    const base64 = Buffer.from(file).toString('base64');
    const pdfDoc: DocuDocument = {
      documentBase64: base64,
      name: 'Genrated.pdf',
      fileExtension: 'pdf',
      documentId: '1',
    };
    const envelopeDefinition: EnvelopeDefinition = {
      emailSubject: 'Please sign this document',
      documents: [pdfDoc],
    };
    const signHere: SignHere = {
      documentId: '1',
      pageNumber: '1',
      recipientId: '1',
      tabLabel: 'SignHereTab',
      xPosition: '100',
      yPosition: '200',
    };

    const tabs: Tabs = {
      signHereTabs: [signHere],
    };
    signer.tabs = tabs;
    envelopeDefinition.recipients = {
      signers: [signer],
    };
    envelopeDefinition.status = 'sent';

    const envelopSummary = await this.envelopeApi.createEnvelope('22158889', {
      envelopeDefinition,
    });

    console.log('envelopSummary: ', envelopSummary);
  }

  async connect() {
    const res = await this.dsApiClient.requestJWTUserToken(
      this.client_id,
      this.user_id,
      this.scopes,
      Buffer.from(this.key),
      3600,
    );
    if (res.body.access_token) {
      this.token = res.body.access_token;
      this.dsApiClient.addDefaultHeader(
        'Authorization',
        `Bearer ${this.token}`,
      );
      this.envelopeApi = new DocuSign.EnvelopesApi(this.dsApiClient);
    }
  }
}
