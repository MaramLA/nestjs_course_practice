import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from 'src/auth/config/jwt.config';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // extract the request form the execution context
    const request = context.switchToHttp().getRequest();
    // console.log('request: ', request);

    // extract the token from the header
    const token = this.extractRquestFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    // validate the token
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );

      // attach user email and id to the request after extracting them from the token
      request[REQUEST_USER_KEY] = payload;
      // console.log('payload: ', payload);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractRquestFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    // console.log('token: ', token);
    // console.log('_: ', _);
    return token;
  }
}
