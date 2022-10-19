import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepositories';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`Incorrect email or password`, 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError(`Incorrect email or password`, 401);
    }

    const token = sign({}, 'e87ae5d1eae36d7ccc3170dd0173df40', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
