/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { ApiErrorResponse } from '@/infrastructure/transport/ploshadka-api/types/ApiResponse';
import type { AuthorizableRequestParams } from '@/infrastructure/transport/authorizable.transport';
import AuthorizableTransport from '@/infrastructure/transport/authorizable.transport';
import type JSONValue from '../types/JSONValue';
import UnauthorizedError from '@/domain/entities/errors/Unauthorized';
import NotFoundError from '@/domain/entities/errors/NotFound';

/**
 * Additional params that could be specified for request to Ploshadka API
 */
interface PloshadkaApiRequestParams extends AuthorizableRequestParams {}

/**
 * Ploshadka api transport
 */
export default class PloshadkaApiTransport extends AuthorizableTransport {
  /**
   * Constructor for ploshadka api transport
   * @param baseUrl - Base URL
   */
  constructor(baseUrl: string) {
    super(baseUrl, {
      /**
       * Method for creating an Error based on Ploshadka API response
       * @param status - HTTP status
       * @param payload - Response JSON payload
       */
      errorFormatter(status, payload) {
        const { message, code } = payload as ApiErrorResponse;

        let errorText = '';

        /**
         * If 'code' is provided, use it as an error text so we can show it to the user using corresponded i18n message
         */
        if (code !== undefined) {
          errorText = code.toString();
        } else if (message !== undefined) {
          errorText = message;
        } else {
          errorText = 'Unknown error';
        }

        /**
         * Create error based on response status
         */
        switch (status) {
          case 401:
          case 403:
            return new UnauthorizedError(errorText);
          case 404:
            return new NotFoundError(errorText);
          default:
            return new Error(errorText);
        }
      },
    });
  }

  /**
   * Make GET request to the Ploshadka API
   * @param endpoint - API endpoint
   * @param data - data to be sent url encoded
   * @param params - Additional params to tune request
   */
  public async get<Payload>(endpoint: string, data?: JSONValue, params?: PloshadkaApiRequestParams): Promise<Payload> {
    const response = await super.get(endpoint, data, params);

    return response as Payload;
  }

  /**
   * Make POST request to the Ploshadka API
   * @param params - Request parameters
   */
  public async post<Response>({
    endpoint,
    data,
    params,
  }: {
    endpoint: string;
    data?: Record<string, JSONValue | undefined>;
    params?: PloshadkaApiRequestParams;
  }): Promise<Response> {
    let payload: FormData | Record<string, JSONValue | undefined> = data ?? {};

    const response = await super.post({
      endpoint,
      payload,
      params,
    });

    return response as Response;
  }

  /**
   * Make DELETE request to the Ploshadka API
   * @param endpoint - API endpoint
   * @param data - data to be sent with request body
   * @param params - Additional params to tune request
   */
  public async delete<Payload>(endpoint: string, data?: JSONValue, params?: PloshadkaApiRequestParams): Promise<Payload> {
    const response = await super.delete(endpoint, data, params);

    return response as Payload;
  }

  /**
   * Make PATCH request to the Ploshadka API
   * @param endpoint - API endpoint
   * @param data - data to be sent with request body
   * @param params - Additional params to tune request
   */
  public async patch<Payload>(endpoint: string, data?: JSONValue, params?: PloshadkaApiRequestParams): Promise<Payload> {
    const response = await super.patch(endpoint, data, params);

    return response as Payload;
  }
}
