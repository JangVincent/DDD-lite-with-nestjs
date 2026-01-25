import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './domains/auth/auth.module';
import { ReviewModule } from './domains/review/review.module';
import { UserModule } from './domains/user/user.module';
import { PrismaModule } from './infra/persistence/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '1d',
      },
      global: true,
    }),

    // domains
    UserModule,
    AuthModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
