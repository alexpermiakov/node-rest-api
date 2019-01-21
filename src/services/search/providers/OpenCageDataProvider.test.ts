import request from "request-promise";
import * as Provider from "./OpenCageDataProvider";

jest.mock("request-promise");

describe("OpenCageDataProvider", () => {
  test("an empty query string", async () => {
    (request as any).mockImplementation(() => '{"features": []}');
    const result = await Provider.getPlaces("Chamonix");
    expect(result).toEqual({ features: [] });
  });

  test("an invalid non-json response", async () => {
    (request as any).mockImplementation(() => "Service Unavailable.");
    expect(Provider.getPlaces("Chamonix")).rejects.toThrow(SyntaxError);
  });
});
