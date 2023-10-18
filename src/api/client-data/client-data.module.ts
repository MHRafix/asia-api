import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientDataResolver } from './client-data.resolver';
import { ClientDataService } from './client-data.service';
import { ClientData, ClientDataSchema } from './entities/client-data.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClientData.name, schema: ClientDataSchema },
    ]),
  ],
  providers: [ClientDataResolver, ClientDataService],
})
export class ClientDataModule {}
