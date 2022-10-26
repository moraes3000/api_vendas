import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepositories from '../infra/typeorm/repositories/CustomersRepositories';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepositories);

    const customerExists = await customerRepository.findByEmail(email);

    if (customerExists) {
      throw new AppError(`There is already a product with this name ${name}`);
    }

    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
