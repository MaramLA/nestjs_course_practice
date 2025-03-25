import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { UserService } from 'src/users/providers/users.service';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { GenerateTokensProvider } from './../../providers/generate-tokens.provider';

@Injectable()
// export class GoogleAuthenticationService implements OnModuleInit {
export class GoogleAuthenticationService {
  private oauthClient: OAuth2Client;
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;

    if (!clientId || !clientSecret) {
      throw new Error('Google client id and secret are required');
    }

    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  //   onModuleInit() {
  //     const clientId = this.jwtConfiguration.googleClientId;
  //     const clientSecret = this.jwtConfiguration.googleClientSecret;

  //     this.oauthClient = new OAuth2Client(clientId, clientSecret);
  //   }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      console.log('this.oauthClient: ', this.oauthClient);

      // Verify the google token user sent
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
        audience: this.jwtConfiguration.googleClientId,
      });
      console.log(loginTicket);

      // Extract the payload from google JWT token
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = loginTicket.getPayload();

      console.log('pe1');
      // Check if the user with the googleId exists in the database
      const user = await this.userService.findOneByGoogleId(googleId);
      console.log('1 user: ', user);

      console.log('pe2');

      // if googleId does exist generate token
      if (user) {
        return this.generateTokensProvider.generateTokens(user);
      }
      console.log('pe3');

      // if googleId does not exist create a new user and generate token
      const newUser = await this.userService.createGoogleUser({
        email: email,
        firstName: firstName,
        lastName: lastName,
        googleId: googleId,
      });
      console.log('pe4');

      console.log('2 newUser: ', newUser);
      return this.generateTokensProvider.generateTokens(newUser);
    } catch (error) {
      // throw unauthorized exception
      throw new UnauthorizedException(error);
    }
  }
}
