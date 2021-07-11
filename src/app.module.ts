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
import { AuthMiddleware } from "./core/security";
import { ConfigModule } from "./config/config.module";
import { CacheModule } from "./cache";
import { LoggerModule } from "./interceptors";
import { HATEOASModule } from "./interceptors/hateoas/hateoas.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRESTModule } from "./users";
import ConfigService from "./config/config.service";
import { DepartmentsModule } from "./departments";

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
  WinstonModule.forRoot({
    transports: [consoleLog, fileLog],
  }),
  ConfigModule,
  CacheModule.forRoot(),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => {
      return configService.get("configurations.orm");
    },
    inject: [ConfigService],
  }),
  HATEOASModule,
  LoggerModule,
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
        { path: "login", method: RequestMethod.ALL },
        { path: "logout", method: RequestMethod.ALL },
        { path: "remove-action-links/(.*)", method: RequestMethod.ALL },
        "livetest",
        "favicon.ico"
      )
      .forRoutes("*");
  }
}
