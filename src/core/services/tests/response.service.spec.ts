import { ResourceDTO } from "../../../core/dtos";
import { ResponseService } from "../response.service";

describe("Response service", () => {
  let service: ResponseService;

  beforeEach(() => {
    service = new ResponseService();
  });

  describe("Get success", () => {
    it("should return a success response without data", () => {
      const result = service.getSuccess();

      expect(result).toBeDefined();
      expect(result).toEqual({
        success: true,
        errors: [],
        warnings: [],
      });
    });

    it("should return a success response with data", () => {
      class DummyDTO extends ResourceDTO {}
      const data = new DummyDTO();
      const result = service.getSuccess(data);

      expect(result).toBeDefined();
      expect(result).toEqual({
        data,
        success: true,
        errors: [],
        warnings: [],
      });
    });
  });

  describe("Get error", () => {
    it("should return error", () => {
      const errors = [
        {
          code: 1,
          message: "error",
          details: "error",
          avoid: true,
        },
      ];
      const result = service.getError(errors);

      expect(result).toBeDefined();
      expect(result).toEqual({
        success: false,
        errors: [
          {
            code: 1,
            message: "error",
            details: "error",
          },
        ],
      });
    });
  });
});
