import { init as initRepositories } from '@/infrastructure';
import AuthService from '@/domain/auth.service.ts';
import EventBus from './event-bus';
import UserService from './user.service';
import EventsService from './events.service';

/**
 * Get API url from environment
*/
const apiUrl = import.meta.env.VITE_API_URL;

/**
 * Create common event bus
*/
const eventBus = new EventBus();

/**
 * Init repositories
*/
const repositories = initRepositories(apiUrl, eventBus);

/**
 * App State — is a read-only combination of app Stores.
 * Allows to subscribe to store data changes
 */
export const AppStateController = {
  user: (callback: Parameters<typeof repositories.user.setStoreChangeCallback>[0]) =>
    repositories.user.setStoreChangeCallback(callback),
};

/**
 * Init seriveces
 */
const authService = new AuthService(eventBus, repositories.auth);
const userService = new UserService(eventBus, repositories.user);
const eventsService = new EventsService(repositories.events);

export {
  authService,
  userService,
  eventsService
}
