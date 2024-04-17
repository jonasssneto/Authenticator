import { UserToken } from '@prisma/client';
import BadRequestError from '../../../errors/BadRequestError';
import { sumDays } from '../../../utils/date';
import { prisma } from '../../prisma';

export default class TokenService {
    protected static async _generateToken() {
        return crypto.getRandomValues(new Uint16Array(2)).join("-")
    }

    public static async create(userId: UserToken["userId"], tokenType: UserToken["tokenType"]) {
        const token = await this._generateToken()

        const save = await prisma.userToken.create({
            data: {
                token,
                userId,
                tokenType,
                expireAt: sumDays(2)
            }
        })
        return save
    }

    public static async find(token: UserToken["token"]) {
        const find = await prisma.userToken.findFirstOrThrow({
            where: {
                token,
                used: false
            }
        })

        if(find.expireAt < new Date()) throw new BadRequestError({
            code: 400,
            message: "Token expired",
            logging: true,
          });

        return find
    }

    public static async use(token: UserToken["token"]) {
        const use = await prisma.userToken.update({
            where: {
                token
            },
            data: {
                used: true
            }
        })

        return use
    }
}