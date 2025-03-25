import { GenerateTokensProvider } from './../../providers/generate-tokens.provider';
import { JwtService } from '@nestjs/jwt';
import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UserService } from 'src/users/providers/users.service';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;

    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    // Verify the google token user sent
    const loginTicket = await this.oauthClient.verifyIdToken({
      idToken: googleTokenDto.token,
    });
    // Extract the payload from google JWT token
    const { email, sub: googleId } = loginTicket.getPayload();

    // Check if the user with the googleId exists in the database
    const user = await this.userService.findOneByGoogleId(googleId);

    // if googleId does exist generate token
    if (user) {
      return this.generateTokensProvider.generateTokens(user);
    }

    // if googleId does not exist create a new user and generate token
    // throw unauthorized exception
  }
}
