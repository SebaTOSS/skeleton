import { ArgumentMetadata } from "@nestjs/common";
import { TranslateOrderPipe } from "../translate-order.pipe";

describe("Translate order pipe", () => {
  let pipe: TranslateOrderPipe;
  const keys = {
    id: "id",
    parentId: "parent_id",
  };

  beforeEach(() => {
    pipe = new TranslateOrderPipe(keys);
  });

  it("should not transform value from body", () => {
    const value = {};
    const transformMetadata: ArgumentMetadata = {
      type: "body",
      data: "",
    };
    const result = pipe.transform(value, transformMetadata);
    expect(result).toEqual(value);
  });

  it("should not translate when value not has order", () => {
    const value = {};
    const transformMetadata: ArgumentMetadata = {
      type: "query",
      data: "",
    };
    const result = pipe.transform(value, transformMetadata);
    expect(result).toEqual(value);
  });

  it("should translate value has order", () => {
    const value = {
      order: "id,asc",
    };
    const transformMetadata: ArgumentMetadata = {
      type: "query",
      data: "",
    };
    const result = pipe.transform(value, transformMetadata);
    expect(result).toEqual({ order: { id: "asc" } });
  });
});
