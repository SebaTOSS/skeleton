import { APIException } from "../api.exception";
import { ErrorHandlerService } from "../error-handler.service";

describe("Error Handler Service", () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    service = new ErrorHandlerService();
  });

  it("should handle API well known exception", () => {
    const status = 400;
    const error = new Error("Test");
    const exception = new APIException("test", status, error);
    const result = service.handleAPIException(exception);

    const expectedError = {
      detail: "Test",
      code: 400,
      messages: ["BAD_REQUEST"],
    };
    expect(result.status).toEqual(status);
    expect(result.errors).toEqual(expectedError);
  });

  it("should handle API unknown exception", () => {
    const status = 100;
    const error = new Error("Test");
    const exception = new APIException("test", status, error);
    const result = service.handleAPIException(exception);

    const expectedError = {
      code: 500,
      messages: ["EnumsAPI.ERRORS.SERVER_ERROR"],
    };
    expect(result.status).toEqual(100);
    expect(result.errors).toEqual(expectedError);
  });
});
