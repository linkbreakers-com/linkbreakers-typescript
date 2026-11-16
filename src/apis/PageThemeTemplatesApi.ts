/* tslint:disable */
/* eslint-disable */
/**
 * Linkbreakers API
 * The Linkbreakers REST API: links, QR codes, workflows, visitors and analytics, as JSON over HTTPS. Send a workspace API token as `Authorization: Bearer <token>`.  ## Entry points  `GET https://api.linkbreakers.com/` and `GET https://api.linkbreakers.com/v1` answer without credentials with the API\'s name, version and links. This document is served at `https://api.linkbreakers.com/openapi.json`.  ## Rate limits  Every response describes where the caller stands in the IETF `RateLimit-Policy` and `RateLimit` header fields (draft-ietf-httpapi-ratelimit-headers), and in `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` and `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` (a Unix timestamp) for clients that read those. A request past the limit gets `429 Too Many Requests` with `Retry-After` in seconds.  - Workspace API token: 720 requests per 60 seconds, per token. - Dashboard session or OAuth token: 600 requests per 60 seconds, per token. - No credentials: 300 requests per 60 seconds, per client IP.  Each plan also includes a number of API calls per billing cycle. Past it, calls answer `429` with the code `MAX_PUBLIC_API_QUERIED_REACHED` until the cycle renews or the plan changes.  ## Pagination  Every list pages with opaque cursors (AIP-158). Pass `pageSize`, then send the `nextPageToken` of each response back as `pageToken` (or its alias `cursor`) to get the next page. An empty or absent `nextPageToken` means the list is complete. Each list operation describes this in `x-pagination`.  ## Batches and background jobs  `POST /v1/links/bulk` creates up to 250 links in one transactional request; `POST /v1/links/batch` takes the same links as a bare JSON array. `POST /v1/links/bulk/jobs` accepts the same batch and answers `202 Accepted` at once with a job and a `Location` header; poll `GET /v1/jobs/{id}` until `status` is `JOB_STATUS_SUCCEEDED` (the created link ids are in `linksBulkCreate.linkIds`) or `JOB_STATUS_FAILED` (`error` says why, and nothing was created). Jobs can be read for 24 hours after they finish.  ## Paused workspaces  A free workspace whose members have not verified any email address is paused 7 days after sign-up. Its calls then answer `403` with the code `WORKSPACE_UNVERIFIED` and change nothing; QR codes and links keep working for visitors. To lift the pause, ask the workspace owner to verify their email: `POST /v1/members/email-verification` sends the verification email again, and works while the workspace is paused. `unverifiedPauseAt` on the workspace says when the pause starts.  ## Versioning and deprecation  The version is in the path: every operation lives under `/v1`. Within a version, changes are additive only: new operations, new optional request fields, new response fields and new enum values. Clients should ignore fields and enum values they do not know. Anything that would break an existing client ships under a new path version instead.  An operation is retired in two steps. First it is deprecated: it keeps working, is flagged `deprecated: true` in this document, and every response carries a `Deprecation` header field (RFC 9745) with the time it was deprecated and a `Link` with `rel=\"deprecation\"` to the policy. Then, at least 180 days later, it may be removed; that date is announced in advance in a `Sunset` header field (RFC 8594) and as `x-sunset` on the operation. The full policy: https://linkbreakers.com/help/article/api-versioning-and-deprecation-policy  A renamed operation keeps answering its former path while clients still call it, until that path\'s sunset at the latest: a former path no client calls for 14 days is removed. Responses on a former path carry the same `Deprecation`, `Sunset` and `Link` header fields; this document lists only the current path, and the policy lists the former paths that still answer.  ## Idempotent retries  Every POST, PUT and PATCH accepts an optional `Idempotency-Key` header (draft-ietf-httpapi-idempotency-key-header). Send a new unique value, such as a UUID, with each logical request and reuse it only to retry that request. A retry with the same key and the same request returns the first response, marked `Idempotent-Replayed: true`, instead of running again. Keys are scoped to the token and kept for 24 hours. The same key with a different request is refused with `422`, and a retry while the first request is still running gets `409` with `Retry-After`. Server errors (5xx) and refusals such as 401, 403 and 429 are not stored, so retrying them runs the request again.  ## Identifying your client  Send a `Linkbreakers-Client` request header saying which client made the call: `<client>/<version> (<details>)`, for example `my-integration/1.2.0 (python 3.12; linux)`. The official SDKs, the CLI and the MCP bridge set it for you, as `sdk-python/2.3.1 (python 3.12.4; linux)` or `cli/1.4.0 (darwin arm64)`. It is optional and changes nothing about how a request is handled; it tells us which clients and versions are in use, so we know what can be retired and what to fix first. Keep the details short and free of personal data. Browsers may send it too: it is allowed by CORS.
 *
 * The version of the OpenAPI document: 1.200.2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  CreatePageThemeTemplateRequest,
  CreatePageThemeTemplateResponse,
  ErrorResponse,
  ImportPageThemeTemplateRequest,
  ImportPageThemeTemplateResponse,
  ListPageThemeTemplatesResponse,
  PageThemeTemplate,
  PageThemeTemplatesServiceUpdateBody,
  PageThemeTemplatesServiceUpdateStylingBody,
  PublicListPageThemeTemplatesResponse,
  PublicPageThemeTemplate,
  PublishPageThemeTemplateResponse,
  UpdatePageThemeTemplateResponse,
  UpdatePageThemeTemplateStylingResponse,
} from '../models/index';
import {
    CreatePageThemeTemplateRequestFromJSON,
    CreatePageThemeTemplateRequestToJSON,
    CreatePageThemeTemplateResponseFromJSON,
    CreatePageThemeTemplateResponseToJSON,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    ImportPageThemeTemplateRequestFromJSON,
    ImportPageThemeTemplateRequestToJSON,
    ImportPageThemeTemplateResponseFromJSON,
    ImportPageThemeTemplateResponseToJSON,
    ListPageThemeTemplatesResponseFromJSON,
    ListPageThemeTemplatesResponseToJSON,
    PageThemeTemplateFromJSON,
    PageThemeTemplateToJSON,
    PageThemeTemplatesServiceUpdateBodyFromJSON,
    PageThemeTemplatesServiceUpdateBodyToJSON,
    PageThemeTemplatesServiceUpdateStylingBodyFromJSON,
    PageThemeTemplatesServiceUpdateStylingBodyToJSON,
    PublicListPageThemeTemplatesResponseFromJSON,
    PublicListPageThemeTemplatesResponseToJSON,
    PublicPageThemeTemplateFromJSON,
    PublicPageThemeTemplateToJSON,
    PublishPageThemeTemplateResponseFromJSON,
    PublishPageThemeTemplateResponseToJSON,
    UpdatePageThemeTemplateResponseFromJSON,
    UpdatePageThemeTemplateResponseToJSON,
    UpdatePageThemeTemplateStylingResponseFromJSON,
    UpdatePageThemeTemplateStylingResponseToJSON,
} from '../models/index';

export interface PageThemeTemplatesServiceCreateRequest {
    createPageThemeTemplateRequest: CreatePageThemeTemplateRequest;
    idempotencyKey?: string;
}

export interface PageThemeTemplatesServiceDeleteRequest {
    id: string;
}

export interface PageThemeTemplatesServiceGetRequest {
    id: string;
    include?: Array<string>;
}

export interface PageThemeTemplatesServiceGetPublicRequest {
    slug: string;
    include?: Array<string>;
}

export interface PageThemeTemplatesServiceImportRequest {
    importPageThemeTemplateRequest: ImportPageThemeTemplateRequest;
    idempotencyKey?: string;
}

export interface PageThemeTemplatesServiceListRequest {
    include?: Array<string>;
    search?: string;
    pageSize?: number;
    pageToken?: string;
    scope?: string;
    cursor?: string;
}

export interface PageThemeTemplatesServiceListPublicRequest {
    include?: Array<string>;
    search?: string;
    pageSize?: number;
    pageToken?: string;
    workspaceId?: string;
    cursor?: string;
}

export interface PageThemeTemplatesServicePublishRequest {
    id: string;
    body: object;
    idempotencyKey?: string;
}

export interface PageThemeTemplatesServiceUpdateRequest {
    id: string;
    pageThemeTemplatesServiceUpdateBody: PageThemeTemplatesServiceUpdateBody;
    idempotencyKey?: string;
}

export interface PageThemeTemplatesServiceUpdateStylingRequest {
    id: string;
    pageThemeTemplatesServiceUpdateStylingBody: PageThemeTemplatesServiceUpdateStylingBody;
    idempotencyKey?: string;
}

/**
 * PageThemeTemplatesApi - interface
 * 
 * @export
 * @interface PageThemeTemplatesApiInterface
 */
