import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import { CustomersRepositories } from './../../customers/typeorm/repositories/CustomersRepositories';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customerRepositories = getCustomRepository(CustomersRepositories);
    const productsRepositories = getCustomRepository(ProductRepository);

    const customerExists = await customerRepositories.findById(customer_id);

    if (!customerExists) {
      throw new AppError(
        `Could not find any customer with the given id ${customer_id}`,
      );
    }

    const existsProducts = await productsRepositories.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError(`Could not find any products with the given id`);
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (!checkInexistentProducts.length) {
      throw new AppError(
        `Could not find any products with the given ids ${checkInexistentProducts[0].id}`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (!quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_product } = order;

    const updatedProductQuantity = order_product.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productsRepositories.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
