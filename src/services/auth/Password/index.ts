import { compare, genSalt, hash } from 'bcryptjs';

export default class PasswordService {
    public static async PasswordHasher(password: string, rounds: number = 10): Promise<string> {
        const salt = await genSalt(rounds)
        const hashedPassword = await hash(password, salt)
        return hashedPassword 
    }

    public static async PasswordCompare(password: string, hashedPassword: string): Promise<boolean> {
        const isMatch = await compare(password, hashedPassword)
        return isMatch
    }
}