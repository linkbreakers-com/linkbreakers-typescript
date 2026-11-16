/* tslint:disable */
/* eslint-disable */
/**
 * Linkbreakers API
 * The Linkbreakers REST API: links, QR codes, workflows, visitors and analytics, as JSON over HTTPS. Send a workspace API token as `Authorization: Bearer <token>`.  ## Entry points  `GET https://api.linkbreakers.com/` and `GET https://api.linkbreakers.com/v1` answer without credentials with the API\'s name, version and links. This document is served at `https://api.linkbreakers.com/openapi.json`.  ## Rate limits  Every response describes where the caller stands in the IETF `RateLimit-Policy` and `RateLimit` header fields (draft-ietf-httpapi-ratelimit-headers), and in `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` and `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` (a Unix timestamp) for clients that read those. A request past the limit gets `429 Too Many Requests` with `Retry-After` in seconds.  - Workspace API token: 720 requests per 60 seconds, per token. - Dashboard session or OAuth token: 600 requests per 60 seconds, per token. - No credentials: 300 requests per 60 seconds, per client IP.  Each plan also includes a number of API calls per billing cycle. Past it, calls answer `429` with the code `MAX_PUBLIC_API_QUERIED_REACHED` until the cycle renews or the plan changes.  ## Pagination  Every list pages with opaque cursors (AIP-158). Pass `pageSize`, then send the `nextPageToken` of each response back as `pageToken` (or its alias `cursor`) to get the next page. An empty or absent `nextPageToken` means the list is complete. Each list operation describes this in `x-pagination`.  ## Batches and background jobs  `POST /v1/links/bulk` creates up to 250 links in one transactional request; `POST /v1/links/batch` takes the same links as a bare JSON array. `POST /v1/links/bulk/jobs` accepts the same batch and answers `202 Accepted` at once with a job and a `Location` header; poll `GET /v1/jobs/{id}` until `status` is `JOB_STATUS_SUCCEEDED` (the created link ids are in `linksBulkCreate.linkIds`) or `JOB_STATUS_FAILED` (`error` says why, and nothing was created). Jobs can be read for 24 hours after they finish.  ## Paused workspaces  A free workspace whose members have not verified any email address is paused 7 days after sign-up. Its calls then answer `403` with the code `WORKSPACE_UNVERIFIED` and change nothing; QR codes and links keep working for visitors. To lift the pause, ask the workspace owner to verify their email: `POST /v1/members/email-verification` sends the verification email again, and works while the workspace is paused. `unverifiedPauseAt` on the workspace says when the pause starts.  ## Versioning and deprecation  The version is in the path: every operation lives under `/v1`. Within a version, changes are additive only: new operations, new optional request fields, new response fields and new enum values. Clients should ignore fields and enum values they do not know. Anything that would break an existing client ships under a new path version instead.  An operation is retired in two steps. First it is deprecated: it keeps working, is flagged `deprecated: true` in this document, and every response carries a `Deprecation` header field (RFC 9745) with the time it was deprecated and a `Link` with `rel=\"deprecation\"` to the policy. Then, at least 180 days later, it may be removed; that date is announced in advance in a `Sunset` header field (RFC 8594) and as `x-sunset` on the operation. The full policy: https://linkbreakers.com/help/article/api-versioning-and-deprecation-policy  A renamed operation keeps answering its former path until that path\'s sunset. Responses on a former path carry the same `Deprecation`, `Sunset` and `Link` header fields; this document lists only the current path, and the policy lists the former ones.  ## Idempotent retries  Every POST, PUT and PATCH accepts an optional `Idempotency-Key` header (draft-ietf-httpapi-idempotency-key-header). Send a new unique value, such as a UUID, with each logical request and reuse it only to retry that request. A retry with the same key and the same request returns the first response, marked `Idempotent-Replayed: true`, instead of running again. Keys are scoped to the token and kept for 24 hours. The same key with a different request is refused with `422`, and a retry while the first request is still running gets `409` with `Retry-After`. Server errors (5xx) and refusals such as 401, 403 and 429 are not stored, so retrying them runs the request again.  ## Identifying your client  Send a `Linkbreakers-Client` request header saying which client made the call: `<client>/<version> (<details>)`, for example `my-integration/1.2.0 (python 3.12; linux)`. The official SDKs, the CLI and the MCP bridge set it for you, as `sdk-python/2.3.1 (python 3.12.4; linux)` or `cli/1.4.0 (darwin arm64)`. It is optional and changes nothing about how a request is handled; it tells us which clients and versions are in use, so we know what can be retired and what to fix first. Keep the details short and free of personal data. Browsers may send it too: it is allowed by CORS.
 *
 * The version of the OpenAPI document: 1.200.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  ApplyPageThemeTemplateRequest,
  ApplyPageThemeTemplateResponse,
  BulkUpdatePageThemesRequest,
  BulkUpdatePageThemesResponse,
  ErrorResponse,
  GetPageThemeResponse,
  ListPageThemesResponse,
  PageThemesServiceUpdateBody,
  UpdatePageThemeResponse,
} from '../models/index';
import {
    ApplyPageThemeTemplateRequestFromJSON,
    ApplyPageThemeTemplateRequestToJSON,
    ApplyPageThemeTemplateResponseFromJSON,
    ApplyPageThemeTemplateResponseToJSON,
    BulkUpdatePageThemesRequestFromJSON,
    BulkUpdatePageThemesRequestToJSON,
    BulkUpdatePageThemesResponseFromJSON,
    BulkUpdatePageThemesResponseToJSON,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    GetPageThemeResponseFromJSON,
    GetPageThemeResponseToJSON,
    ListPageThemesResponseFromJSON,
    ListPageThemesResponseToJSON,
    PageThemesServiceUpdateBodyFromJSON,
    PageThemesServiceUpdateBodyToJSON,
    UpdatePageThemeResponseFromJSON,
    UpdatePageThemeResponseToJSON,
} from '../models/index';

export interface PageThemesServiceApplyTemplateRequest {
    applyPageThemeTemplateRequest: ApplyPageThemeTemplateRequest;
    idempotencyKey?: string;
}

export interface PageThemesServiceBulkUpdateRequest {
    bulkUpdatePageThemesRequest: BulkUpdatePageThemesRequest;
    idempotencyKey?: string;
}

export interface PageThemesServiceGetRequest {
    id: string;
}

export interface PageThemesServiceListRequest {
    pageSize?: number;
    pageToken?: string;
    cursor?: string;
}

export interface PageThemesServiceUpdateRequest {
    id: string;
    pageThemesServiceUpdateBody: PageThemesServiceUpdateBody;
    idempotencyKey?: string;
}

/**
 * PageThemesApi - interface
 * 
 * @export
 * @interface PageThemesApiInterface
 */
