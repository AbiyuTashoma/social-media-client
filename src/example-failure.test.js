import getExampleData from "./example.js";

// Testing failure
const mockFetchFailure = jest.fn().mockResolvedValue({
  ok: false,
});

global.fetch = mockFetchFailure;

describe("getExampleData", () => {
  it("throws an error when the request fails", async () => {
    await expect(getExampleData(3)).rejects.toThrow("Unable to fetch data");
  });
});
