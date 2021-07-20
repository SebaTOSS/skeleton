import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { expressMiddleware } from "prometheus-api-metrics";
import * as helmet from "helmet";

function generateDocumentation(app) {
  const options = new DocumentBuilder()
    .setTitle("Skeleton API")
    .setDescription("Skeleton API description")
    .setVersion("1.0")
    .addTag("Skeleton API")
    .addSecurity("authorization", {
      type: "apiKey",
      in: "header",
      name: "authorization",
    })
    .addSecurityRequirements("authorization", [])
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);
}

function getAppOptions() {
  return {};
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, getAppOptions());

  if (process.env.NODE_ENV !== "prod") {
    generateDocumentation(app);
    app.enableCors();
  }
  app.use(expressMiddleware());
  app.use(helmet());

  await app.listen(process.env.PORT);
}
bootstrap();
