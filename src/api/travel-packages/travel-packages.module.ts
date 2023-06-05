import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TravelPackage,
  TravelPackageSchema,
} from './entities/travel-package.entity';
import { TravelPackagesResolver } from './travel-packages.resolver';
import { TravelPackagesService } from './travel-packages.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TravelPackage.name, schema: TravelPackageSchema },
    ]),
  ],
  providers: [TravelPackagesResolver, TravelPackagesService],
  exports: [TravelPackagesService],
})
export class TravelPackagesModule {}
