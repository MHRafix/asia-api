import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisaReq, VisaReqSchema } from './entities/visa-requirement.entity';
import { VisaRequirementsResolver } from './visa-requirements.resolver';
import { VisaRequirementsService } from './visa-requirements.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VisaReq.name, schema: VisaReqSchema }]),
  ],
  providers: [VisaRequirementsResolver, VisaRequirementsService],
})
export class VisaReqModule {}
