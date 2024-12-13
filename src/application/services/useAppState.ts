import { AppStateController } from '@/domain';
import type { User } from '@/domain/entities/User';
import { createSharedComposable } from '@vueuse/core';
import { type Ref, ref } from 'vue';

/**
 * Composable for the application state
 */
interface UseAppStateComposable {
  /**
   * Current authenticated user
   * User is undefined if authorization is in process
   * User is null if is not authorized, User instance otherwise
   */
  user: Ref<User | null | undefined>;
}

/**
 * App State — is a read-only combination of app Stores.
 */
export const useAppState = createSharedComposable((): UseAppStateComposable => {
  /**
   * Current authenticated user
   */
  const user = ref<User | null | undefined>(undefined);

  /**
   * Subscribe to user changes in the App State
   */
  AppStateController.user((prop: 'user', value: User | null) => {
    if (prop === 'user') {
      user.value = value as User;
    }
  });

  return {
    user,
  };
});
