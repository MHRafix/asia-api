import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppSettingsModule } from './api/app-settings/app-settings.module';
import { AppointmentModule } from './api/appointment/appointment.module';
import { AttendanceModule } from './api/attendance/attendance.module';
import { BlogModule } from './api/blog/blog.module';
import { NewsModule } from './api/news/news.module';
import { PackageBookingModule } from './api/package-booking/package-booking.module';
import { ServicesModule } from './api/services/services.module';
import { TeamModule } from './api/team/team.module';
import { TravelPackagesModule } from './api/travel-packages/travel-packages.module';
import { UsersModule } from './api/users/users.module';
import { VisaReqModule } from './api/visa-requirements/visa-requirements.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './app/config';
import { JwtStrategy } from './app/config/jwtStrategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
      envFilePath: [
        '.env',
        '.env.local',
        '.env.development',
        '.env.production',
      ],
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      introspection: true,
    }),

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI),
    // APIs
    UsersModule,
    TravelPackagesModule,
    AppointmentModule,
    ServicesModule,
    TeamModule,
    NewsModule,
    PackageBookingModule,
    AppSettingsModule,
    AttendanceModule,
    VisaReqModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
