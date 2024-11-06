import type { AuthorizableRequestParams } from '../authorizable.transport.ts';
import type JSONValue from './JSONValue';

export interface POSTParams {
  endpoint: string;
  payload?: Record<string, JSONValue | undefined>;
}

export interface POSTParamsAuthorizable extends POSTParams {
  params?: AuthorizableRequestParams;
}
