import { User } from "@prisma/client";
import { prisma } from "../prisma";

export default class ProfileService {
    public static async uploadAvatar(path: User["avatar"], userId: User["id"]){
        await prisma.user.update({
            where: { id: userId },
            data: { avatar: path },
        })
    }

}