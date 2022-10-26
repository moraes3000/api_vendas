import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import CustomersRepositories from '../infra/typeorm/repositories/CustomersRepositories';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomersRepositories);

    const customer = await customerRepository.findOne(id);

    if (!customer) {
      throw new AppError('customer not found');
    }

    await customerRepository.remove(customer);
  }
}

export default DeleteCustomerService;
