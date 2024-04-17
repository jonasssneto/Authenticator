import { User, UserToken } from "@prisma/client";
import BadRequestError from "../../errors/BadRequestError";
import MailService from "../mail";
import { prisma } from "../prisma";
import PasswordService from "./Password";
import TokenService from "./Token/Index";
import { ICreate, ILogin } from "./types";

export default class dAuthService {
  protected static async _userExist(
    email: string,
    username: string
  ): Promise<boolean> {
    const isExist = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            username,
          },
        ],
      },
    });
    return isExist ? true : false;
  }

  protected static async _findUserByEmail(email: User["email"]) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }

  public static async create(data: ICreate) {
    const { email, username } = data;

    const exist = await this._userExist(email, username);

    if (exist) {
      throw new BadRequestError({
        code: 400,
        message: "user already exists",
        logging: true,
      });
    }

    data.password = await PasswordService.PasswordHasher(data.password);

    const create = await prisma.user.create({
      data,
    });
    return create;
  }

  public static async login(data: ILogin) {
    const { password, username } = data;

    const login = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!login)
      throw new BadRequestError({
        code: 400,
        message: "Invalid credentials",
        logging: true,
      });

    const isMatch = await PasswordService.PasswordCompare(
      password,
      login.password
    );

    if (!isMatch)
      throw new BadRequestError({
        code: 400,
        message: "Invalid credentials",
        logging: true,
      });

    const mail = MailService.getInstance();

    mail.sendEmail(login.email, "Login", "You have successfully logged in");

    return {
      message: "Login successful",
      user: {
        id: login.id,
        email: login.email,
        username: login.username,
      },
    };
  }

  public static async forgot(email: User["email"]) {
    const user = await this._findUserByEmail(email);

    if (!user)
      throw new BadRequestError({
        code: 400,
        message: "User not found",
        logging: true,
      });

    const mail = MailService.getInstance();
    const token = await TokenService.create(user.id, "ResetPassword")

    mail.sendEmail(
      user.email,
      "Password Reset 🚀",
      `Here is your token to reset your password: ${token.token}`
    );

    return {
      message: "Password reset link sent to email",
    };
  }

  public static async resetPassword(token: UserToken["token"], password: User["password"]) {
    const userToken = await TokenService.find(token);

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

    const hashedPassword = await PasswordService.PasswordHasher(password);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    await TokenService.use(token);

    return {
      message: "Password reset successful",
    };
  }
}