export interface PageThemeTemplatesApiInterface {
    /**
     * Creates request options for pageThemeTemplatesServiceCreate without sending the request
     * @param {CreatePageThemeTemplateRequest} createPageThemeTemplateRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServiceCreateRequestOpts(requestParameters: PageThemeTemplatesServiceCreateRequest): Promise<runtime.RequestOpts>;

    /**
     * Create a page theme template by copying the styling of an existing page theme into a fresh detached theme owned by the template.  Requires the `page_themes:write` scope.
     * @summary Create a new page theme template
     * @param {CreatePageThemeTemplateRequest} createPageThemeTemplateRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServiceCreateRaw(requestParameters: PageThemeTemplatesServiceCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreatePageThemeTemplateResponse>>;

    /**
     * Create a page theme template by copying the styling of an existing page theme into a fresh detached theme owned by the template.  Requires the `page_themes:write` scope.
     * Create a new page theme template
     */
    pageThemeTemplatesServiceCreate(requestParameters: PageThemeTemplatesServiceCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreatePageThemeTemplateResponse>;

    /**
     * Creates request options for pageThemeTemplatesServiceDelete without sending the request
     * @param {string} id 
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServiceDeleteRequestOpts(requestParameters: PageThemeTemplatesServiceDeleteRequest): Promise<runtime.RequestOpts>;

    /**
     * Remove a page theme template belonging to the authenticated caller\'s workspace. Pages already styled from it are unaffected.  Requires the `page_themes:write` scope.
     * @summary Delete a workspace page theme template
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServiceDeleteRaw(requestParameters: PageThemeTemplatesServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>>;

    /**
     * Remove a page theme template belonging to the authenticated caller\'s workspace. Pages already styled from it are unaffected.  Requires the `page_themes:write` scope.
     * Delete a workspace page theme template
     */
    pageThemeTemplatesServiceDelete(requestParameters: PageThemeTemplatesServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object>;

    /**
     * Creates request options for pageThemeTemplatesServiceGet without sending the request
     * @param {string} id 
     * @param {Array<string>} [include] 
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServiceGetRequestOpts(requestParameters: PageThemeTemplatesServiceGetRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieve a page theme template that belongs to the authenticated caller\'s workspace.  Requires the `page_themes:read` scope.
     * @summary Get a workspace page theme template
     * @param {string} id 
     * @param {Array<string>} [include] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServiceGetRaw(requestParameters: PageThemeTemplatesServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PageThemeTemplate>>;

    /**
     * Retrieve a page theme template that belongs to the authenticated caller\'s workspace.  Requires the `page_themes:read` scope.
     * Get a workspace page theme template
     */
    pageThemeTemplatesServiceGet(requestParameters: PageThemeTemplatesServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PageThemeTemplate>;

    /**
     * Creates request options for pageThemeTemplatesServiceGetPublic without sending the request
     * @param {string} slug 
     * @param {Array<string>} [include] Related objects to include in the response  List of related objects to include. Supported values: \&#39;workspace\&#39;
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServiceGetPublicRequestOpts(requestParameters: PageThemeTemplatesServiceGetPublicRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieve a single published page theme template that is visible in the public gallery.
     * @summary Get a public page theme template
     * @param {string} slug 
     * @param {Array<string>} [include] Related objects to include in the response  List of related objects to include. Supported values: \&#39;workspace\&#39;
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServiceGetPublicRaw(requestParameters: PageThemeTemplatesServiceGetPublicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PublicPageThemeTemplate>>;

    /**
     * Retrieve a single published page theme template that is visible in the public gallery.
     * Get a public page theme template
     */
    pageThemeTemplatesServiceGetPublic(requestParameters: PageThemeTemplatesServiceGetPublicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PublicPageThemeTemplate>;

    /**
     * Creates request options for pageThemeTemplatesServiceImport without sending the request
     * @param {ImportPageThemeTemplateRequest} importPageThemeTemplateRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServiceImportRequestOpts(requestParameters: PageThemeTemplatesServiceImportRequest): Promise<runtime.RequestOpts>;

    /**
     * Import a public page theme template into your workspace by slug. Creates a private copy owned by your workspace.  Requires the `page_themes:write` scope.
     * @summary Import a public page theme template
     * @param {ImportPageThemeTemplateRequest} importPageThemeTemplateRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServiceImportRaw(requestParameters: PageThemeTemplatesServiceImportRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ImportPageThemeTemplateResponse>>;

    /**
     * Import a public page theme template into your workspace by slug. Creates a private copy owned by your workspace.  Requires the `page_themes:write` scope.
     * Import a public page theme template
     */
    pageThemeTemplatesServiceImport(requestParameters: PageThemeTemplatesServiceImportRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ImportPageThemeTemplateResponse>;

    /**
     * Creates request options for pageThemeTemplatesServiceList without sending the request
     * @param {Array<string>} [include] 
     * @param {string} [search] 
     * @param {number} [pageSize] 
     * @param {string} [pageToken] 
     * @param {string} [scope] Which templates to return. WORKSPACE (default) returns only templates owned by the caller\&#39;s workspace. AVAILABLE also returns built-in templates and templates other workspaces have published, ordered by the workspace\&#39;s own usage first, then its own templates, then the rest.   - PAGE_THEME_TEMPLATE_SCOPE_UNSPECIFIED: Defaults to PAGE_THEME_TEMPLATE_SCOPE_WORKSPACE.  - PAGE_THEME_TEMPLATE_SCOPE_WORKSPACE: Only templates owned by the caller\&#39;s workspace.  - PAGE_THEME_TEMPLATE_SCOPE_AVAILABLE: Every template the workspace may use: its own, built-in ones, and templates published by other workspaces.
     * @param {string} [cursor] Opaque cursor from the previous page\&#39;s nextPageToken. Same as pageToken; when both are sent, pageToken wins.
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServiceListRequestOpts(requestParameters: PageThemeTemplatesServiceListRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieve page theme templates that belong to the authenticated caller\'s workspace.  Requires the `page_themes:read` scope.
     * @summary List my page theme templates
     * @param {Array<string>} [include] 
     * @param {string} [search] 
     * @param {number} [pageSize] 
     * @param {string} [pageToken] 
     * @param {string} [scope] Which templates to return. WORKSPACE (default) returns only templates owned by the caller\&#39;s workspace. AVAILABLE also returns built-in templates and templates other workspaces have published, ordered by the workspace\&#39;s own usage first, then its own templates, then the rest.   - PAGE_THEME_TEMPLATE_SCOPE_UNSPECIFIED: Defaults to PAGE_THEME_TEMPLATE_SCOPE_WORKSPACE.  - PAGE_THEME_TEMPLATE_SCOPE_WORKSPACE: Only templates owned by the caller\&#39;s workspace.  - PAGE_THEME_TEMPLATE_SCOPE_AVAILABLE: Every template the workspace may use: its own, built-in ones, and templates published by other workspaces.
     * @param {string} [cursor] Opaque cursor from the previous page\&#39;s nextPageToken. Same as pageToken; when both are sent, pageToken wins.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServiceListRaw(requestParameters: PageThemeTemplatesServiceListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListPageThemeTemplatesResponse>>;

    /**
     * Retrieve page theme templates that belong to the authenticated caller\'s workspace.  Requires the `page_themes:read` scope.
     * List my page theme templates
     */
    pageThemeTemplatesServiceList(requestParameters: PageThemeTemplatesServiceListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListPageThemeTemplatesResponse>;

    /**
     * Creates request options for pageThemeTemplatesServiceListPublic without sending the request
     * @param {Array<string>} [include] Related objects to include in the response  List of related objects to include. Supported values: \&#39;workspace\&#39;
     * @param {string} [search] Search query applied to template name/description
     * @param {number} [pageSize] Maximum number of templates to return (defaults to 20)
     * @param {string} [pageToken] Cursor token to retrieve the next page of results
     * @param {string} [workspaceId] Optional workspace ID to filter templates by workspace  Filter public templates by workspace. Only published templates for that workspace will be returned.
     * @param {string} [cursor] Opaque cursor from the previous page\&#39;s nextPageToken. Same as pageToken; when both are sent, pageToken wins.
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServiceListPublicRequestOpts(requestParameters: PageThemeTemplatesServiceListPublicRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieve available public page theme templates, optionally filtered by search terms.
     * @summary List page theme templates
     * @param {Array<string>} [include] Related objects to include in the response  List of related objects to include. Supported values: \&#39;workspace\&#39;
     * @param {string} [search] Search query applied to template name/description
     * @param {number} [pageSize] Maximum number of templates to return (defaults to 20)
     * @param {string} [pageToken] Cursor token to retrieve the next page of results
     * @param {string} [workspaceId] Optional workspace ID to filter templates by workspace  Filter public templates by workspace. Only published templates for that workspace will be returned.
     * @param {string} [cursor] Opaque cursor from the previous page\&#39;s nextPageToken. Same as pageToken; when both are sent, pageToken wins.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServiceListPublicRaw(requestParameters: PageThemeTemplatesServiceListPublicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PublicListPageThemeTemplatesResponse>>;

    /**
     * Retrieve available public page theme templates, optionally filtered by search terms.
     * List page theme templates
     */
    pageThemeTemplatesServiceListPublic(requestParameters: PageThemeTemplatesServiceListPublicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PublicListPageThemeTemplatesResponse>;

    /**
     * Creates request options for pageThemeTemplatesServicePublish without sending the request
     * @param {string} id The ID of the page theme template to publish (UUID)
     * @param {object} body 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServicePublishRequestOpts(requestParameters: PageThemeTemplatesServicePublishRequest): Promise<runtime.RequestOpts>;

    /**
     * Publish a page theme template to make it available in the public gallery. Requires workspace to be public and template to have slug, description, and name.  Requires the `page_themes:write` scope.
     * @summary Publish a workspace page theme template
     * @param {string} id The ID of the page theme template to publish (UUID)
     * @param {object} body 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServicePublishRaw(requestParameters: PageThemeTemplatesServicePublishRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PublishPageThemeTemplateResponse>>;

    /**
     * Publish a page theme template to make it available in the public gallery. Requires workspace to be public and template to have slug, description, and name.  Requires the `page_themes:write` scope.
     * Publish a workspace page theme template
     */
    pageThemeTemplatesServicePublish(requestParameters: PageThemeTemplatesServicePublishRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PublishPageThemeTemplateResponse>;

    /**
     * Creates request options for pageThemeTemplatesServiceUpdate without sending the request
     * @param {string} id The ID of the page theme template to update (UUID)
     * @param {PageThemeTemplatesServiceUpdateBody} pageThemeTemplatesServiceUpdateBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServiceUpdateRequestOpts(requestParameters: PageThemeTemplatesServiceUpdateRequest): Promise<runtime.RequestOpts>;

    /**
     * Modify the metadata of a page theme template owned by the authenticated workspace.  Requires the `page_themes:write` scope.
     * @summary Update a workspace page theme template
     * @param {string} id The ID of the page theme template to update (UUID)
     * @param {PageThemeTemplatesServiceUpdateBody} pageThemeTemplatesServiceUpdateBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServiceUpdateRaw(requestParameters: PageThemeTemplatesServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdatePageThemeTemplateResponse>>;

    /**
     * Modify the metadata of a page theme template owned by the authenticated workspace.  Requires the `page_themes:write` scope.
     * Update a workspace page theme template
     */
    pageThemeTemplatesServiceUpdate(requestParameters: PageThemeTemplatesServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdatePageThemeTemplateResponse>;

    /**
     * Creates request options for pageThemeTemplatesServiceUpdateStyling without sending the request
     * @param {string} id The ID of the page theme template whose styling to update (UUID)
     * @param {PageThemeTemplatesServiceUpdateStylingBody} pageThemeTemplatesServiceUpdateStylingBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServiceUpdateStylingRequestOpts(requestParameters: PageThemeTemplatesServiceUpdateStylingRequest): Promise<runtime.RequestOpts>;

    /**
     * Edit the colours, typography, container and media of a page theme template. Queues a thumbnail regeneration.  Requires the `page_themes:write` scope.
     * @summary Update a page theme template\'s styling
     * @param {string} id The ID of the page theme template whose styling to update (UUID)
     * @param {PageThemeTemplatesServiceUpdateStylingBody} pageThemeTemplatesServiceUpdateStylingBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PageThemeTemplatesApiInterface
     */
    pageThemeTemplatesServiceUpdateStylingRaw(requestParameters: PageThemeTemplatesServiceUpdateStylingRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdatePageThemeTemplateStylingResponse>>;

    /**
     * Edit the colours, typography, container and media of a page theme template. Queues a thumbnail regeneration.  Requires the `page_themes:write` scope.
     * Update a page theme template\'s styling
     */
    pageThemeTemplatesServiceUpdateStyling(requestParameters: PageThemeTemplatesServiceUpdateStylingRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdatePageThemeTemplateStylingResponse>;

}

/**
 * 
 */
export class PageThemeTemplatesApi extends runtime.BaseAPI implements PageThemeTemplatesApiInterface {

    /**
     * Creates request options for pageThemeTemplatesServiceCreate without sending the request
     */
    async pageThemeTemplatesServiceCreateRequestOpts(requestParameters: PageThemeTemplatesServiceCreateRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['createPageThemeTemplateRequest'] == null) {
            throw new runtime.RequiredError(
                'createPageThemeTemplateRequest',
                'Required parameter "createPageThemeTemplateRequest" was null or undefined when calling pageThemeTemplatesServiceCreate().'
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

        let urlPath = `/v1/page-theme-templates`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreatePageThemeTemplateRequestToJSON(requestParameters['createPageThemeTemplateRequest']),
        };
    }

    /**
     * Create a page theme template by copying the styling of an existing page theme into a fresh detached theme owned by the template.  Requires the `page_themes:write` scope.
     * Create a new page theme template
     */
    async pageThemeTemplatesServiceCreateRaw(requestParameters: PageThemeTemplatesServiceCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreatePageThemeTemplateResponse>> {
        const requestOptions = await this.pageThemeTemplatesServiceCreateRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreatePageThemeTemplateResponseFromJSON(jsonValue));
    }

    /**
     * Create a page theme template by copying the styling of an existing page theme into a fresh detached theme owned by the template.  Requires the `page_themes:write` scope.
     * Create a new page theme template
     */
    async pageThemeTemplatesServiceCreate(requestParameters: PageThemeTemplatesServiceCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreatePageThemeTemplateResponse> {
        const response = await this.pageThemeTemplatesServiceCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for pageThemeTemplatesServiceDelete without sending the request
     */
    async pageThemeTemplatesServiceDeleteRequestOpts(requestParameters: PageThemeTemplatesServiceDeleteRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling pageThemeTemplatesServiceDelete().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

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

        let urlPath = `/v1/page-theme-templates/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Remove a page theme template belonging to the authenticated caller\'s workspace. Pages already styled from it are unaffected.  Requires the `page_themes:write` scope.
     * Delete a workspace page theme template
     */
    async pageThemeTemplatesServiceDeleteRaw(requestParameters: PageThemeTemplatesServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        const requestOptions = await this.pageThemeTemplatesServiceDeleteRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Remove a page theme template belonging to the authenticated caller\'s workspace. Pages already styled from it are unaffected.  Requires the `page_themes:write` scope.
     * Delete a workspace page theme template
     */
    async pageThemeTemplatesServiceDelete(requestParameters: PageThemeTemplatesServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.pageThemeTemplatesServiceDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for pageThemeTemplatesServiceGet without sending the request
     */
    async pageThemeTemplatesServiceGetRequestOpts(requestParameters: PageThemeTemplatesServiceGetRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling pageThemeTemplatesServiceGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['include'] != null) {
            queryParameters['include'] = requestParameters['include'];
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

        let urlPath = `/v1/page-theme-templates/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Retrieve a page theme template that belongs to the authenticated caller\'s workspace.  Requires the `page_themes:read` scope.
     * Get a workspace page theme template
     */
    async pageThemeTemplatesServiceGetRaw(requestParameters: PageThemeTemplatesServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PageThemeTemplate>> {
        const requestOptions = await this.pageThemeTemplatesServiceGetRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PageThemeTemplateFromJSON(jsonValue));
    }

    /**
     * Retrieve a page theme template that belongs to the authenticated caller\'s workspace.  Requires the `page_themes:read` scope.
     * Get a workspace page theme template
     */
    async pageThemeTemplatesServiceGet(requestParameters: PageThemeTemplatesServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PageThemeTemplate> {
        const response = await this.pageThemeTemplatesServiceGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for pageThemeTemplatesServiceGetPublic without sending the request
     */
    async pageThemeTemplatesServiceGetPublicRequestOpts(requestParameters: PageThemeTemplatesServiceGetPublicRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['slug'] == null) {
            throw new runtime.RequiredError(
                'slug',
                'Required parameter "slug" was null or undefined when calling pageThemeTemplatesServiceGetPublic().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['include'] != null) {
            queryParameters['include'] = requestParameters['include'];
        }

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/v1/public/page-theme-templates/{slug}`;
        urlPath = urlPath.replace(`{${"slug"}}`, encodeURIComponent(String(requestParameters['slug'])));

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Retrieve a single published page theme template that is visible in the public gallery.
     * Get a public page theme template
     */
    async pageThemeTemplatesServiceGetPublicRaw(requestParameters: PageThemeTemplatesServiceGetPublicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PublicPageThemeTemplate>> {
        const requestOptions = await this.pageThemeTemplatesServiceGetPublicRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PublicPageThemeTemplateFromJSON(jsonValue));
    }

    /**
     * Retrieve a single published page theme template that is visible in the public gallery.
     * Get a public page theme template
     */
    async pageThemeTemplatesServiceGetPublic(requestParameters: PageThemeTemplatesServiceGetPublicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PublicPageThemeTemplate> {
        const response = await this.pageThemeTemplatesServiceGetPublicRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for pageThemeTemplatesServiceImport without sending the request
     */
    async pageThemeTemplatesServiceImportRequestOpts(requestParameters: PageThemeTemplatesServiceImportRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['importPageThemeTemplateRequest'] == null) {
            throw new runtime.RequiredError(
                'importPageThemeTemplateRequest',
                'Required parameter "importPageThemeTemplateRequest" was null or undefined when calling pageThemeTemplatesServiceImport().'
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

        let urlPath = `/v1/page-theme-templates/import`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ImportPageThemeTemplateRequestToJSON(requestParameters['importPageThemeTemplateRequest']),
        };
    }

    /**
     * Import a public page theme template into your workspace by slug. Creates a private copy owned by your workspace.  Requires the `page_themes:write` scope.
     * Import a public page theme template
     */
    async pageThemeTemplatesServiceImportRaw(requestParameters: PageThemeTemplatesServiceImportRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ImportPageThemeTemplateResponse>> {
        const requestOptions = await this.pageThemeTemplatesServiceImportRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ImportPageThemeTemplateResponseFromJSON(jsonValue));
    }

    /**
     * Import a public page theme template into your workspace by slug. Creates a private copy owned by your workspace.  Requires the `page_themes:write` scope.
     * Import a public page theme template
     */
    async pageThemeTemplatesServiceImport(requestParameters: PageThemeTemplatesServiceImportRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ImportPageThemeTemplateResponse> {
        const response = await this.pageThemeTemplatesServiceImportRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for pageThemeTemplatesServiceList without sending the request
     */
    async pageThemeTemplatesServiceListRequestOpts(requestParameters: PageThemeTemplatesServiceListRequest): Promise<runtime.RequestOpts> {
        const queryParameters: any = {};

        if (requestParameters['include'] != null) {
            queryParameters['include'] = requestParameters['include'];
        }

        if (requestParameters['search'] != null) {
            queryParameters['search'] = requestParameters['search'];
        }

        if (requestParameters['pageSize'] != null) {
            queryParameters['pageSize'] = requestParameters['pageSize'];
        }

        if (requestParameters['pageToken'] != null) {
            queryParameters['pageToken'] = requestParameters['pageToken'];
        }

        if (requestParameters['scope'] != null) {
            queryParameters['scope'] = requestParameters['scope'];
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

        let urlPath = `/v1/page-theme-templates`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Retrieve page theme templates that belong to the authenticated caller\'s workspace.  Requires the `page_themes:read` scope.
     * List my page theme templates
     */
    async pageThemeTemplatesServiceListRaw(requestParameters: PageThemeTemplatesServiceListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListPageThemeTemplatesResponse>> {
        const requestOptions = await this.pageThemeTemplatesServiceListRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ListPageThemeTemplatesResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve page theme templates that belong to the authenticated caller\'s workspace.  Requires the `page_themes:read` scope.
     * List my page theme templates
     */
    async pageThemeTemplatesServiceList(requestParameters: PageThemeTemplatesServiceListRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListPageThemeTemplatesResponse> {
        const response = await this.pageThemeTemplatesServiceListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for pageThemeTemplatesServiceListPublic without sending the request
     */
    async pageThemeTemplatesServiceListPublicRequestOpts(requestParameters: PageThemeTemplatesServiceListPublicRequest): Promise<runtime.RequestOpts> {
        const queryParameters: any = {};

        if (requestParameters['include'] != null) {
            queryParameters['include'] = requestParameters['include'];
        }

        if (requestParameters['search'] != null) {
            queryParameters['search'] = requestParameters['search'];
        }

        if (requestParameters['pageSize'] != null) {
            queryParameters['pageSize'] = requestParameters['pageSize'];
        }

        if (requestParameters['pageToken'] != null) {
            queryParameters['pageToken'] = requestParameters['pageToken'];
        }

        if (requestParameters['workspaceId'] != null) {
            queryParameters['workspaceId'] = requestParameters['workspaceId'];
        }

        if (requestParameters['cursor'] != null) {
            queryParameters['cursor'] = requestParameters['cursor'];
        }

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/v1/public/page-theme-templates`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Retrieve available public page theme templates, optionally filtered by search terms.
     * List page theme templates
     */
    async pageThemeTemplatesServiceListPublicRaw(requestParameters: PageThemeTemplatesServiceListPublicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PublicListPageThemeTemplatesResponse>> {
        const requestOptions = await this.pageThemeTemplatesServiceListPublicRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PublicListPageThemeTemplatesResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve available public page theme templates, optionally filtered by search terms.
     * List page theme templates
     */
    async pageThemeTemplatesServiceListPublic(requestParameters: PageThemeTemplatesServiceListPublicRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PublicListPageThemeTemplatesResponse> {
        const response = await this.pageThemeTemplatesServiceListPublicRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for pageThemeTemplatesServicePublish without sending the request
     */
    async pageThemeTemplatesServicePublishRequestOpts(requestParameters: PageThemeTemplatesServicePublishRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling pageThemeTemplatesServicePublish().'
            );
        }

        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling pageThemeTemplatesServicePublish().'
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

        let urlPath = `/v1/page-theme-templates/{id}/publish`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['body'] as any,
        };
    }

    /**
     * Publish a page theme template to make it available in the public gallery. Requires workspace to be public and template to have slug, description, and name.  Requires the `page_themes:write` scope.
     * Publish a workspace page theme template
     */
    async pageThemeTemplatesServicePublishRaw(requestParameters: PageThemeTemplatesServicePublishRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PublishPageThemeTemplateResponse>> {
        const requestOptions = await this.pageThemeTemplatesServicePublishRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PublishPageThemeTemplateResponseFromJSON(jsonValue));
    }

    /**
     * Publish a page theme template to make it available in the public gallery. Requires workspace to be public and template to have slug, description, and name.  Requires the `page_themes:write` scope.
     * Publish a workspace page theme template
     */
    async pageThemeTemplatesServicePublish(requestParameters: PageThemeTemplatesServicePublishRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PublishPageThemeTemplateResponse> {
        const response = await this.pageThemeTemplatesServicePublishRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for pageThemeTemplatesServiceUpdate without sending the request
     */
    async pageThemeTemplatesServiceUpdateRequestOpts(requestParameters: PageThemeTemplatesServiceUpdateRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling pageThemeTemplatesServiceUpdate().'
            );
        }

        if (requestParameters['pageThemeTemplatesServiceUpdateBody'] == null) {
            throw new runtime.RequiredError(
                'pageThemeTemplatesServiceUpdateBody',
                'Required parameter "pageThemeTemplatesServiceUpdateBody" was null or undefined when calling pageThemeTemplatesServiceUpdate().'
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

        let urlPath = `/v1/page-theme-templates/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: PageThemeTemplatesServiceUpdateBodyToJSON(requestParameters['pageThemeTemplatesServiceUpdateBody']),
        };
    }

    /**
     * Modify the metadata of a page theme template owned by the authenticated workspace.  Requires the `page_themes:write` scope.
     * Update a workspace page theme template
     */
    async pageThemeTemplatesServiceUpdateRaw(requestParameters: PageThemeTemplatesServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdatePageThemeTemplateResponse>> {
        const requestOptions = await this.pageThemeTemplatesServiceUpdateRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UpdatePageThemeTemplateResponseFromJSON(jsonValue));
    }

    /**
     * Modify the metadata of a page theme template owned by the authenticated workspace.  Requires the `page_themes:write` scope.
     * Update a workspace page theme template
     */
    async pageThemeTemplatesServiceUpdate(requestParameters: PageThemeTemplatesServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdatePageThemeTemplateResponse> {
        const response = await this.pageThemeTemplatesServiceUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for pageThemeTemplatesServiceUpdateStyling without sending the request
     */
    async pageThemeTemplatesServiceUpdateStylingRequestOpts(requestParameters: PageThemeTemplatesServiceUpdateStylingRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling pageThemeTemplatesServiceUpdateStyling().'
            );
        }

        if (requestParameters['pageThemeTemplatesServiceUpdateStylingBody'] == null) {
            throw new runtime.RequiredError(
                'pageThemeTemplatesServiceUpdateStylingBody',
                'Required parameter "pageThemeTemplatesServiceUpdateStylingBody" was null or undefined when calling pageThemeTemplatesServiceUpdateStyling().'
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

        let urlPath = `/v1/page-theme-templates/{id}/styling`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: PageThemeTemplatesServiceUpdateStylingBodyToJSON(requestParameters['pageThemeTemplatesServiceUpdateStylingBody']),
        };
    }

    /**
     * Edit the colours, typography, container and media of a page theme template. Queues a thumbnail regeneration.  Requires the `page_themes:write` scope.
     * Update a page theme template\'s styling
     */
    async pageThemeTemplatesServiceUpdateStylingRaw(requestParameters: PageThemeTemplatesServiceUpdateStylingRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdatePageThemeTemplateStylingResponse>> {
        const requestOptions = await this.pageThemeTemplatesServiceUpdateStylingRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UpdatePageThemeTemplateStylingResponseFromJSON(jsonValue));
    }

    /**
     * Edit the colours, typography, container and media of a page theme template. Queues a thumbnail regeneration.  Requires the `page_themes:write` scope.
     * Update a page theme template\'s styling
     */
    async pageThemeTemplatesServiceUpdateStyling(requestParameters: PageThemeTemplatesServiceUpdateStylingRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdatePageThemeTemplateStylingResponse> {
        const response = await this.pageThemeTemplatesServiceUpdateStylingRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
