import PasswordService from "./index";

describe("Password", () => {
  it("should generate a hashed password", async () => {
    const hashedPassword = await PasswordService.hasher("password");

    expect(hashedPassword).toEqual(expect.any(String));
  });

  it("should compare a password and a hashed password", async () => {
    const hashedPassword = await PasswordService.hasher("password");
    const isMatch = await PasswordService.compare("password", hashedPassword);

    expect(isMatch).toBe(true);
  });
});
