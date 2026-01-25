import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationException } from './commons/exceptions/validation.exception';
import { DomainExceptionFilter } from './commons/filters/domain-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global exception filter
  app.useGlobalFilters(new DomainExceptionFilter());

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 없는 속성 제거
      forbidNonWhitelisted: true, // DTO에 없는 속성이 있으면 에러
      transform: true, // 자동으로 타입 변환
      exceptionFactory: (errors: ValidationError[]) => {
        // ValidationError[]를 우리의 details 형식으로 변환
        const details: Record<string, string[]> = {};

        errors.forEach((error) => {
          if (error.constraints) {
            details[error.property] = Object.values(error.constraints);
          }
        });

        return new ValidationException('Validation failed', details);
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
