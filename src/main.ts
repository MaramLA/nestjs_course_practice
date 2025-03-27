import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable dto validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        // to avoid using @Type(()=>xyz) in every needed dto
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJs Masterclass')
    .setDescription('User the API URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-services')
    .setLicense(
      'MIT License',
      'https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository',
    )
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();

  // instantiate a document object
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  const configService = app.get(ConfigService);

  SwaggerModule.setup('api', app, document);

  // enable cors
  app.enableCors();

  // // golabl interceptors
  // app.useGlobalInterceptors(new DataResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
