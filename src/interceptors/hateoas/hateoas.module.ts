import { Global, Module } from "@nestjs/common";
import { UtilsModule } from "../../utils";
import { LinkGeneratorInterceptor } from "./link.generator.interceptor";

@Global()
@Module({
  imports: [UtilsModule],
  providers: [LinkGeneratorInterceptor],
  exports: [LinkGeneratorInterceptor],
})
export class HATEOASModule {}
