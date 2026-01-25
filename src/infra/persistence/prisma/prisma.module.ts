import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

const arr = [PrismaService];

@Global()
@Module({
  providers: arr,
  exports: arr,
})
export class PrismaModule {}
