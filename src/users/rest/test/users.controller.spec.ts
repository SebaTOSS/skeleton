import createMockInstance from "jest-create-mock-instance";
import { ResourcesDTO, ResponseService } from "../../core";
import { UserDTO } from "../../dtos";
import { UsersResolverService } from "../../sdk";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";

describe("Owner Users Controller", () => {
  let controller: UsersController;
  let translatorService: UsersService;
  let responseService: ResponseService;
  let resolver: UsersResolverService;

  const session = {
    permissions: [],
  };
  const reqId = 1;
  const headers = {
    headerEE: "1",
  };
  const query = {};

  beforeEach(() => {
    translatorService = createMockInstance(UsersService);
    responseService = createMockInstance(ResponseService);
    resolver = createMockInstance(UsersResolverService);
    controller = new UsersController(
      translatorService,
      responseService,
      resolver
    );
  });

  it("should get all", async () => {
    const getResult = {
      data: [],
      pagination: {},
    };
    const translated = new ResourcesDTO<UserDTO>(UserDTO);

    jest.spyOn(resolver, "gelAllUsers").mockResolvedValueOnce(getResult);
    jest
      .spyOn(translatorService, "translateResponses")
      .mockReturnValueOnce(translated);
    jest.spyOn(responseService, "getSuccess");

    await controller.getAllUsers(session, reqId, headers, query);

    expect(resolver.gelAllUsers).toHaveBeenCalled();
    expect(translatorService.translateResponses).toHaveBeenCalled();
    expect(responseService.getSuccess).toHaveBeenCalled();
  });
});
