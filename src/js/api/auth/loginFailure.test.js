import { login } from "./login";

beforeAll(() => {
  localStorage.clear();
});

const testEmail = "testMail";
const testPassword = "testPassword";

const mockLoginFailure = jest.fn().mockResolvedValue({
  ok: false,
  statusText: "Unable to fetch login data",
});

global.fetch = mockLoginFailure;

describe("login fetch failure", () => {
  it("throws an error when the request fails", async () => {
    await expect(login(testEmail, testPassword)).rejects.toThrow(
      "Unable to fetch login data",
    );
  });
});
