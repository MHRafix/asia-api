import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppSettingsResolver } from './app-settings.resolver';
import { AppSettingsService } from './app-settings.service';
import { AppSettings, AppSettingsSchema } from './entities/app-setting.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppSettings.name, schema: AppSettingsSchema },
    ]),
  ],

  providers: [AppSettingsResolver, AppSettingsService],
})
export class AppSettingsModule {}
