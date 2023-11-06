import { save } from "./save";
import { load } from "./load";
import { remove } from "./remove";

describe("saves, retrieves and deletes access token to/from local storage", () => {
  const accessKey = "token";
  const accessValue = "qwerty";

  it("verifies token does not exist from before", () => {
    expect(localStorage.__STORE__[accessKey]).toBe(undefined);
  });

  it("saves access token to local storage", () => {
    save(accessKey, accessValue);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      accessKey,
      JSON.stringify(accessValue),
    );
    expect(localStorage.__STORE__[accessKey]).toBe(JSON.stringify(accessValue));
  });

  it("retreives access token from local storage", () => {
    load(accessKey);
    expect(localStorage.getItem).toHaveBeenLastCalledWith(accessKey);
    expect(localStorage.__STORE__[accessKey]).toBe(JSON.stringify(accessValue));
  });

  it("deletes access token from local storage", () => {
    remove(accessKey);
    expect(localStorage.removeItem).toHaveBeenLastCalledWith(accessKey);
    expect(localStorage.__STORE__[accessKey]).toBe(undefined);
  });
});
