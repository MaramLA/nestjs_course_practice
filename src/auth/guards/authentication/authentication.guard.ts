import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AccessTokenGuard } from '../access-token/access-token.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // console.log(this.authTypeGuardMap);

    // Grab the authtypes assigned to a controller method
    const authTypes = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuard.defaultAuthType];

    // console.log('authTypes: ', authTypes);

    const authTypesArray = Array.isArray(authTypes) ? authTypes : [authTypes];

    // Assign a guard to each auth type
    const guards = authTypesArray
      .map((type) => this.authTypeGuardMap[type])
      .flat();
    // console.log('guards: ', guards);

    // default error
    let error = new UnauthorizedException();

    // fire the canActivate function of each guard
    for (const instance of guards) {
      // console.log('instance: ', instance);
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        error = err;
      });
      // console.log('canActivate: ', canActivate);
      if (canActivate) {
        return true;
      }
    }
    throw error;
  }
}
