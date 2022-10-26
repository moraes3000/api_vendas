import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import redisCache from '@shared/cache/RedisCache';

import Product from '../infra/http/typeorm/entities/Product';
import { ProductRepository } from '../infra/http/typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError(`There is already a product with this name ${name}`);
    }

    // const redisCache = new RedisCache();

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
