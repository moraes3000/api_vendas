import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepositories from '../infra/typeorm/repositories/CustomersRepositories';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepositories);

    const customer = await customerRepository.findOne(id);

    if (!customer) {
      throw new AppError('customer not found.');
    }

    const customerExists = await customerRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
