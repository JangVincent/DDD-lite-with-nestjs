import {
  IsEmail,
  IsString,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message:
      'Password must contain uppercase, lowercase, and special characters (@$!%*?&)',
  })
  password: string;

  @IsString()
  @MinLength(2, { message: 'Nickname must be at least 2 characters long' })
  @MaxLength(20, { message: 'Nickname must not exceed 20 characters' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'Nickname can only contain letters and numbers',
  })
  nickname: string;
}
