import createMockInstance from "jest-create-mock-instance";
import { ResourcesDTO, ResponseService } from "../../../core";
import { UserDTO } from "../../dtos";
import { UsersController } from "../users.controller";
import { UsersService } from "../../model/users.service";

describe("Owner Users Controller", () => {
  let controller: UsersController;
  let userService: UsersService;
  let responseService: ResponseService;
  const query = {};

  beforeEach(() => {
    userService = createMockInstance(UsersService);
    responseService = createMockInstance(ResponseService);
    controller = new UsersController(userService, responseService);
  });

  it("should get all", async () => {
    const getResult = {
      data: [],
      pagination: {},
    };

    jest.spyOn(responseService, "getSuccess");

    await controller.find(query);

    expect(responseService.getSuccess).toHaveBeenCalled();
  });
});
