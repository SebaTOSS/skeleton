import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LinksFactoryService } from "../../core";

@Injectable()
export class LinkGeneratorInterceptor implements NestInterceptor {
  constructor(private readonly linksService: LinksFactoryService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((response) => {
        const request = context.switchToHttp().getRequest();
        const { permissions } = request.session;
        const { data, success } = response;

        if (success) {
          this.linksService.set(data, permissions);
        }
      })
    );
  }
}
