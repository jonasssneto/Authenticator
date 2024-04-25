import TokenService from "./Index";

describe("Token", () => {
  it("should generate a token", async () => {
    const token = await TokenService._generateToken();

    expect(token).toEqual(expect.any(String));
  });
});
