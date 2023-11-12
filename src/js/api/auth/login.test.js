import { login } from "./login";

const userEmail = "uMail";
const userPassword = "uPassword";

const mockLoginSuccess = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue({
    name: "Student",
    email: "profile_name2@stud.noroff.no",
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
      JSON.stringify("eyJhbGciOiJIUzI1NiIsInR5cCI6Ik"),
    );
    expect(userData.accessToken).toBe(undefined);
  });
});
