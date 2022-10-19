import authConfig from '@config/auth';
import { Response, Request, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

import { verify } from 'jsonwebtoken';

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoderToken = verify(token, authConfig.jwt.secret);

    return next();
  } catch (error) {
    throw new AppError('JWT Token is invalid.');
  }
}
