import type UserRepositoryInterface from '@/domain/user.repository.interface';
import type PloshadkaApiTransport from './transport/ploshadka-api';
import type { UserStoreData } from './storage/user';
import type UserStore from './storage/user';
import type { User } from '@/domain/entities/User';
import Repository from './repository';

/**
 * Facade for the user data
 */
export default class UserRepository extends Repository<UserStore, UserStoreData> implements UserRepositoryInterface {
  /**
   * Transport instance
   */
  private readonly transport: PloshadkaApiTransport;

  /**
   * Repository constructor
   * @param store - stores user data
   * @param ploshadkaApiTransport - ploshadka api transport instance
   */
  constructor(store: UserStore, ploshadkaApiTransport: PloshadkaApiTransport) {
    super(store);

    this.transport = ploshadkaApiTransport;
  }

  /**
   * Returns data of the current user
   */
  public async loadUser(): Promise<void> {
    const response = await this.transport.get<User>('/user/myself');

    console.log('user loaded', response)

    this.store.setUser(response);
  }

  /**
   * Load user data and put it to the storage
   */
  public getUser(): User | null {
    return this.store.getUser();
  }

  /**
   * Removes user data from the storage
   */
  public clearUser(): void {
    this.store.clearUser();

    return;
  }
}
