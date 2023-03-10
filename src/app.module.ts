import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppointmentModule } from './api/appointment/appointment.module';
import { PackageBookingModule } from './api/package-booking/package-booking.module';
import { ServicesModule } from './api/services/services.module';
import { TeamModule } from './api/team/team.module';
import { TravelPackagesModule } from './api/travel-packages/travel-packages.module';
import { UsersModule } from './api/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './app/config';

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
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI),
    // APIs
    UsersModule,
    TravelPackagesModule,
    AppointmentModule,
    ServicesModule,
    TeamModule,
    PackageBookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
