import createMockInstance from "jest-create-mock-instance";
import { ResponseService } from "../../..";
import { MockCacheService } from "../../../../../test/mock-cache.service";
import { CacheService } from "../../../../cache/cache.service";
import ConfigService from "../../../../config/config.service";
import { ApiKeyService } from "../../apikey.service";
import { AuthMiddleware } from "../auth.middleware";
import { NotFound } from "./../../../../cache/cache.exceptions.entity";

describe("Auth middleware", () => {
  let authMiddleware: AuthMiddleware;
  let cacheService: CacheService;
  let responseService: ResponseService;
  let configService: ConfigService;
  let apiKeyService: ApiKeyService;

  beforeEach(() => {
    responseService = new ResponseService();
    cacheService = new MockCacheService();
    configService = createMockInstance(ConfigService);
    jest.spyOn(configService, "get").mockReturnValue({ api: "test1" });
    apiKeyService = new ApiKeyService(configService);
    authMiddleware = new AuthMiddleware(
      cacheService,
      apiKeyService,
      responseService
    );
  });

  it("should set session on request", async () => {
    const req: any = {
      headers: {
        authorization: {},
      },
      query: {},
    };
    const res = {};
    const next = jest.fn();

    const session = {};
    const data = {
      session,
    };

    jest.spyOn(cacheService, "getAndTouch").mockResolvedValueOnce(data);

    await authMiddleware.use(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(cacheService.getAndTouch).toHaveBeenCalled();
    expect(req.session).toEqual(session);
  });

  it("should handle a redirect", async () => {
    const req: any = {
      headers: {
        authorization: {},
      },
      query: {},
    };
    const res = {};
    const next = jest.fn();

    jest.spyOn(apiKeyService, "isValidApiKey").mockReturnValue(true);

    await authMiddleware.use(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(apiKeyService.isValidApiKey).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("should handle a not found", async () => {
    const req: any = {
      headers: {
        authorization: {},
      },
      query: {},
    };
    const res = {
      status: jest.fn(),
      type: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const error = new NotFound("");
    jest.spyOn(cacheService, "getAndTouch").mockRejectedValueOnce(error);
    jest.spyOn(responseService, "getError");

    await authMiddleware.use(req, res, next);

    expect(next).not.toHaveBeenCalledTimes(1);
    expect(cacheService.getAndTouch).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.type).toHaveBeenCalledWith("application/json");
    expect(res.json).toHaveBeenCalled();
    expect(responseService.getError).toHaveBeenCalled();
  });

  it("should handle a unknown error", async () => {
    const req: any = {
      headers: {
        authorization: {},
      },
      query: {},
    };
    const res = {
      status: jest.fn(),
      type: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const error = {};
    jest.spyOn(cacheService, "getAndTouch").mockRejectedValueOnce(error);
    jest.spyOn(responseService, "getError");

    await authMiddleware.use(req, res, next);

    expect(next).not.toHaveBeenCalledTimes(1);
    expect(cacheService.getAndTouch).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.type).toHaveBeenCalledWith("application/json");
    expect(res.json).toHaveBeenCalled();
    expect(responseService.getError).not.toHaveBeenCalled();
  });
});
