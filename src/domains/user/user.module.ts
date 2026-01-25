import { Module } from '@nestjs/common';
import { ProfileRepository } from './repositories/profile.repository';
import { UserRepository } from './repositories/user.repository';

@Module({
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IProfileRepository',
      useClass: ProfileRepository,
    },
  ],
  exports: ['IUserRepository', 'IProfileRepository'],
})
export class UserModule {}
