import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MoneyReceipt,
  MoneyReceiptSchema,
} from './entities/money-receipt.entity';
import { MoneyReceiptResolver } from './money-receipt.resolver';
import { MoneyReceiptsService } from './money-receipt.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MoneyReceipt.name, schema: MoneyReceiptSchema },
    ]),
  ],
  providers: [MoneyReceiptResolver, MoneyReceiptsService],
})
export class MoneyReceiptModule {}
