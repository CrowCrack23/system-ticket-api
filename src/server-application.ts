import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { options } from './common/options/validation-pipe.options';
import { AllExceptionsFilter } from './common/errors/error-exception.filter';
import { ErrorValidationPipe } from './common/errors/error-validator.pipe';
export class ServerApplication {
  private readonly port: number = parseInt(process.env.PORT);

  private readonly host: string = process.env.HOST;

  private readonly logger = new Logger(ServerApplication.name);

  public async run(): Promise<void> {
    const app: NestExpressApplication =
      await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(new ValidationPipe(options));
    app.enableCors();
    app.setGlobalPrefix('api');
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    app.useGlobalPipes(new ErrorValidationPipe());
    this.buildAPIDocumentation(app);
    this.log();
    await app.listen(this.port, this.host);
  }

  private buildAPIDocumentation(app: NestExpressApplication): void {
    const title: string = 'ITicketSystem';
    const description: string = 'ITicketSystem API documentation';
    const version: string = '1.0.0';

    const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addBearerAuth()
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }
  private log(): void {
    this.logger.log(
      `Server started on host: ${this.host}; port: ${this.port};`,
    );
  }
  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
