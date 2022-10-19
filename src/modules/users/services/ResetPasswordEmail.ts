import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import { isAfter, addHours } from 'date-fns';

import { UserTokenRespository } from '../typeorm/repositories/UserTokenRespository';
import UsersRepository from '../typeorm/repositories/UsersRepositories';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordEmail {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokenRespository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User  does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await hash(password, 8);
  }
}

export default ResetPasswordEmail;
