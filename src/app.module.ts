import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { SupabaseModule } from './common/supabase';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './common/prisma/prisma.module';
import { GraphQLCustomModule } from './common/graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SupabaseModule,
    GraphQLCustomModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      debug: true,
      playground: true,
    }),
    PrismaModule,
    AuthModule,
    PassportModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: SupabaseGuard,
    // },
  ],
})
export class AppModule {}
