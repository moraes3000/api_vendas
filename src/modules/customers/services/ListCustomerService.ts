import { getCustomRepository } from 'typeorm';

import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepositories from '../infra/typeorm/repositories/CustomersRepositories';

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customer[];
}
class ListCustomerService {
  public async execute(): Promise<IPaginateCustomer> {
    const customerRepository = getCustomRepository(CustomersRepositories);

    const customers = await customerRepository.createQueryBuilder().paginate();

    return customers as IPaginateCustomer;
  }
}

export default ListCustomerService;
