import { login } from "./login";

const userEmail = "uMail";
const userPassword = "uPassword";

const mockLoginSuccess = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue({
    name: "profilename",
    email: "profilename2@stud.noroff.no",
    avatar: "https://gravatar.com/avatar/=robohash&r=x",
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6Ik",
  }),
});

global.fetch = mockLoginSuccess;

beforeAll(() => {
  localStorage.clear();
});

describe("token does not exist from before", () => {
  it("verifies token did not exist from before", () => {
    expect(localStorage.__STORE__["token"]).toBe(undefined);
  });
});

describe("fetch and store user data", () => {
  it("fetches user data and saves it to local storage", async () => {
    const userData = await login(userEmail, userPassword);
    expect(localStorage.__STORE__["token"]).toBe(
      JSON.stringify(userData.accessToken),
    );
  });
});

describe("login fetch failure", () => {
  const mockLoginFailure = jest.fn().mockResolvedValue({
    ok: false,
    statusText: "Unable to fetch login data",
  });

  global.fetch = mockLoginFailure;

  it("throws an error when the request fails", async () => {
    await expect(login(userEmail, userPassword)).rejects.toThrow(
      "Unable to fetch login data",
    );
  });
});
