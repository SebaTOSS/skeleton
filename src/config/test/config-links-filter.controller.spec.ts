import { ResponseService } from "../../core";
import { ConfigLinksFilterController } from "../config-links-filter.controller";
import { ConfigManagerLinksFilterService } from "../config-manager-links-filter.service";
import ConfigService from "../config.service";
import { LinkRemoveItem } from "../dtos";

describe("Config Manager Links Controller", () => {
  let configService: ConfigService;
  let responseService: ResponseService;
  let configManagerLinksService: ConfigManagerLinksFilterService;

  let controller: ConfigLinksFilterController;

  let reqId;

  beforeEach(() => {
    reqId = 0;
    configService = new ConfigService();
    configService.config = __dirname + "/config/config.json";
    configService.sensible = __dirname + "/config/sensible.json";
    responseService = new ResponseService();
    configManagerLinksService = new ConfigManagerLinksFilterService(
      configService
    );

    controller = new ConfigLinksFilterController(
      responseService,
      configManagerLinksService
    );
  });

  describe("Manager Settings", () => {
    it("Get items", async (done) => {
      configService.init();
      const { data } = await controller.get();
      const expected = [
        {
          entity: "AgentDTO",
          links: ["self.activation"],
        },
      ];

      expect(data).toEqual(expected);

      return done();
    });
    it("Add item", async (done) => {
      configService.init();
      const newItem = new LinkRemoveItem();
      newItem.entity = "DTO";
      newItem.links = ["self.read"];
      await controller.add(reqId, newItem);

      return done();
    });

    it("Delete item", async (done) => {
      configService.init();
      const payload = {
        entity: "DTO",
      };

      await controller.remove(reqId, payload);

      return done();
    });
  });
});
