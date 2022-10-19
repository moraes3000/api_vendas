import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import UserTokensRepository from './../typeorm/repositories/UserTokenRespository';
import UsersRepository from '../typeorm/repositories/UsersRepositories';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('user does not exist');
    }
    console.log(user);

    const token = await userTokensRepository.generate(user.id);
    console.log(token);
  }
}

export default SendForgotPasswordEmailService;