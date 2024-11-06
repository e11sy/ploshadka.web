// / <reference types="vite/client" />
// To ensure it is treated as a module, add at least one `export` statement
export {};

declare module '*.vue';

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * Auth guard if true then user would be asked to authorize on route visit
     */
    authRequired?: boolean;
  }
}
