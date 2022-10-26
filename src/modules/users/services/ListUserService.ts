import { getCustomRepository } from 'typeorm';

import User from '../infra/http/typeorm/entities/User';
import UsersRepository from '../infra/http/typeorm/repositories/UsersRepositories';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return users;
  }
}

export default ListUserService;
