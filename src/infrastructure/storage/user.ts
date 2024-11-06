import type { User } from '@/domain/entities/User';
import { SessionStore } from './abstract/session';

/**
 * Data stored in the user store
 */
export type UserStoreData = {
  /**
   * User data
   */
  user: User | null;
};

/**
 * Store for the user data
 */
export default class UserStore extends SessionStore<UserStoreData> {
  /**
   * Returns user data
   */
  public getUser(): User | null {
    return this.data.user;
  }

  /**
   * Sets user data
   * @param user - data to set
   */
  public setUser(user: User): void {
    console.log("user set");

    this.data.user = user;
  }

  /**
   * Removes user data
   */
  public clearUser(): void {
    console.log('user is null')
    this.data.user = null;
  }
}
