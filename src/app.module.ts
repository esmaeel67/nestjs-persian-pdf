import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PDFModule, PDFModuleOptions } from '@t00nday/nestjs-pdf';
import { OrderService } from './order.service';
import { join } from 'path';
@Module({
  imports: [
    PDFModule.registerAsync({
      useFactory: (): PDFModuleOptions => {
        console.log(join(__dirname, '..', 'views'));
        console.log(join(join(__dirname, '..', 'views'), 'order', `html.pug`));
        return {
          view: {
            root: join(__dirname, '..', 'views'),
            engine: 'pug',
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, OrderService],
})
export class AppModule {}
