import { getCustomRepository } from 'typeorm';

import Customer from '../typeorm/entities/Customer';
import CustomersRepositories from '../typeorm/repositories/CustomersRepositories';

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomersRepositories);

    const customers = await customerRepository.find();

    return customers;
  }
}

export default ListCustomerService;
