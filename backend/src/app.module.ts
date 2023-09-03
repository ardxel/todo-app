import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { HttpExceptionFilter } from './common/exceptions';
import { LoggerMiddleware } from './common/middleware';
import configuration from './config';
import { UserModule } from './user';

@Module({
  imports: [
    /* Config Module */
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    /* Database Module */
    MongooseModule.forRoot(process.env.DB_URI as string),
    /* User Module */
    UserModule,
    /* Auth module */
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /* custom http exception filter for handling errors */
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
