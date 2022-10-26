import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateSessionService from '@modules/users/services/CreateSessionService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSessionService();

    const user = await createSession.execute({
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}
