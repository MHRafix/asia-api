import { Module } from '@nestjs/common';
import { TravelPackagesService } from './travel-packages.service';
import { TravelPackagesResolver } from './travel-packages.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TravelPackage,
  TravelPackageSchema,
} from './entities/travel-package.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TravelPackage.name, schema: TravelPackageSchema },
    ]),
  ],
  providers: [TravelPackagesResolver, TravelPackagesService],
})
export class TravelPackagesModule {}
