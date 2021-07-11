import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
} from "@nestjs/terminus";

@ApiTags("Health")
@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "System check health",
  })
  @ApiOperation({
    summary: "System check health",
  })
  check() {
    return this.health.check([
      () => this.http.pingCheck("net-connection", "https://docs.nestjs.com"),
      () => this.db.pingCheck("skeleton"),
    ]);
  }
}
