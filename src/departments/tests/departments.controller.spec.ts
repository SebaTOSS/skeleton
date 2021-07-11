import createMockInstance from "jest-create-mock-instance";
import { ResourcesDTO, ResponseService } from "../../core";
import { DepartmentDTO } from "../../dtos";
import { DepartmentsResolverService } from "../../sdk/resolvers/departments-resolver.service";
import { DepartmentsController } from "../departments.controller";
import { DepartmentsService } from "../departments.service";

describe("Departments Controller", () => {
  let controller: DepartmentsController;
  let translatorService: DepartmentsService;
  let resolver: DepartmentsResolverService;
  let responseService: ResponseService;

  const reqId = 1;
  const session = {
    permissions: [],
  };
  const headers = {
    headerEE: "1",
  };
  const query = {};
  const id = 1;

  beforeEach(() => {
    translatorService = createMockInstance(DepartmentsService);
    resolver = createMockInstance(DepartmentsResolverService);
    responseService = createMockInstance(ResponseService);

    controller = new DepartmentsController(
      translatorService,
      resolver,
      responseService
    );
  });

  it("should get all", async () => {
    const getResult = {
      data: [],
      pagination: {},
    };
    const translated = new ResourcesDTO<DepartmentDTO>(DepartmentDTO);
    jest.spyOn(resolver, "get").mockResolvedValueOnce(getResult);
    jest
      .spyOn(translatorService, "translateResponses")
      .mockReturnValueOnce(translated);
    jest.spyOn(responseService, "getSuccess");

    await controller.getAll(reqId, session, headers, query);

    expect(resolver.get).toHaveBeenCalled();
    expect(translatorService.translateResponses).toHaveBeenCalled();
    expect(responseService.getSuccess).toHaveBeenCalled();
  });

  it("should get one", async () => {
    const getResult = {
      data: [],
      pagination: {},
    };
    const translated = new DepartmentDTO();
    jest.spyOn(resolver, "getOne").mockResolvedValueOnce(getResult);
    jest
      .spyOn(translatorService, "translateResponse")
      .mockReturnValueOnce(translated);
    jest.spyOn(responseService, "getSuccess");

    await controller.getOne(reqId, session, headers, id);

    expect(resolver.getOne).toHaveBeenCalledTimes(1);
    expect(translatorService.translateResponse).toHaveBeenCalled();
    expect(responseService.getSuccess).toHaveBeenCalled();
  });

  it("should create one", async () => {
    const getResult = {
      data: {},
    };
    const element = new DepartmentDTO();
    const translated = new DepartmentDTO();
    jest.spyOn(resolver, "create").mockResolvedValueOnce(getResult);
    jest.spyOn(translatorService, "translateRequest").mockReturnValueOnce({});
    jest
      .spyOn(translatorService, "translateResponse")
      .mockReturnValueOnce(translated);
    jest.spyOn(responseService, "getSuccess");

    await controller.create(reqId, session, headers, element);

    expect(translatorService.translateRequest).toHaveBeenCalled();
    expect(resolver.create).toHaveBeenCalled();
    expect(translatorService.translateResponse).toHaveBeenCalled();
    expect(responseService.getSuccess).toHaveBeenCalled();
  });

  it("should update one", async () => {
    const getResult = {
      data: {},
    };
    const element = new DepartmentDTO();
    const translated = new DepartmentDTO();
    jest.spyOn(resolver, "update").mockResolvedValueOnce(getResult);
    jest.spyOn(translatorService, "translateRequest").mockReturnValueOnce({});
    jest
      .spyOn(translatorService, "translateResponse")
      .mockReturnValueOnce(translated);
    jest.spyOn(responseService, "getSuccess");

    await controller.update(reqId, session, headers, id, element);

    expect(translatorService.translateRequest).toHaveBeenCalled();
    expect(resolver.update).toHaveBeenCalled();
    expect(translatorService.translateResponse).toHaveBeenCalled();
    expect(responseService.getSuccess).toHaveBeenCalled();
  });

  it("should patch one", async () => {
    const getResult = {
      data: {},
    };
    const element = new DepartmentDTO();
    const translated = new DepartmentDTO();
    jest.spyOn(resolver, "patch").mockResolvedValueOnce(getResult);
    jest.spyOn(translatorService, "translateRequest").mockReturnValueOnce({});
    jest
      .spyOn(translatorService, "translateResponse")
      .mockReturnValueOnce(translated);
    jest.spyOn(responseService, "getSuccess");

    await controller.patch(reqId, session, headers, id, element);

    expect(translatorService.translateRequest).toHaveBeenCalled();
    expect(resolver.patch).toHaveBeenCalled();
    expect(translatorService.translateResponse).toHaveBeenCalled();
    expect(responseService.getSuccess).toHaveBeenCalled();
  });

  it("should delete one", async () => {
    jest.spyOn(resolver, "delete").mockResolvedValueOnce();
    jest.spyOn(responseService, "getSuccess");

    await controller.delete(reqId, headers, id);

    expect(resolver.delete).toHaveBeenCalled();
    expect(responseService.getSuccess).toHaveBeenCalled();
  });
});
