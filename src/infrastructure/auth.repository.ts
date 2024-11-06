import type AuthRepositoryInterface from '@/domain/auth.repository.interface.ts';
import type PloshadkaApiTransport from './transport/ploshadka-api';
import type AuthStorage from './storage/auth';
import type AuthSession from '@/domain/entities/AuthSession.ts';
import { notEmpty } from './utils/empty.ts';

/**
 * Facade for the auth data
 */
export default class AuthRepository implements AuthRepositoryInterface {
  /**
   * Transport instance
   */
  private readonly transport: PloshadkaApiTransport;

  /**
   * Repository constructor
   * @param authStorage - stores refresh token
   * @param ploshadkaApiTransport - ploshadka api transport instance
   */
  constructor(
    private readonly authStorage: AuthStorage,
    ploshadkaApiTransport: PloshadkaApiTransport
  ) {
    this.transport = ploshadkaApiTransport;
  }

  /**
   * Specify whether we have auth session (refresh token)
   */
  public hasSession(): boolean {
    const refreshToken = this.authStorage.getRefreshToken();

    return notEmpty(refreshToken);
  }

  /**
   * Get new session by refresh token
   */
  public async restoreSession(): Promise<AuthSession> {
    return this.transport.post<AuthSession>(
      {
        endpoint: '/auth',
        data: {
          token: this.authStorage.getRefreshToken(),
        },
        params: {
          skipAuthCheck: true,
        },
      }
    );
  }

  /**
   * Removes session by refresh token
   */
  public async removeSession(): Promise<void> {
    const refreshToken = this.authStorage.getRefreshToken();

    await this.transport.delete('/auth', {
      token: refreshToken,
    });

    this.authStorage.removeRefreshToken();
  }
}
