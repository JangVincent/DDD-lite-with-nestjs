import { AuthEntity } from '../entities/auth.entity';

export interface IAuthRepository {
  findByUserId(userId: string): Promise<AuthEntity | null>;
  save(entity: AuthEntity): Promise<void>;
}
