import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import { UserTokenRespository } from './../typeorm/repositories/UserTokenRespository';
import UsersRepository from '../typeorm/repositories/UsersRepositories';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokenRespository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('user does not exist');
    }

    const token = await userTokensRepository.generete(user.id);
    console.log(token);
  }
}

export default SendForgotPasswordEmailService;
