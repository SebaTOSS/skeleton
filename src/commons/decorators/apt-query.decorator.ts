import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UtilsService } from "../../utils";

export const AptQuery = createParamDecorator(
  (dictionary: object, ctx: ExecutionContext) => {
    const { query } = ctx.switchToHttp().getRequest();
    const aptQuery = {
      ...UtilsService.translateOrderQuery(query, dictionary, "value"),
    };

    return aptQuery;
  }
);
