import { UsersRequiredResourcesService } from "../users-required-resources.service";

describe("Users Required Resources Service", () => {
  let service: UsersRequiredResourcesService;

  beforeEach(() => {
    service = new UsersRequiredResourcesService();
  });

  it("should get additional resources", async () => {
    const reqId = 1;
    const header = {};
    const params = [reqId, header];
    const expected = {
      languages: {},
    };

    const result = await service.getAdditionalResources(null, params);
    expect(result).toBeDefined();
    expect(result).toEqual(expected);
  });

  it("should get additional resources filter", async () => {
    const reqId = 1;
    const header = {};
    const params = [reqId, header];

    const expected = {
      languages: {},
    };

    const result = await service.getAdditionalResourcesFilter(null, params);
    expect(result).toBeDefined();
    expect(result).toEqual(expected);
  });
});
