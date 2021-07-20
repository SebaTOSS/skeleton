import createMockInstance from "jest-create-mock-instance";
import { ResponseService } from "../../../core";
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
    jest.spyOn(responseService, "getSuccess");

    await controller.find(query);

    expect(responseService.getSuccess).toHaveBeenCalled();
  });
});
