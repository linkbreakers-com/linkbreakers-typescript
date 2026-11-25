/* tslint:disable */
/* eslint-disable */
/**
 * Linkbreakers API
 * The Linkbreakers REST API: links, QR codes, workflows, visitors and analytics, as JSON over HTTPS. Send a workspace API token as `Authorization: Bearer <token>`.  ## Entry points  `GET https://api.linkbreakers.com/` and `GET https://api.linkbreakers.com/v1` answer without credentials with the API\'s name, version and links. This document is served at `https://api.linkbreakers.com/openapi.json`.  ## Rate limits  Every response describes where the caller stands in the IETF `RateLimit-Policy` and `RateLimit` header fields (draft-ietf-httpapi-ratelimit-headers), and in `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` and `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` (a Unix timestamp) for clients that read those. A request past the limit gets `429 Too Many Requests` with `Retry-After` in seconds.  - Workspace API token: 720 requests per 60 seconds, per token. - Dashboard session or OAuth token: 600 requests per 60 seconds, per token. - No credentials: 300 requests per 60 seconds, per client IP.  Each plan also includes a number of API calls per billing cycle. Past it, calls answer `429` with the code `MAX_PUBLIC_API_QUERIED_REACHED` until the cycle renews or the plan changes.  ## Pagination  Every list pages with opaque cursors (AIP-158). Pass `pageSize`, then send the `nextPageToken` of each response back as `pageToken` (or its alias `cursor`) to get the next page. An empty or absent `nextPageToken` means the list is complete. Each list operation describes this in `x-pagination`.  ## Batches and background jobs  `POST /v1/links/bulk` creates up to 250 links in one transactional request; `POST /v1/links/batch` takes the same links as a bare JSON array. `POST /v1/links/bulk/jobs` accepts the same batch and answers `202 Accepted` at once with a link job and a `Location` header; poll `GET /v1/links/jobs/{id}` until `status` is `LINK_JOB_STATUS_SUCCEEDED` (the created link ids are in `linksBulkCreate.linkIds`) or `LINK_JOB_STATUS_FAILED` (`error` says why, and nothing was created). Link jobs can be read for 24 hours after they finish.  ## Paused workspaces  A free workspace whose members have not verified any email address is paused 7 days after sign-up. Its calls then answer `403` with the code `WORKSPACE_UNVERIFIED` and change nothing; QR codes and links keep working for visitors. To lift the pause, ask the workspace owner to verify their email: `POST /v1/members/email-verification` sends the verification email again, and works while the workspace is paused. `unverifiedPauseAt` on the workspace says when the pause starts.  ## Versioning and deprecation  The version is in the path: every operation lives under `/v1`. Within a version, changes are additive only: new operations, new optional request fields, new response fields and new enum values. Clients should ignore fields and enum values they do not know. Anything that would break an existing client ships under a new path version instead.  An operation is retired in two steps. First it is deprecated: it keeps working, is flagged `deprecated: true` in this document, and every response carries a `Deprecation` header field (RFC 9745) with the time it was deprecated and a `Link` with `rel=\"deprecation\"` to the policy. Then, at least 180 days later, it may be removed; that date is announced in advance in a `Sunset` header field (RFC 8594) and as `x-sunset` on the operation. The full policy: https://linkbreakers.com/help/article/api-versioning-and-deprecation-policy  A renamed operation keeps answering its former path while clients still call it, until that path\'s sunset at the latest: a former path no client calls for 14 days is removed. Responses on a former path carry the same `Deprecation`, `Sunset` and `Link` header fields; this document lists only the current path, and the policy lists the former paths that still answer.  ## Idempotent retries  Every POST, PUT and PATCH accepts an optional `Idempotency-Key` header (draft-ietf-httpapi-idempotency-key-header). Send a new unique value, such as a UUID, with each logical request and reuse it only to retry that request. A retry with the same key and the same request returns the first response, marked `Idempotent-Replayed: true`, instead of running again. Keys are scoped to the token and kept for 24 hours. The same key with a different request is refused with `422`, and a retry while the first request is still running gets `409` with `Retry-After`. Server errors (5xx) and refusals such as 401, 403 and 429 are not stored, so retrying them runs the request again.  ## Identifying your client  Send a `Linkbreakers-Client` request header saying which client made the call: `<client>/<version> (<details>)`, for example `my-integration/1.2.0 (python 3.12; linux)`. The official SDKs, the CLI and the MCP bridge set it for you, as `sdk-python/2.3.1 (python 3.12.4; linux)` or `cli/1.4.0 (darwin arm64)`. It is optional and changes nothing about how a request is handled; it tells us which clients and versions are in use, so we know what can be retired and what to fix first. Keep the details short and free of personal data. Browsers may send it too: it is allowed by CORS.
 *
 * The version of the OpenAPI document: 1.205.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  CreateQrcodeTemplateRequest,
  CreateQrcodeTemplateResponse,
  ErrorResponse,
  ImportQrcodeTemplateRequest,
  ImportQrcodeTemplateResponse,
  ListQrcodeTemplatesResponse,
  PublicListQrcodeTemplatesResponse,
  PublicQrcodeTemplate,
  PublishQrcodeTemplateResponse,
  QrcodeTemplate,
  QrcodeTemplatesServiceUpdateBody,
  UpdateQrcodeTemplateResponse,
} from '../models/index';
import {
    CreateQrcodeTemplateRequestFromJSON,
    CreateQrcodeTemplateRequestToJSON,
    CreateQrcodeTemplateResponseFromJSON,
    CreateQrcodeTemplateResponseToJSON,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    ImportQrcodeTemplateRequestFromJSON,
    ImportQrcodeTemplateRequestToJSON,
    ImportQrcodeTemplateResponseFromJSON,
    ImportQrcodeTemplateResponseToJSON,
    ListQrcodeTemplatesResponseFromJSON,
    ListQrcodeTemplatesResponseToJSON,
    PublicListQrcodeTemplatesResponseFromJSON,
    PublicListQrcodeTemplatesResponseToJSON,
    PublicQrcodeTemplateFromJSON,
    PublicQrcodeTemplateToJSON,
    PublishQrcodeTemplateResponseFromJSON,
    PublishQrcodeTemplateResponseToJSON,
    QrcodeTemplateFromJSON,
    QrcodeTemplateToJSON,
    QrcodeTemplatesServiceUpdateBodyFromJSON,
    QrcodeTemplatesServiceUpdateBodyToJSON,
    UpdateQrcodeTemplateResponseFromJSON,
    UpdateQrcodeTemplateResponseToJSON,
} from '../models/index';

export interface QrcodeTemplatesServiceCreateRequest {
    createQrcodeTemplateRequest: CreateQrcodeTemplateRequest;
    idempotencyKey?: string;
}

export interface QrcodeTemplatesServiceDeleteRequest {
    id: string;
}

export interface QrcodeTemplatesServiceGetRequest {
    id: string;
    include?: Array<string>;
}

export interface QrcodeTemplatesServiceGetPublicRequest {
    slug: string;
    include?: Array<string>;
}

export interface QrcodeTemplatesServiceImportRequest {
    importQrcodeTemplateRequest: ImportQrcodeTemplateRequest;
    idempotencyKey?: string;
}

export interface QrcodeTemplatesServiceListRequest {
    include?: Array<string>;
    search?: string;
    pageSize?: number;
    pageToken?: string;
    scope?: string;
    cursor?: string;
}

export interface QrcodeTemplatesServiceListPublicRequest {
    include?: Array<string>;
    search?: string;
    pageSize?: number;
    pageToken?: string;
    workspaceId?: string;
    cursor?: string;
}

export interface QrcodeTemplatesServicePublishRequest {
    id: string;
    body: object;
    idempotencyKey?: string;
}

export interface QrcodeTemplatesServiceUpdateRequest {
    id: string;
    qrcodeTemplatesServiceUpdateBody: QrcodeTemplatesServiceUpdateBody;
    idempotencyKey?: string;
}

/**
 * QRCodeTemplatesApi - interface
 * 
 * @export
 * @interface QRCodeTemplatesApiInterface
 */
