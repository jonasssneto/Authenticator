import { User } from "@prisma/client";

export interface UserType {
    id?: User["id"];
    email: User["email"];
    username: User["username"];
    password: User["password"];
}

export type ICreate = Omit<UserType, "id">;

export type ILogin = Pick<UserType, "username" | "password">;

export type IForgot = Pick<UserType, "email">;