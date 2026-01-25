import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/commons/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/commons/guards/jwt.guard';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { ChangePasswordUseCase } from '../user-cases/change-password.use-case';
import { LoginUseCase } from '../user-cases/login.use-case';
import { RegisterUseCase } from '../user-cases/register.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.registerUseCase.execute(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }

  @Put('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @CurrentUser() user: { id: string },
    @Body() dto: ChangePasswordDto,
  ) {
    return this.changePasswordUseCase.execute(user.id, dto);
  }
}
