import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { OrderService } from './order.service';
import { Response } from 'express';
import { join } from 'path';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly orderService: OrderService,
  ) {}

  async bufferFile(relPath: string): Promise<any> {
    const body = fs.readFileSync(join(process.cwd(), relPath));
    return body.toString('base64');
    // return 'data:image/png;base64,' + body.toString('base64');
  }

  @Get()
  async getHello(@Res() res: Response): Promise<any> {
    console.log('request : ');

    const image_logo = await this.bufferFile('/assets/logo.png');
    const IRANYekanLight = await this.bufferFile('font url');
    const IRANYekanMedium = await this.bufferFile('font url');
    const IRANYekanBold = await this.bufferFile('font url');

    const buffer = await this.orderService.generatePDFToBuffer('order', {
      width: 400,
      height: 400,
      locals: {
        IRANYekanLight: IRANYekanLight,
        IRANYekanMedium: IRANYekanMedium,
        IRANYekanBold: IRANYekanBold,
        order_number: '7181-544756-0028',
        order_date: '1401-11-30',
        full_name: 'نام و نام خانوادگی ',
        phone_number: '۰۹۰XXXXXXX',
        order_send_date: '1401-11-30', // shipping_sent_time
        address:
          ' حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. ',
        zip_code: '',
        unit: '',
        no: '',
        image_logo: image_logo,
      },
    } as any);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      attachment: `filename=test.pdf`,
    });
    res.send(buffer);
    return;
  }
}
