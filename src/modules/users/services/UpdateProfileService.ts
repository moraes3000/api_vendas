import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import User from '../infra/http/typeorm/entities/User';
import UsersRepository from '../infra/http/typeorm/repositories/UsersRepositories';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user not found');
    }

    const userUpdatedEmail = await usersRepository.findByEmail(email);

    if (userUpdatedEmail && userUpdatedEmail.id !== user.id) {
      throw new AppError('there is already one user with this email');
    }

    if (password && !old_password) {
      throw new AppError('old password is required');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('old password does not match');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
