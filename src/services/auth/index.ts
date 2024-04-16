import BadRequestError from "../../errors/BadRequestError";
import { prisma } from "../prisma";
import PasswordService from "./Password";
import { ICreate, ILogin } from "./types";

export default class AuthService {
  protected static async isExist(
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

  public static async create(data: ICreate) {
    const { email, username } = data;

    const exist = await this.isExist(email, username);

    if (exist) {
        throw new BadRequestError({code: 400, message: "user already exists", logging: true});
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
            username: username
        }
    });

   
    
    if(!login) throw new BadRequestError({code: 400, message: "Invalid credentials", logging: true});


    const isMatch = await PasswordService.PasswordCompare(
      password,
      login.password
    );

    if (!isMatch) throw new BadRequestError({code: 400, message: "Invalid credentials", logging: true});

    return {
      message: "Login successful",
      user: {
        id: login.id,
        email: login.email,
        username: login.username,
      },
    };
  }
}
