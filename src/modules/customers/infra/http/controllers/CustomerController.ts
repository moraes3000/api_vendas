import { Request, Response } from 'express';

import CreateCustomerService from '../../../services/CreateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import ListCustomerService from '../../../services/ListCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';

import CustomersRepositories from '../../typeorm/repositories/CustomersRepositories';

export default class CustomerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomer = new ListCustomerService();

    const customers = await listCustomer.execute();

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = new ShowCustomerService();

    const customer = await showProduct.execute({ id });

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const customersRepositories = new CustomersRepositories();

    const createProduct = new CreateCustomerService(customersRepositories);

    const customer = await createProduct.execute({ name, email });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateProduct = new UpdateCustomerService();

    const customer = await updateProduct.execute({ name, email, id });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = new DeleteCustomerService();

    await deleteProduct.execute({ id });

    return response.json([]);
  }
}
