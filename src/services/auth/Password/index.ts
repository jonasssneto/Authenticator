import { User, UserToken } from "@prisma/client";
import { compare, genSalt, hash } from "bcryptjs";
import AuthService from "..";
import BadRequestError from "../../../errors/BadRequestError";
import MailService from "../../mail";
import { prisma } from "../../prisma";
import TokenService from "../Token/Index";

export default class PasswordService {
  public static async hasher(
    password: string,
    rounds: number = 10
  ): Promise<string> {
    const salt = await genSalt(rounds);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }

  public static async compare(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isMatch = await compare(password, hashedPassword);
    return isMatch;
  }

  public static async forgot(email: User["email"]) {
    const user = await AuthService._findUserByEmail(email);

    if (!user)
      throw new BadRequestError({
        code: 400,
        message: "User not found",
        logging: true,
      });

    const mail = MailService.getInstance();
    const token = await TokenService.create(user.id, "ResetPassword");

    mail.sendEmail(
      user.email,
      "Password Reset 🚀",
      `Here is your token to reset your password: ${token.token}`
    );

    return {
      message: "Password reset link sent to email",
    };
  }

  public static async reset(
    token: UserToken["token"],
    password: User["password"]
  ) {
    const userToken = await TokenService._find(token);

    const user = await prisma.user.findUnique({
      where: {
        id: userToken.userId,
      },
    });

    if (!user)
      throw new BadRequestError({
        code: 400,
        message: "User not found",
        logging: true,
      });

    const hashedPassword = await PasswordService.hasher(password);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      message: "Password reset successful",
    };
  }
}