export interface PageThemesApiInterface {
    /**
     * Creates request options for pageThemesServiceApplyTemplate without sending the request
     * @param {ApplyPageThemeTemplateRequest} applyPageThemeTemplateRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof PageThemesApiInterface
     */
    pageThemesServiceApplyTemplateRequestOpts(requestParameters: PageThemesServiceApplyTemplateRequest): Promise<runtime.RequestOpts>;

    /**
     * Copies a template\'s styling into the link\'s own page theme. The link keeps its own theme row, so the template can later be edited or deleted without changing any page that was styled from it. Cover, badge and footer logo media are copied into the caller\'s workspace when the template carries them.  Requires the `page_themes:write` scope.
     * @summary Apply a page theme template to a link
     * @param {ApplyPageThemeTemplateRequest} applyPageThemeTemplateRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PageThemesApiInterface
     */
    pageThemesServiceApplyTemplateRaw(requestParameters: PageThemesServiceApplyTemplateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApplyPageThemeTemplateResponse>>;

    /**
     * Copies a template\'s styling into the link\'s own page theme. The link keeps its own theme row, so the template can later be edited or deleted without changing any page that was styled from it. Cover, badge and footer logo media are copied into the caller\'s workspace when the template carries them.  Requires the `page_themes:write` scope.
     * Apply a page theme template to a link
     */
    pageThemesServiceApplyTemplate(requestParameters: PageThemesServiceApplyTemplateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApplyPageThemeTemplateResponse>;

    /**
     * Creates request options for pageThemesServiceBulkUpdate without sending the request
     * @param {BulkUpdatePageThemesRequest} bulkUpdatePageThemesRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof PageThemesApiInterface
     */
    pageThemesServiceBulkUpdateRequestOpts(requestParameters: PageThemesServiceBulkUpdateRequest): Promise<runtime.RequestOpts>;

    /**
     * Applies a template, values or both to the page theme of up to 50 links named by id or short link. A later entry replaces an earlier one for the links it names. Each link succeeds or fails on its own: read the result of each one.  Requires the `page_themes:write` scope.
     * @summary Restyle many links\' page themes
     * @param {BulkUpdatePageThemesRequest} bulkUpdatePageThemesRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PageThemesApiInterface
     */
    pageThemesServiceBulkUpdateRaw(requestParameters: PageThemesServiceBulkUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BulkUpdatePageThemesResponse>>;

    /**
     * Applies a template, values or both to the page theme of up to 50 links named by id or short link. A later entry replaces an earlier one for the links it names. Each link succeeds or fails on its own: read the result of each one.  Requires the `page_themes:write` scope.
     * Restyle many links\' page themes
     */
    pageThemesServiceBulkUpdate(requestParameters: PageThemesServiceBulkUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BulkUpdatePageThemesResponse>;

    /**
     * Creates request options for pageThemesServiceGet without sending the request
     * @param {string} id Page theme ID to retrieve
     * @throws {RequiredError}
     * @memberof PageThemesApiInterface
     */
    pageThemesServiceGetRequestOpts(requestParameters: PageThemesServiceGetRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieves a specific page theme by ID.  Requires the `page_themes:read` scope.
     * @summary Get a page theme
     * @param {string} id Page theme ID to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PageThemesApiInterface
     */
    pageThemesServiceGetRaw(requestParameters: PageThemesServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetPageThemeResponse>>;

    /**
     * Retrieves a specific page theme by ID.  Requires the `page_themes:read` scope.
     * Get a page theme
     */
    pageThemesServiceGet(requestParameters: PageThemesServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetPageThemeResponse>;

    /**
     * Creates request options for pageThemesServiceList without sending the request
     * @param {number} [pageSize] Maximum number of page themes to return. Defaults to 100, capped at 1000.
     * @param {string} [pageToken] Cursor from a previous response\&#39;s nextPageToken. Empty starts at the first page. Pages are ordered by (createdAt, id), which never change, so a record cannot move between pages while a client is walking them.
     * @param {string} [cursor] Opaque cursor from the previous page\&#39;s nextPageToken. Same as pageToken; when both are sent, pageToken wins.
     * @throws {RequiredError}
     * @memberof PageThemesApiInterface
     */
    pageThemesServiceListRequestOpts(requestParameters: PageThemesServiceListRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieves all page themes belonging to the caller\'s workspace.  Requires the `page_themes:read` scope.
     * @summary List page themes for the current workspace
     * @param {number} [pageSize] Maximum number of page themes to return. Defaults to 100, capped at 1000.
     * @param {string} [pageToken] Cursor from a previous response\&#39;s nextPageToken. Empty starts at the first page. Pages are ordered by (createdAt, id), which never change, so a record cannot move between pages while a client is walking them.
     * @param {string} [cursor] Opaque cursor from the previous page\&#39;s nextPageToken. Same as pageToken; when both are sent, pageToken wins.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PageThemesApiInterface
     */
    pageThemesServiceListRaw(requestParameters: PageThemesServiceListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListPageThemesResponse>>;

    /**
     * Retrieves all page themes belonging to the caller\'s workspace.  Requires the `page_themes:read` scope.
     * List page themes for the current workspace
     */
    pageThemesServiceList(requestParameters: PageThemesServiceListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListPageThemesResponse>;

    /**
     * Creates request options for pageThemesServiceUpdate without sending the request
     * @param {string} id Page theme ID to update
     * @param {PageThemesServiceUpdateBody} pageThemesServiceUpdateBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof PageThemesApiInterface
     */
    pageThemesServiceUpdateRequestOpts(requestParameters: PageThemesServiceUpdateRequest): Promise<runtime.RequestOpts>;

    /**
     * Updates an existing page theme. Cannot update page themes that are currently attached to links.  Requires the `page_themes:write` scope.
     * @summary Update a page theme
     * @param {string} id Page theme ID to update
     * @param {PageThemesServiceUpdateBody} pageThemesServiceUpdateBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PageThemesApiInterface
     */
    pageThemesServiceUpdateRaw(requestParameters: PageThemesServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdatePageThemeResponse>>;

    /**
     * Updates an existing page theme. Cannot update page themes that are currently attached to links.  Requires the `page_themes:write` scope.
     * Update a page theme
     */
    pageThemesServiceUpdate(requestParameters: PageThemesServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdatePageThemeResponse>;

}

/**
 * 
 */
export class PageThemesApi extends runtime.BaseAPI implements PageThemesApiInterface {

    /**
     * Creates request options for pageThemesServiceApplyTemplate without sending the request
     */
    async pageThemesServiceApplyTemplateRequestOpts(requestParameters: PageThemesServiceApplyTemplateRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['applyPageThemeTemplateRequest'] == null) {
            throw new runtime.RequiredError(
                'applyPageThemeTemplateRequest',
                'Required parameter "applyPageThemeTemplateRequest" was null or undefined when calling pageThemesServiceApplyTemplate().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters['idempotencyKey'] != null) {
            headerParameters['Idempotency-Key'] = String(requestParameters['idempotencyKey']);
        }

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["page_themes:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["page_themes:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/page-themes/apply-template`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ApplyPageThemeTemplateRequestToJSON(requestParameters['applyPageThemeTemplateRequest']),
        };
    }

    /**
     * Copies a template\'s styling into the link\'s own page theme. The link keeps its own theme row, so the template can later be edited or deleted without changing any page that was styled from it. Cover, badge and footer logo media are copied into the caller\'s workspace when the template carries them.  Requires the `page_themes:write` scope.
     * Apply a page theme template to a link
     */
    async pageThemesServiceApplyTemplateRaw(requestParameters: PageThemesServiceApplyTemplateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApplyPageThemeTemplateResponse>> {
        const requestOptions = await this.pageThemesServiceApplyTemplateRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApplyPageThemeTemplateResponseFromJSON(jsonValue));
    }

    /**
     * Copies a template\'s styling into the link\'s own page theme. The link keeps its own theme row, so the template can later be edited or deleted without changing any page that was styled from it. Cover, badge and footer logo media are copied into the caller\'s workspace when the template carries them.  Requires the `page_themes:write` scope.
     * Apply a page theme template to a link
     */
    async pageThemesServiceApplyTemplate(requestParameters: PageThemesServiceApplyTemplateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApplyPageThemeTemplateResponse> {
        const response = await this.pageThemesServiceApplyTemplateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for pageThemesServiceBulkUpdate without sending the request
     */
    async pageThemesServiceBulkUpdateRequestOpts(requestParameters: PageThemesServiceBulkUpdateRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['bulkUpdatePageThemesRequest'] == null) {
            throw new runtime.RequiredError(
                'bulkUpdatePageThemesRequest',
                'Required parameter "bulkUpdatePageThemesRequest" was null or undefined when calling pageThemesServiceBulkUpdate().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters['idempotencyKey'] != null) {
            headerParameters['Idempotency-Key'] = String(requestParameters['idempotencyKey']);
        }

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["page_themes:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["page_themes:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/page-themes/bulk-update`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: BulkUpdatePageThemesRequestToJSON(requestParameters['bulkUpdatePageThemesRequest']),
        };
    }

    /**
     * Applies a template, values or both to the page theme of up to 50 links named by id or short link. A later entry replaces an earlier one for the links it names. Each link succeeds or fails on its own: read the result of each one.  Requires the `page_themes:write` scope.
     * Restyle many links\' page themes
     */
    async pageThemesServiceBulkUpdateRaw(requestParameters: PageThemesServiceBulkUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BulkUpdatePageThemesResponse>> {
        const requestOptions = await this.pageThemesServiceBulkUpdateRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BulkUpdatePageThemesResponseFromJSON(jsonValue));
    }

    /**
     * Applies a template, values or both to the page theme of up to 50 links named by id or short link. A later entry replaces an earlier one for the links it names. Each link succeeds or fails on its own: read the result of each one.  Requires the `page_themes:write` scope.
     * Restyle many links\' page themes
     */
    async pageThemesServiceBulkUpdate(requestParameters: PageThemesServiceBulkUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BulkUpdatePageThemesResponse> {
        const response = await this.pageThemesServiceBulkUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for pageThemesServiceGet without sending the request
     */
    async pageThemesServiceGetRequestOpts(requestParameters: PageThemesServiceGetRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling pageThemesServiceGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["page_themes:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["page_themes:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/page-themes/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Retrieves a specific page theme by ID.  Requires the `page_themes:read` scope.
     * Get a page theme
     */
    async pageThemesServiceGetRaw(requestParameters: PageThemesServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetPageThemeResponse>> {
        const requestOptions = await this.pageThemesServiceGetRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetPageThemeResponseFromJSON(jsonValue));
    }

    /**
     * Retrieves a specific page theme by ID.  Requires the `page_themes:read` scope.
     * Get a page theme
     */
    async pageThemesServiceGet(requestParameters: PageThemesServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetPageThemeResponse> {
        const response = await this.pageThemesServiceGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for pageThemesServiceList without sending the request
     */
    async pageThemesServiceListRequestOpts(requestParameters: PageThemesServiceListRequest): Promise<runtime.RequestOpts> {
        const queryParameters: any = {};

        if (requestParameters['pageSize'] != null) {
            queryParameters['pageSize'] = requestParameters['pageSize'];
        }

        if (requestParameters['pageToken'] != null) {
            queryParameters['pageToken'] = requestParameters['pageToken'];
        }

        if (requestParameters['cursor'] != null) {
            queryParameters['cursor'] = requestParameters['cursor'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["page_themes:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["page_themes:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/page-themes`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Retrieves all page themes belonging to the caller\'s workspace.  Requires the `page_themes:read` scope.
     * List page themes for the current workspace
     */
    async pageThemesServiceListRaw(requestParameters: PageThemesServiceListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListPageThemesResponse>> {
        const requestOptions = await this.pageThemesServiceListRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ListPageThemesResponseFromJSON(jsonValue));
    }

    /**
     * Retrieves all page themes belonging to the caller\'s workspace.  Requires the `page_themes:read` scope.
     * List page themes for the current workspace
     */
    async pageThemesServiceList(requestParameters: PageThemesServiceListRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListPageThemesResponse> {
        const response = await this.pageThemesServiceListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for pageThemesServiceUpdate without sending the request
     */
    async pageThemesServiceUpdateRequestOpts(requestParameters: PageThemesServiceUpdateRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling pageThemesServiceUpdate().'
            );
        }

        if (requestParameters['pageThemesServiceUpdateBody'] == null) {
            throw new runtime.RequiredError(
                'pageThemesServiceUpdateBody',
                'Required parameter "pageThemesServiceUpdateBody" was null or undefined when calling pageThemesServiceUpdate().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters['idempotencyKey'] != null) {
            headerParameters['Idempotency-Key'] = String(requestParameters['idempotencyKey']);
        }

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["page_themes:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["page_themes:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/page-themes/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: PageThemesServiceUpdateBodyToJSON(requestParameters['pageThemesServiceUpdateBody']),
        };
    }

    /**
     * Updates an existing page theme. Cannot update page themes that are currently attached to links.  Requires the `page_themes:write` scope.
     * Update a page theme
     */
    async pageThemesServiceUpdateRaw(requestParameters: PageThemesServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdatePageThemeResponse>> {
        const requestOptions = await this.pageThemesServiceUpdateRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UpdatePageThemeResponseFromJSON(jsonValue));
    }

    /**
     * Updates an existing page theme. Cannot update page themes that are currently attached to links.  Requires the `page_themes:write` scope.
     * Update a page theme
     */
    async pageThemesServiceUpdate(requestParameters: PageThemesServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdatePageThemeResponse> {
        const response = await this.pageThemesServiceUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
