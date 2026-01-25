import { ProfileEntity } from '../entities/profile.entity';

export interface IProfileRepository {
  findById(id: string): Promise<ProfileEntity | null>;
  findByUserId(userId: string): Promise<ProfileEntity | null>;
  save(profile: ProfileEntity): Promise<void>;
}
