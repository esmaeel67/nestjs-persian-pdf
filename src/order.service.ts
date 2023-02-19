import { Injectable } from '@nestjs/common';
import { PDFOptions, PDFService } from '@t00nday/nestjs-pdf';
import { Observable, SchedulerLike, firstValueFrom, lastValueFrom } from 'rxjs';
import { FileInfo } from 'html-pdf';
import { Readable } from 'stream';

@Injectable()
export class OrderService {
  constructor(private readonly pdfService: PDFService) {}
  generatePDFToFile(
    template: string,
    filename: string,
    options?: PDFOptions,
    scheduler?: SchedulerLike,
  ): Observable<FileInfo> {
    return this.pdfService.toFile(template, filename, options, scheduler);
  }

  generatePDFToStream(
    template: string,
    options?: PDFOptions,
  ): Observable<Readable> {
    return this.pdfService.toStream(template, options);
  }

  // export OPENSSL_CONF=/dev/null
  async generatePDFToBuffer(
    template: string,
    options?: PDFOptions,
  ): Promise<Buffer> {
    return firstValueFrom<Buffer>(this.pdfService.toBuffer(template, options));
  }
}
