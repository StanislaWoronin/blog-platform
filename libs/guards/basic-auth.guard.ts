import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { processSwaggerOptions } from '@nestjs/swagger/dist/backward-compatilibity-layer';

@Injectable()
export class AuthBasicGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const saLogin = process.env.SA_LOGIN;
    const saPass = process.env.SA_PASS;

    const base64 = Buffer.from(`${saLogin}:${saPass}`).toString('base64');
    const validAuthHeader = `Basic ${base64}`;

    if (authHeader !== validAuthHeader) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
