import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import { compare, hash } from 'bcryptjs';

import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepositories';

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`Incorrect email or password`, 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError(`Incorrect email or password`, 401);
    }

    return user;
  }
}

export default CreateSessionService;
