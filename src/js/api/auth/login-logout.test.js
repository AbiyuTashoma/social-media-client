import { login } from "./login";
import { logout } from "./logout";

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

describe("clean up user data on logout", () => {
  it("removes user data on logout", () => {
    logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
    expect(localStorage.removeItem).toHaveBeenCalledWith("profile");

    expect(localStorage.__STORE__["token"]).toBe(undefined);
    expect(localStorage.__STORE__["profile"]).toBe(undefined);
  });
});
