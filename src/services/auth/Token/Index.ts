import { UserToken } from "@prisma/client";
import BadRequestError from "../../../errors/BadRequestError";
import { sumDays } from "../../../utils/date";
import { prisma } from "../../prisma";

export default class TokenService {
  public static async _generateToken() {
    return crypto.getRandomValues(new Uint16Array(2)).join("-");
  }

  public static async create(
    userId: UserToken["userId"],
    tokenType: UserToken["tokenType"]
  ) {
    const token = await this._generateToken();

    const expirePeriodPerType = {
        Access: 1,
        ResetPassword: 1,
        Verified: 2,
    }

    const save = await prisma.userToken.create({
      data: {
        token,
        userId,
        tokenType,
        expireAt: sumDays(expirePeriodPerType[tokenType]),
      },
    });
    return save;
  }

  public static async _find(token: UserToken["token"]) {
    const find = await prisma.userToken.findFirstOrThrow({
      where: {
        token,
        used: false,
      },
    });

    if (find.expireAt < new Date())
      throw new BadRequestError({
        code: 400,
        message: "Token expired",
        logging: true,
      });

    return find;
  }

  protected static async _use(token: UserToken["token"]) {
    const use = await prisma.userToken.update({
      where: {
        token,
      },
      data: {
        used: true,
      },
    });

    return use;
  }
}
