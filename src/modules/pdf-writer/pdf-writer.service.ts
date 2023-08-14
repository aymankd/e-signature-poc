import { Injectable } from '@nestjs/common/decorators';
import { jsPDF, TextOptionsLight } from 'jspdf';
import { A4 } from '../../constants';

@Injectable()
export class PdfWriterService {
  createPdfFile() {
    const doc = new jsPDF({
      compress: true,
      format: 'a4',
      unit: 'mm',
    });

    this.createText(doc, 'DEVIS HOME', {
      x: A4.startX,
      y: 15,
    });

    this.createText(doc, '{signature:s1_______}', {
      x: A4.startX,
      y: 80,
    });

    this.createText(doc, '{signature:s2____________}', {
      x: A4.startX + 50,
      y: 80,
    });

    doc.close();
    return doc.output('arraybuffer');
  }

  createPdfFile_v2() {
    const doc = new jsPDF({
      compress: true,
      format: 'a4',
      unit: 'mm',
    });

    this.createText(doc, 'DEVIS HOME', {
      x: A4.startX,
      y: 15,
    });

    doc.close();
    return doc.output('arraybuffer');
  }

  private createText(
    doc: jsPDF,
    text: string,
    { x = 10, y = 10 },
    options?: TextOptionsLight,
  ) {
    doc.text(text, x, y, options);
  }
}
