import { ArgumentMetadata } from "@nestjs/common";
import { DefaultPaginationPipe } from "../default-pagination.pipe";

describe("Default pagination pipe", () => {
  let pipe: DefaultPaginationPipe;

  beforeEach(() => {
    pipe = new DefaultPaginationPipe();
  });

  it("should not transform data from body", () => {
    const value = 1;
    const metadata = {
      type: null,
      data: "",
    };
    const result = pipe.transform(value, metadata);
    expect(result).toEqual(1);
  });

  it("should return default value", () => {
    const value = {};
    const transformMetadata: ArgumentMetadata = {
      type: "query",
      data: "",
    };
    const result = pipe.transform(value, transformMetadata);
    expect(result).toEqual({
      skip: 0,
      take: 10,
    });
  });

  it("should not modify value", () => {
    const value = { perPage: 20 };
    const transformMetadata: ArgumentMetadata = {
      type: "query",
      data: "",
    };
    const result = pipe.transform(value, transformMetadata);
    expect(result).toEqual({
      perPage: 20,
      skip: 0,
      take: 20,
    });
  });
});
