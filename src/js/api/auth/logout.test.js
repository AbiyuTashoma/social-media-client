import { logout } from "./logout";

beforeAll(() => {
  localStorage.setItem("token", "uSeRaCcEsStOkEn");
  localStorage.setItem("profile", "username");
});

describe("token exists previuosly", () => {
  it("verifies token did exist from before", () => {
    expect(localStorage.__STORE__["token"]).toBe("uSeRaCcEsStOkEn");
    expect(localStorage.__STORE__["profile"]).toBe("username");
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
