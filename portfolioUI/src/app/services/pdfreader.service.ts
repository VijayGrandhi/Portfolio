// pdf-reader.service.ts
import { Injectable } from '@angular/core';
import * as pdfjs from 'pdfjs-dist';

@Injectable({
  providedIn: 'root'
})
export class PdfReaderService {

  constructor() { }

  readPdf(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const typedArray = new Uint8Array(reader.result as ArrayBuffer);
        pdfjs.getDocument(typedArray).promise
          .then(pdf => this.extractTextFromPdf(pdf))
          .then(text => resolve(text))
          .catch(error => reject(error));
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  private extractTextFromPdf(pdf: any): Promise<string> {
    const numPages = pdf.numPages;
    const promises: Promise<any>[] = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      promises.push(pdf.getPage(pageNum));
    }

    return Promise.all(promises)
      .then(pages => {
        const pageTexts: string[] = [];
        pages.forEach(page => {
          return page.getTextContent().then((content: { items: any[]; }) => {
            const pageText = content.items.map(item => item.str).join(' ');
            pageTexts.push(pageText);
          });
        });
        return pageTexts.join('\n');
      });
  }
}
