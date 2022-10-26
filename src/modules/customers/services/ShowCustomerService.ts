import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepositories from '../infra/typeorm/repositories/CustomersRepositories';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepositories);

    const customer = await customerRepository.findOne(id);

    if (!customer) {
      throw new AppError('customer not found');
    }

    return customer;
  }
}

export default ShowCustomerService;
