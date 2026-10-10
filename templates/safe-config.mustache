/**
 * Type-safe configuration for Linkbreakers SDK
 * This wrapper prevents the common mistake of using `apiKey` instead of `accessToken`
 *
 * ✅ CORRECT: Use `accessToken` for Bearer token authentication
 * ❌ INCORRECT: Using `apiKey` is not supported and will not work
 */

import { Configuration, HTTPHeaders, FetchAPI, Middleware, HTTPQuery } from './runtime';

export interface LinkbreakersConfigParams {
  /**
   * Your Linkbreakers API token (Bearer token)
   * Get this from: https://app.linkbreakers.com/settings/api
   */
  accessToken: string | Promise<string> | ((name?: string, scopes?: string[]) => string | Promise<string>);

  /**
   * @deprecated ❌ INCORRECT: Do not use `apiKey`. Use `accessToken` instead for Bearer token authentication.
   * @see https://linkbreakers.com/help/article/api-authentication-accesstoken-vs-apikey
   */
  apiKey?: never;

  /**
   * API base path (default: https://api.linkbreakers.com)
   */
  basePath?: string;

  /**
   * Optional custom fetch implementation
   */
  fetchApi?: FetchAPI;

  /**
   * Optional middleware to apply before/after requests
   */
  middleware?: Middleware[];

  /**
   * Optional custom query string stringify function
   */
  queryParamsStringify?: (params: HTTPQuery) => string;

  /**
   * Optional headers to include on every request
   */
  headers?: HTTPHeaders;

  /**
   * Optional credentials setting for fetch requests
   */
  credentials?: RequestCredentials;
}

/**
 * Type-safe configuration class that only accepts Bearer token authentication
 *
 * @example
 * ```typescript
 * const config = new LinkbreakersConfig({
 *   accessToken: 'your-api-token',
 * });
 * ```
 */
export class LinkbreakersConfig extends Configuration {
  constructor(params: LinkbreakersConfigParams) {
    super({
      accessToken: params.accessToken,
      basePath: params.basePath,
      fetchApi: params.fetchApi,
      middleware: params.middleware,
      queryParamsStringify: params.queryParamsStringify,
      headers: params.headers,
      credentials: params.credentials,
    });
  }
}
