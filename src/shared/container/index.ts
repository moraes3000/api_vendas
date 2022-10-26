import { container } from 'tsyringe';

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { CustomersRepositories } from './../../modules/customers/infra/typeorm/repositories/CustomersRepositories';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepositories',
  CustomersRepositories,
);
