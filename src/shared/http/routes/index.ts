import productsRouter from '@modules/products/routes/products.routes';
import passRouter from '@modules/users/routes/password.routes';
import sessionRouter from '@modules/users/routes/session.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);
routes.use('/password', passRouter);

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello Dev!' });
});

export default routes;
