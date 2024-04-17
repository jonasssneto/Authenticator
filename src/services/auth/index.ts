import { type User, type UserToken } from '@prisma/client';
import BadRequestError from '../../errors/BadRequestError';
import MailService from '../mail';
import { prisma } from '../prisma';
import PasswordService from './Password';
import { type ICreate, type ILogin } from './types';

export default class AuthService {
	protected static async _userExist(
		email: string,
		username: string,
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
		return Boolean(isExist);
	}

	public static async _findUserByEmail(email: User['email']) {
		const user = await prisma.user.findFirst({
			where: {
				email,
			},
		});
		return user;
	}

	public static async create(data: ICreate) {
		const {email, username} = data;

		const exist = await this._userExist(email, username);

		if (exist) {
			throw new BadRequestError({
				code: 400,
				message: 'user already exists',
				logging: true,
			});
		}

		data.password = await PasswordService.hasher(data.password);

		const create = await prisma.user.create({
			data,
		});
		return create;
	}

	public static async login(data: ILogin) {
		const {password, username} = data;

		const login = await prisma.user.findFirst({
			where: {
				username,
			},
		});

		if (!login) {
			throw new BadRequestError({
				code: 400,
				message: 'Invalid credentials',
				logging: true,
			});
		}

		const isMatch = await PasswordService.compare(password, login.password);

		if (!isMatch) {
			throw new BadRequestError({
				code: 400,
				message: 'Invalid credentials',
				logging: true,
			});
		}

		const mail = MailService.getInstance();

		mail.sendEmail(login.email, 'Login', 'You have successfully logged in');

		return {
			message: 'Login successful',
			user: {
				id: login.id,
				email: login.email,
				username: login.username,
			},
		};
	}

	public static async verify(token: UserToken['token']) {

	}
}