export interface QRCodeTemplatesApiInterface {
    /**
     * Creates request options for qrcodeTemplatesServiceCreate without sending the request
     * @param {CreateQrcodeTemplateRequest} createQrcodeTemplateRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof QRCodeTemplatesApiInterface
     */
    qrcodeTemplatesServiceCreateRequestOpts(requestParameters: QrcodeTemplatesServiceCreateRequest): Promise<runtime.RequestOpts>;

    /**
     * Create a new QR code template using a fresh design. The design must not be used by any other links or templates.  Requires the `qrcodes:write` scope.
     * @summary Create a new QR code template
     * @param {CreateQrcodeTemplateRequest} createQrcodeTemplateRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QRCodeTemplatesApiInterface
     */
    qrcodeTemplatesServiceCreateRaw(requestParameters: QrcodeTemplatesServiceCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreateQrcodeTemplateResponse>>;

    /**
     * Create a new QR code template using a fresh design. The design must not be used by any other links or templates.  Requires the `qrcodes:write` scope.
     * Create a new QR code template
     */
    qrcodeTemplatesServiceCreate(requestParameters: QrcodeTemplatesServiceCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreateQrcodeTemplateResponse>;

    /**
     * Creates request options for qrcodeTemplatesServiceDelete without sending the request
     * @param {string} id 
     * @throws {RequiredError}
     * @memberof QRCodeTemplatesApiInterface
     */
    qrcodeTemplatesServiceDeleteRequestOpts(requestParameters: QrcodeTemplatesServiceDeleteRequest): Promise<runtime.RequestOpts>;

    /**
     * Remove a QR code template belonging to the authenticated caller\'s workspace.  Requires the `qrcodes:write` scope.
     * @summary Delete a workspace QR code template
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QRCodeTemplatesApiInterface
     */
    qrcodeTemplatesServiceDeleteRaw(requestParameters: QrcodeTemplatesServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>>;

    /**
     * Remove a QR code template belonging to the authenticated caller\'s workspace.  Requires the `qrcodes:write` scope.
     * Delete a workspace QR code template
     */
    qrcodeTemplatesServiceDelete(requestParameters: QrcodeTemplatesServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object>;

    /**
     * Creates request options for qrcodeTemplatesServiceGet without sending the request
     * @param {string} id 
     * @param {Array<string>} [include] 
     * @throws {RequiredError}
     * @memberof QRCodeTemplatesApiInterface
     */
    qrcodeTemplatesServiceGetRequestOpts(requestParameters: QrcodeTemplatesServiceGetRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieve a QR code template that belongs to the authenticated caller\'s workspace.  Requires the `qrcodes:read` scope.
     * @summary Get a workspace QR code template
     * @param {string} id 
     * @param {Array<string>} [include] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QRCodeTemplatesApiInterface
     */
    qrcodeTemplatesServiceGetRaw(requestParameters: QrcodeTemplatesServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<QrcodeTemplate>>;

    /**
     * Retrieve a QR code template that belongs to the authenticated caller\'s workspace.  Requires the `qrcodes:read` scope.
     * Get a workspace QR code template
     */
    qrcodeTemplatesServiceGet(requestParameters: QrcodeTemplatesServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<QrcodeTemplate>;

    /**
     * Creates request options for qrcodeTemplatesServiceGetPublic without sending the request
     * @param {string} slug 
     * @param {Array<string>} [include] Related objects to include in the response  List of related objects to include. Supported values: \&#39;workspace\&#39;
     * @throws {RequiredError}
     * @memberof QRCodeTemplatesApiInterface
     */
    qrcodeTemplatesServiceGetPublicRequestOpts(requestParameters: QrcodeTemplatesServiceGetPublicRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieve a single published QR code template that is visible in the public gallery.
     * @summary Get a public QR code template
     * @param {string} slug 
     * @param {Array<string>} [include] Related objects to include in the response  List of related objects to include. Supported values: \&#39;workspace\&#39;
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QRCodeTemplatesApiInterface
     */
    qrcodeTemplatesServiceGetPublicRaw(requestParameters: QrcodeTemplatesServiceGetPublicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PublicQrcodeTemplate>>;

    /**
     * Retrieve a single published QR code template that is visible in the public gallery.
     * Get a public QR code template
     */
    qrcodeTemplatesServiceGetPublic(requestParameters: QrcodeTemplatesServiceGetPublicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PublicQrcodeTemplate>;

    /**
     * Creates request options for qrcodeTemplatesServiceImport without sending the request
     * @param {ImportQrcodeTemplateRequest} importQrcodeTemplateRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof QRCodeTemplatesApiInterface
     */
    qrcodeTemplatesServiceImportRequestOpts(requestParameters: QrcodeTemplatesServiceImportRequest): Promise<runtime.RequestOpts>;

    /**
     * Import a public QR code template into your workspace by slug. Creates a private copy owned by your workspace.  Requires the `qrcodes:write` scope.
     * @summary Import a public QR code template
     * @param {ImportQrcodeTemplateRequest} importQrcodeTemplateRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QRCodeTemplatesApiInterface
     */
    qrcodeTemplatesServiceImportRaw(requestParameters: QrcodeTemplatesServiceImportRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ImportQrcodeTemplateResponse>>;

    /**
     * Import a public QR code template into your workspace by slug. Creates a private copy owned by your workspace.  Requires the `qrcodes:write` scope.
     * Import a public QR code template
     */
    qrcodeTemplatesServiceImport(requestParameters: QrcodeTemplatesServiceImportRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ImportQrcodeTemplateResponse>;

    /**
     * Creates request options for qrcodeTemplatesServiceList without sending the request
     * @param {Array<string>} [include] 
     * @param {string} [search] 
     * @param {number} [pageSize] 
     * @param {string} [pageToken] 
     * @param {string} [scope] Which templates to return. WORKSPACE (default) returns only templates owned by the caller\&#39;s workspace. AVAILABLE also returns built-in templates and templates other workspaces have published, ordered by the workspace\&#39;s own usage first, then its own templates, then the rest.   - QRCODE_TEMPLATE_SCOPE_UNSPECIFIED: Defaults to QRCODE_TEMPLATE_SCOPE_WORKSPACE.  - QRCODE_TEMPLATE_SCOPE_WORKSPACE: Only templates owned by the caller\&#39;s workspace.  - QRCODE_TEMPLATE_SCOPE_AVAILABLE: Every template the workspace may use: its own, built-in ones, and templates published by other workspaces.
     * @param {string} [cursor] Opaque cursor from the previous page\&#39;s nextPageToken. Same as pageToken; when both are sent, pageToken wins.
     * @throws {RequiredError}
     * @memberof QRCodeTemplatesApiInterface
     */
    qrcodeTemplatesServiceListRequestOpts(requestParameters: QrcodeTemplatesServiceListRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieve QR code templates that belong to the authenticated caller\'s workspace.  Requires the `qrcodes:read` scope.
     * @summary List my QR code templates
     * @param {Array<string>} [include] 
     * @param {string} [search] 
     * @param {number} [pageSize] 
     * @param {string} [pageToken] 
     * @param {string} [scope] Which templates to return. WORKSPACE (default) returns only templates owned by the caller\&#39;s workspace. AVAILABLE also returns built-in templates and templates other workspaces have published, ordered by the workspace\&#39;s own usage first, then its own templates, then the rest.   - QRCODE_TEMPLATE_SCOPE_UNSPECIFIED: Defaults to QRCODE_TEMPLATE_SCOPE_WORKSPACE.  - QRCODE_TEMPLATE_SCOPE_WORKSPACE: Only templates owned by the caller\&#39;s workspace.  - QRCODE_TEMPLATE_SCOPE_AVAILABLE: Every template the workspace may use: its own, built-in ones, and templates published by other workspaces.
     * @param {string} [cursor] Opaque cursor from the previous page\&#39;s nextPageToken. Same as pageToken; when both are sent, pageToken wins.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QRCodeTemplatesApiInterface
     */
    qrcodeTemplatesServiceListRaw(requestParameters: QrcodeTemplatesServiceListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListQrcodeTemplatesResponse>>;

    /**
     * Retrieve QR code templates that belong to the authenticated caller\'s workspace.  Requires the `qrcodes:read` scope.
     * List my QR code templates
     */
    qrcodeTemplatesServiceList(requestParameters: QrcodeTemplatesServiceListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListQrcodeTemplatesResponse>;

    /**
     * Creates request options for qrcodeTemplatesServiceListPublic without sending the request
     * @param {Array<string>} [include] Related objects to include in the response  List of related objects to include. Supported values: \&#39;workspace\&#39;
     * @param {string} [search] Search query applied to template name/description
     * @param {number} [pageSize] Maximum number of templates to return (defaults to 20)
     * @param {string} [pageToken] Cursor token to retrieve the next page of results
     * @param {string} [workspaceId] Optional workspace ID to filter templates by workspace  Filter public templates by workspace. Only published templates for that workspace will be returned.
     * @param {string} [cursor] Opaque cursor from the previous page\&#39;s nextPageToken. Same as pageToken; when both are sent, pageToken wins.
     * @throws {RequiredError}
     * @memberof QRCodeTemplatesApiInterface
     */
    qrcodeTemplatesServiceListPublicRequestOpts(requestParameters: QrcodeTemplatesServiceListPublicRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieve available QR code templates, optionally filtered by search terms or link destination. Featured templates come first, lowest featuredRank first, then the rest from the most recently updated.
     * @summary List QR code templates
     * @param {Array<string>} [include] Related objects to include in the response  List of related objects to include. Supported values: \&#39;workspace\&#39;
     * @param {string} [search] Search query applied to template name/description
     * @param {number} [pageSize] Maximum number of templates to return (defaults to 20)
     * @param {string} [pageToken] Cursor token to retrieve the next page of results
     * @param {string} [workspaceId] Optional workspace ID to filter templates by workspace  Filter public templates by workspace. Only published templates for that workspace will be returned.
     * @param {string} [cursor] Opaque cursor from the previous page\&#39;s nextPageToken. Same as pageToken; when both are sent, pageToken wins.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QRCodeTemplatesApiInterface
     */
    qrcodeTemplatesServiceListPublicRaw(requestParameters: QrcodeTemplatesServiceListPublicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PublicListQrcodeTemplatesResponse>>;

    /**
     * Retrieve available QR code templates, optionally filtered by search terms or link destination. Featured templates come first, lowest featuredRank first, then the rest from the most recently updated.
     * List QR code templates
     */
    qrcodeTemplatesServiceListPublic(requestParameters: QrcodeTemplatesServiceListPublicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PublicListQrcodeTemplatesResponse>;

    /**
     * Creates request options for qrcodeTemplatesServicePublish without sending the request
     * @param {string} id The ID of the QR code template to publish (UUID)
     * @param {object} body 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof QRCodeTemplatesApiInterface
     */
    qrcodeTemplatesServicePublishRequestOpts(requestParameters: QrcodeTemplatesServicePublishRequest): Promise<runtime.RequestOpts>;

    /**
     * Publish a QR code template to make it available in the public gallery. Requires workspace to be public and template to have slug, description, and name.  Requires the `qrcodes:write` scope.
     * @summary Publish a workspace QR code template
     * @param {string} id The ID of the QR code template to publish (UUID)
     * @param {object} body 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QRCodeTemplatesApiInterface
     */
    qrcodeTemplatesServicePublishRaw(requestParameters: QrcodeTemplatesServicePublishRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PublishQrcodeTemplateResponse>>;

    /**
     * Publish a QR code template to make it available in the public gallery. Requires workspace to be public and template to have slug, description, and name.  Requires the `qrcodes:write` scope.
     * Publish a workspace QR code template
     */
    qrcodeTemplatesServicePublish(requestParameters: QrcodeTemplatesServicePublishRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PublishQrcodeTemplateResponse>;

    /**
     * Creates request options for qrcodeTemplatesServiceUpdate without sending the request
     * @param {string} id The ID of the QR code template to update (UUID)
     * @param {QrcodeTemplatesServiceUpdateBody} qrcodeTemplatesServiceUpdateBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof QRCodeTemplatesApiInterface
     */
    qrcodeTemplatesServiceUpdateRequestOpts(requestParameters: QrcodeTemplatesServiceUpdateRequest): Promise<runtime.RequestOpts>;

    /**
     * Modify the name or description of a QR code template owned by the authenticated workspace. featuredRank is reserved for the Linkbreakers workspace, which curates the public gallery.  Requires the `qrcodes:write` scope.
     * @summary Update a workspace QR code template
     * @param {string} id The ID of the QR code template to update (UUID)
     * @param {QrcodeTemplatesServiceUpdateBody} qrcodeTemplatesServiceUpdateBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QRCodeTemplatesApiInterface
     */
    qrcodeTemplatesServiceUpdateRaw(requestParameters: QrcodeTemplatesServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdateQrcodeTemplateResponse>>;

    /**
     * Modify the name or description of a QR code template owned by the authenticated workspace. featuredRank is reserved for the Linkbreakers workspace, which curates the public gallery.  Requires the `qrcodes:write` scope.
     * Update a workspace QR code template
     */
    qrcodeTemplatesServiceUpdate(requestParameters: QrcodeTemplatesServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdateQrcodeTemplateResponse>;

}

/**
 * 
 */
export class QRCodeTemplatesApi extends runtime.BaseAPI implements QRCodeTemplatesApiInterface {

    /**
     * Creates request options for qrcodeTemplatesServiceCreate without sending the request
     */
    async qrcodeTemplatesServiceCreateRequestOpts(requestParameters: QrcodeTemplatesServiceCreateRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['createQrcodeTemplateRequest'] == null) {
            throw new runtime.RequiredError(
                'createQrcodeTemplateRequest',
                'Required parameter "createQrcodeTemplateRequest" was null or undefined when calling qrcodeTemplatesServiceCreate().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["qrcodes:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["qrcodes:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/qrcode-templates`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateQrcodeTemplateRequestToJSON(requestParameters['createQrcodeTemplateRequest']),
        };
    }

    /**
     * Create a new QR code template using a fresh design. The design must not be used by any other links or templates.  Requires the `qrcodes:write` scope.
     * Create a new QR code template
     */
    async qrcodeTemplatesServiceCreateRaw(requestParameters: QrcodeTemplatesServiceCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreateQrcodeTemplateResponse>> {
        const requestOptions = await this.qrcodeTemplatesServiceCreateRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateQrcodeTemplateResponseFromJSON(jsonValue));
    }

    /**
     * Create a new QR code template using a fresh design. The design must not be used by any other links or templates.  Requires the `qrcodes:write` scope.
     * Create a new QR code template
     */
    async qrcodeTemplatesServiceCreate(requestParameters: QrcodeTemplatesServiceCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreateQrcodeTemplateResponse> {
        const response = await this.qrcodeTemplatesServiceCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for qrcodeTemplatesServiceDelete without sending the request
     */
    async qrcodeTemplatesServiceDeleteRequestOpts(requestParameters: QrcodeTemplatesServiceDeleteRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling qrcodeTemplatesServiceDelete().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["qrcodes:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["qrcodes:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/qrcode-templates/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Remove a QR code template belonging to the authenticated caller\'s workspace.  Requires the `qrcodes:write` scope.
     * Delete a workspace QR code template
     */
    async qrcodeTemplatesServiceDeleteRaw(requestParameters: QrcodeTemplatesServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        const requestOptions = await this.qrcodeTemplatesServiceDeleteRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Remove a QR code template belonging to the authenticated caller\'s workspace.  Requires the `qrcodes:write` scope.
     * Delete a workspace QR code template
     */
    async qrcodeTemplatesServiceDelete(requestParameters: QrcodeTemplatesServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.qrcodeTemplatesServiceDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for qrcodeTemplatesServiceGet without sending the request
     */
    async qrcodeTemplatesServiceGetRequestOpts(requestParameters: QrcodeTemplatesServiceGetRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling qrcodeTemplatesServiceGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['include'] != null) {
            queryParameters['include'] = requestParameters['include'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["qrcodes:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["qrcodes:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/qrcode-templates/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Retrieve a QR code template that belongs to the authenticated caller\'s workspace.  Requires the `qrcodes:read` scope.
     * Get a workspace QR code template
     */
    async qrcodeTemplatesServiceGetRaw(requestParameters: QrcodeTemplatesServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<QrcodeTemplate>> {
        const requestOptions = await this.qrcodeTemplatesServiceGetRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => QrcodeTemplateFromJSON(jsonValue));
    }

    /**
     * Retrieve a QR code template that belongs to the authenticated caller\'s workspace.  Requires the `qrcodes:read` scope.
     * Get a workspace QR code template
     */
    async qrcodeTemplatesServiceGet(requestParameters: QrcodeTemplatesServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<QrcodeTemplate> {
        const response = await this.qrcodeTemplatesServiceGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for qrcodeTemplatesServiceGetPublic without sending the request
     */
    async qrcodeTemplatesServiceGetPublicRequestOpts(requestParameters: QrcodeTemplatesServiceGetPublicRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['slug'] == null) {
            throw new runtime.RequiredError(
                'slug',
                'Required parameter "slug" was null or undefined when calling qrcodeTemplatesServiceGetPublic().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['include'] != null) {
            queryParameters['include'] = requestParameters['include'];
        }

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/v1/public/qrcode-templates/{slug}`;
        urlPath = urlPath.replace(`{${"slug"}}`, encodeURIComponent(String(requestParameters['slug'])));

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Retrieve a single published QR code template that is visible in the public gallery.
     * Get a public QR code template
     */
    async qrcodeTemplatesServiceGetPublicRaw(requestParameters: QrcodeTemplatesServiceGetPublicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PublicQrcodeTemplate>> {
        const requestOptions = await this.qrcodeTemplatesServiceGetPublicRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PublicQrcodeTemplateFromJSON(jsonValue));
    }

    /**
     * Retrieve a single published QR code template that is visible in the public gallery.
     * Get a public QR code template
     */
    async qrcodeTemplatesServiceGetPublic(requestParameters: QrcodeTemplatesServiceGetPublicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PublicQrcodeTemplate> {
        const response = await this.qrcodeTemplatesServiceGetPublicRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for qrcodeTemplatesServiceImport without sending the request
     */
    async qrcodeTemplatesServiceImportRequestOpts(requestParameters: QrcodeTemplatesServiceImportRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['importQrcodeTemplateRequest'] == null) {
            throw new runtime.RequiredError(
                'importQrcodeTemplateRequest',
                'Required parameter "importQrcodeTemplateRequest" was null or undefined when calling qrcodeTemplatesServiceImport().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["qrcodes:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["qrcodes:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/qrcode-templates/import`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ImportQrcodeTemplateRequestToJSON(requestParameters['importQrcodeTemplateRequest']),
        };
    }

    /**
     * Import a public QR code template into your workspace by slug. Creates a private copy owned by your workspace.  Requires the `qrcodes:write` scope.
     * Import a public QR code template
     */
    async qrcodeTemplatesServiceImportRaw(requestParameters: QrcodeTemplatesServiceImportRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ImportQrcodeTemplateResponse>> {
        const requestOptions = await this.qrcodeTemplatesServiceImportRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ImportQrcodeTemplateResponseFromJSON(jsonValue));
    }

    /**
     * Import a public QR code template into your workspace by slug. Creates a private copy owned by your workspace.  Requires the `qrcodes:write` scope.
     * Import a public QR code template
     */
    async qrcodeTemplatesServiceImport(requestParameters: QrcodeTemplatesServiceImportRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ImportQrcodeTemplateResponse> {
        const response = await this.qrcodeTemplatesServiceImportRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for qrcodeTemplatesServiceList without sending the request
     */
    async qrcodeTemplatesServiceListRequestOpts(requestParameters: QrcodeTemplatesServiceListRequest): Promise<runtime.RequestOpts> {
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["qrcodes:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["qrcodes:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/qrcode-templates`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Retrieve QR code templates that belong to the authenticated caller\'s workspace.  Requires the `qrcodes:read` scope.
     * List my QR code templates
     */
    async qrcodeTemplatesServiceListRaw(requestParameters: QrcodeTemplatesServiceListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListQrcodeTemplatesResponse>> {
        const requestOptions = await this.qrcodeTemplatesServiceListRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ListQrcodeTemplatesResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve QR code templates that belong to the authenticated caller\'s workspace.  Requires the `qrcodes:read` scope.
     * List my QR code templates
     */
    async qrcodeTemplatesServiceList(requestParameters: QrcodeTemplatesServiceListRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListQrcodeTemplatesResponse> {
        const response = await this.qrcodeTemplatesServiceListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for qrcodeTemplatesServiceListPublic without sending the request
     */
    async qrcodeTemplatesServiceListPublicRequestOpts(requestParameters: QrcodeTemplatesServiceListPublicRequest): Promise<runtime.RequestOpts> {
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


        let urlPath = `/v1/public/qrcode-templates`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Retrieve available QR code templates, optionally filtered by search terms or link destination. Featured templates come first, lowest featuredRank first, then the rest from the most recently updated.
     * List QR code templates
     */
    async qrcodeTemplatesServiceListPublicRaw(requestParameters: QrcodeTemplatesServiceListPublicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PublicListQrcodeTemplatesResponse>> {
        const requestOptions = await this.qrcodeTemplatesServiceListPublicRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PublicListQrcodeTemplatesResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve available QR code templates, optionally filtered by search terms or link destination. Featured templates come first, lowest featuredRank first, then the rest from the most recently updated.
     * List QR code templates
     */
    async qrcodeTemplatesServiceListPublic(requestParameters: QrcodeTemplatesServiceListPublicRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PublicListQrcodeTemplatesResponse> {
        const response = await this.qrcodeTemplatesServiceListPublicRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for qrcodeTemplatesServicePublish without sending the request
     */
    async qrcodeTemplatesServicePublishRequestOpts(requestParameters: QrcodeTemplatesServicePublishRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling qrcodeTemplatesServicePublish().'
            );
        }

        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling qrcodeTemplatesServicePublish().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["qrcodes:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["qrcodes:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/qrcode-templates/{id}/publish`;
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
     * Publish a QR code template to make it available in the public gallery. Requires workspace to be public and template to have slug, description, and name.  Requires the `qrcodes:write` scope.
     * Publish a workspace QR code template
     */
    async qrcodeTemplatesServicePublishRaw(requestParameters: QrcodeTemplatesServicePublishRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PublishQrcodeTemplateResponse>> {
        const requestOptions = await this.qrcodeTemplatesServicePublishRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PublishQrcodeTemplateResponseFromJSON(jsonValue));
    }

    /**
     * Publish a QR code template to make it available in the public gallery. Requires workspace to be public and template to have slug, description, and name.  Requires the `qrcodes:write` scope.
     * Publish a workspace QR code template
     */
    async qrcodeTemplatesServicePublish(requestParameters: QrcodeTemplatesServicePublishRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PublishQrcodeTemplateResponse> {
        const response = await this.qrcodeTemplatesServicePublishRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for qrcodeTemplatesServiceUpdate without sending the request
     */
    async qrcodeTemplatesServiceUpdateRequestOpts(requestParameters: QrcodeTemplatesServiceUpdateRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling qrcodeTemplatesServiceUpdate().'
            );
        }

        if (requestParameters['qrcodeTemplatesServiceUpdateBody'] == null) {
            throw new runtime.RequiredError(
                'qrcodeTemplatesServiceUpdateBody',
                'Required parameter "qrcodeTemplatesServiceUpdateBody" was null or undefined when calling qrcodeTemplatesServiceUpdate().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["qrcodes:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["qrcodes:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/qrcode-templates/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: QrcodeTemplatesServiceUpdateBodyToJSON(requestParameters['qrcodeTemplatesServiceUpdateBody']),
        };
    }

    /**
     * Modify the name or description of a QR code template owned by the authenticated workspace. featuredRank is reserved for the Linkbreakers workspace, which curates the public gallery.  Requires the `qrcodes:write` scope.
     * Update a workspace QR code template
     */
    async qrcodeTemplatesServiceUpdateRaw(requestParameters: QrcodeTemplatesServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdateQrcodeTemplateResponse>> {
        const requestOptions = await this.qrcodeTemplatesServiceUpdateRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UpdateQrcodeTemplateResponseFromJSON(jsonValue));
    }

    /**
     * Modify the name or description of a QR code template owned by the authenticated workspace. featuredRank is reserved for the Linkbreakers workspace, which curates the public gallery.  Requires the `qrcodes:write` scope.
     * Update a workspace QR code template
     */
    async qrcodeTemplatesServiceUpdate(requestParameters: QrcodeTemplatesServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdateQrcodeTemplateResponse> {
        const response = await this.qrcodeTemplatesServiceUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
