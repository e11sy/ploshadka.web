import AuthRepository from '@/infrastructure/auth.repository'
import UserRepository from './user.repository';
import AuthStore from '@/infrastructure/storage/auth';
import UserStore from '@/infrastructure/storage/user';
import PloshadkaApiTransport from './transport/ploshadka-api';
import EventBus from '@/domain/event-bus';
import { AUTH_COMPLETED_EVENT_NAME, AuthCompletedEvent } from '@/domain/event-bus/events/AuthCompleted';
import { AUTH_LOGOUT_EVENT_NAME } from '@/domain/event-bus/events/AuthLogoutEvent';


export interface Repositories {
  auth: AuthRepository;
  user: UserRepository;
}

export function init(ploshadkaApiUrl: string, eventBus: EventBus): Repositories {
  const authStore = new AuthStore();
  const userStore = new UserStore();

  /**
   * Init transport
   */
  const ploshadkaApiTransport = new PloshadkaApiTransport(ploshadkaApiUrl);


  /**
   * When we got authorized
   */
  eventBus.addEventListener(AUTH_COMPLETED_EVENT_NAME, (event: AuthCompletedEvent) => {
    if (event.detail !== null) {
      /**
       * Authorize API transport
       */
      ploshadkaApiTransport.authorize(event.detail.accessToken);

      /**
       * Save refresh token
       */
      authStore.setRefreshToken(event.detail.refreshToken);
    } else {
      /**
       * Tell API transport to continue working in anonymous mode (send waiting requests without auth)
       */
      ploshadkaApiTransport.continueAnonymous();

      userStore.clearUser();
    }
  });
  /**
   * When we got unauthorized
   */
  eventBus.addEventListener(AUTH_LOGOUT_EVENT_NAME, () => {
    /**
     * Tell API transport to continue working in anonymous mode (send waiting requests without auth)
     */
    authStore.removeRefreshToken();
    ploshadkaApiTransport.continueAnonymous();
  });


  const authRepository = new AuthRepository(authStore, ploshadkaApiTransport);
  const userRepository = new UserRepository(userStore, ploshadkaApiTransport);

  return {
    auth: authRepository,
    user: userRepository
  }
}
