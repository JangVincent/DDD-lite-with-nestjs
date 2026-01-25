import * as argon2 from 'argon2';
import { AuthStatus, AuthStatusEnum } from 'src/domains/auth/vo/auth-status.vo';

export class AuthEntity {
  private userId: string;
  private hashedPassword: string;
  private status: AuthStatus;
  private loginFailedCount: number;

  constructor({
    userId,
    hashedPassword,
    status,
    loginFailedCount,
  }: {
    userId: string;
    hashedPassword: string;
    status: AuthStatus;
    loginFailedCount: number;
  }) {
    this.userId = userId;
    this.hashedPassword = hashedPassword;
    this.status = status;
    this.loginFailedCount = loginFailedCount;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getStatus(): AuthStatus {
    return this.status;
  }

  public getHashedPassword(): string {
    return this.hashedPassword;
  }

  public getLoginFailedCount(): number {
    return this.loginFailedCount;
  }

  // Utility
  public isActive(): boolean {
    return this.status.isActive();
  }

  public increaseLoginFailCount(): void {
    this.loginFailedCount++;
  }

  public initLoginFailCount(): void {
    this.loginFailedCount = 0;
  }

  static async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  public async verifyPassword(password: string): Promise<boolean> {
    return await argon2.verify(this.hashedPassword, password);
  }

  public async changePassword(password: string): Promise<void> {
    this.hashedPassword = await argon2.hash(password);
  }

  public canInactive(): boolean {
    return this.loginFailedCount >= 5;
  }

  public inactive(): void {
    this.status = new AuthStatus(AuthStatusEnum.INACTIVE);
  }
}
