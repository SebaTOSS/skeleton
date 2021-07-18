import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from "nest-winston";
import { levelLog, loggerFormat } from "./logger/utils";
import * as winston from "winston";
import { TerminusModule } from "@nestjs/terminus";
import { AuthMiddleware } from "./core/security";
import { ConfigModule } from "./config/config.module";
import { CacheModule } from "./cache";
import { LoggerModule } from "./interceptors";
import { HATEOASModule } from "./interceptors/hateoas/hateoas.module";
import { HealthModule } from "./health/health.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRESTModule } from "./users";
import ConfigService from "./config/config.service";
import { DepartmentsModule } from "./departments";
import { ThrottlerModule } from "@nestjs/throttler";
import { EmailModule } from "./email/email.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

const consoleLog = new winston.transports.Console({
  level: levelLog(process.env.NODE_ENV),
  format: winston.format.combine(
    winston.format.timestamp(),
    nestWinstonModuleUtilities.format.nestLike()
  ),
  handleExceptions: true,
});

const fileLog = new winston.transports.File({
  level: levelLog(process.env.NODE_ENV),
  filename: process.env.API_FILE_LOG,
  format: winston.format.combine(winston.format.timestamp(), loggerFormat),
  handleExceptions: true,
});

const modules = [
  TerminusModule,
  WinstonModule.forRoot({
    transports: [consoleLog, fileLog],
  }),
  ConfigModule,
  CacheModule.forRoot(),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return configService.get("configurations.orm");
    },
  }),
  ThrottlerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return configService.get("configurations.rateLimit");
    },
  }),
  MailerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const { transport, defaults } = configService.get("configurations.smtp");

      return {
        transport,
        defaults,
        template: {
          dir: __dirname + "/templates",
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      };
    },
  }),
  EmailModule,
  HATEOASModule,
  LoggerModule,
  HealthModule,
  UsersRESTModule,
  DepartmentsModule,
];

const middleware: Array<any> = [AuthMiddleware];

@Module({
  imports: modules,
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(...middleware)
      .exclude(
        { path: "action-links/(.*)", method: RequestMethod.ALL },
        "favicon.ico"
      )
      .forRoutes("*");
  }
}
