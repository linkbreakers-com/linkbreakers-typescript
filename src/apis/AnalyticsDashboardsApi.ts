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
  AnalyticsDashboardsServiceGenerateWidgetSummaryBody,
  AnalyticsDashboardsServiceUpdateBody,
  CreateDashboardRequest,
  CreateDashboardResponse,
  ErrorResponse,
  GenerateWidgetSummaryResponse,
  GetWidgetSummaryResponse,
  ListDashboardsResponse,
  UpdateDashboardResponse,
} from '../models/index';
import {
    AnalyticsDashboardsServiceGenerateWidgetSummaryBodyFromJSON,
    AnalyticsDashboardsServiceGenerateWidgetSummaryBodyToJSON,
    AnalyticsDashboardsServiceUpdateBodyFromJSON,
    AnalyticsDashboardsServiceUpdateBodyToJSON,
    CreateDashboardRequestFromJSON,
    CreateDashboardRequestToJSON,
    CreateDashboardResponseFromJSON,
    CreateDashboardResponseToJSON,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    GenerateWidgetSummaryResponseFromJSON,
    GenerateWidgetSummaryResponseToJSON,
    GetWidgetSummaryResponseFromJSON,
    GetWidgetSummaryResponseToJSON,
    ListDashboardsResponseFromJSON,
    ListDashboardsResponseToJSON,
    UpdateDashboardResponseFromJSON,
    UpdateDashboardResponseToJSON,
} from '../models/index';

export interface AnalyticsDashboardsServiceCreateRequest {
    createDashboardRequest: CreateDashboardRequest;
    idempotencyKey?: string;
}

export interface AnalyticsDashboardsServiceDeleteRequest {
    id: string;
}

export interface AnalyticsDashboardsServiceGenerateWidgetSummaryRequest {
    dashboardId: string;
    widgetId: string;
    analyticsDashboardsServiceGenerateWidgetSummaryBody: AnalyticsDashboardsServiceGenerateWidgetSummaryBody;
    idempotencyKey?: string;
}

export interface AnalyticsDashboardsServiceGetWidgetSummaryRequest {
    dashboardId: string;
    widgetId: string;
}

export interface AnalyticsDashboardsServiceListRequest {
    linkId?: string;
    scope?: string;
    pageSize?: number;
    pageToken?: string;
    cursor?: string;
}

export interface AnalyticsDashboardsServiceUpdateRequest {
    id: string;
    analyticsDashboardsServiceUpdateBody: AnalyticsDashboardsServiceUpdateBody;
    idempotencyKey?: string;
}

/**
 * AnalyticsDashboardsApi - interface
 * 
 * @export
 * @interface AnalyticsDashboardsApiInterface
 */
export interface AnalyticsDashboardsApiInterface {
    /**
     * Creates request options for analyticsDashboardsServiceCreate without sending the request
     * @param {CreateDashboardRequest} createDashboardRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof AnalyticsDashboardsApiInterface
     */
    analyticsDashboardsServiceCreateRequestOpts(requestParameters: AnalyticsDashboardsServiceCreateRequest): Promise<runtime.RequestOpts>;

    /**
     * Create a dashboard with its widgets, for the whole workspace or scoped to one link.  Requires the `analytics:write` scope.
     * @summary Create analytics dashboard
     * @param {CreateDashboardRequest} createDashboardRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsDashboardsApiInterface
     */
    analyticsDashboardsServiceCreateRaw(requestParameters: AnalyticsDashboardsServiceCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreateDashboardResponse>>;

    /**
     * Create a dashboard with its widgets, for the whole workspace or scoped to one link.  Requires the `analytics:write` scope.
     * Create analytics dashboard
     */
    analyticsDashboardsServiceCreate(requestParameters: AnalyticsDashboardsServiceCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreateDashboardResponse>;

    /**
     * Creates request options for analyticsDashboardsServiceDelete without sending the request
     * @param {string} id 
     * @throws {RequiredError}
     * @memberof AnalyticsDashboardsApiInterface
     */
    analyticsDashboardsServiceDeleteRequestOpts(requestParameters: AnalyticsDashboardsServiceDeleteRequest): Promise<runtime.RequestOpts>;

    /**
     * Delete a dashboard and its associated assistant conversation.  Requires the `analytics:write` scope.
     * @summary Delete analytics dashboard
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsDashboardsApiInterface
     */
    analyticsDashboardsServiceDeleteRaw(requestParameters: AnalyticsDashboardsServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>>;

    /**
     * Delete a dashboard and its associated assistant conversation.  Requires the `analytics:write` scope.
     * Delete analytics dashboard
     */
    analyticsDashboardsServiceDelete(requestParameters: AnalyticsDashboardsServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object>;

    /**
     * Creates request options for analyticsDashboardsServiceGenerateWidgetSummary without sending the request
     * @param {string} dashboardId Dashboard holding the widget
     * @param {string} widgetId Widget whose values should be analysed
     * @param {AnalyticsDashboardsServiceGenerateWidgetSummaryBody} analyticsDashboardsServiceGenerateWidgetSummaryBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof AnalyticsDashboardsApiInterface
     */
    analyticsDashboardsServiceGenerateWidgetSummaryRequestOpts(requestParameters: AnalyticsDashboardsServiceGenerateWidgetSummaryRequest): Promise<runtime.RequestOpts>;

    /**
     * Analyses the widget\'s current values and stores the result. Consumes platform credits, so it runs only when requested.  Requires the `analytics:write` scope.
     * @summary Generate a widget assistant summary
     * @param {string} dashboardId Dashboard holding the widget
     * @param {string} widgetId Widget whose values should be analysed
     * @param {AnalyticsDashboardsServiceGenerateWidgetSummaryBody} analyticsDashboardsServiceGenerateWidgetSummaryBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsDashboardsApiInterface
     */
    analyticsDashboardsServiceGenerateWidgetSummaryRaw(requestParameters: AnalyticsDashboardsServiceGenerateWidgetSummaryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GenerateWidgetSummaryResponse>>;

    /**
     * Analyses the widget\'s current values and stores the result. Consumes platform credits, so it runs only when requested.  Requires the `analytics:write` scope.
     * Generate a widget assistant summary
     */
    analyticsDashboardsServiceGenerateWidgetSummary(requestParameters: AnalyticsDashboardsServiceGenerateWidgetSummaryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GenerateWidgetSummaryResponse>;

    /**
     * Creates request options for analyticsDashboardsServiceGetWidgetSummary without sending the request
     * @param {string} dashboardId 
     * @param {string} widgetId 
     * @throws {RequiredError}
     * @memberof AnalyticsDashboardsApiInterface
     */
    analyticsDashboardsServiceGetWidgetSummaryRequestOpts(requestParameters: AnalyticsDashboardsServiceGetWidgetSummaryRequest): Promise<runtime.RequestOpts>;

    /**
     * Returns the last generated analysis, and whether the underlying values have changed since.  Requires the `analytics:read` scope.
     * @summary Get a stored widget assistant summary
     * @param {string} dashboardId 
     * @param {string} widgetId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsDashboardsApiInterface
     */
    analyticsDashboardsServiceGetWidgetSummaryRaw(requestParameters: AnalyticsDashboardsServiceGetWidgetSummaryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetWidgetSummaryResponse>>;

    /**
     * Returns the last generated analysis, and whether the underlying values have changed since.  Requires the `analytics:read` scope.
     * Get a stored widget assistant summary
     */
    analyticsDashboardsServiceGetWidgetSummary(requestParameters: AnalyticsDashboardsServiceGetWidgetSummaryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetWidgetSummaryResponse>;

    /**
     * Creates request options for analyticsDashboardsServiceList without sending the request
     * @param {string} [linkId] Restricts the result to the dashboard scoped to this link. Takes precedence over scope when both are set.
     * @param {string} [scope] Restricts the result by scope. Unset returns every dashboard.   - DASHBOARD_SCOPE_UNSPECIFIED: Every dashboard in the workspace, link-scoped or not.  - DASHBOARD_SCOPE_WORKSPACE: Only the workspace-wide dashboard, the one with no link.  - DASHBOARD_SCOPE_LINK: Only dashboards tied to a link.
     * @param {number} [pageSize] Maximum number to return. Defaults to 100, capped at 1000.
     * @param {string} [pageToken] Cursor from a previous response\&#39;s nextPageToken. Empty starts at the first page. Pages are ordered by (createdAt, id), which never change, so a record cannot move between pages while a client is walking them.
     * @param {string} [cursor] Opaque cursor from the previous page\&#39;s nextPageToken. Same as pageToken; when both are sent, pageToken wins.
     * @throws {RequiredError}
     * @memberof AnalyticsDashboardsApiInterface
     */
    analyticsDashboardsServiceListRequestOpts(requestParameters: AnalyticsDashboardsServiceListRequest): Promise<runtime.RequestOpts>;

    /**
     * List the workspace\'s analytics dashboards: the workspace-wide one and those scoped to a link. Filter by link or by scope.  Requires the `analytics:read` scope.
     * @summary List analytics dashboards
     * @param {string} [linkId] Restricts the result to the dashboard scoped to this link. Takes precedence over scope when both are set.
     * @param {string} [scope] Restricts the result by scope. Unset returns every dashboard.   - DASHBOARD_SCOPE_UNSPECIFIED: Every dashboard in the workspace, link-scoped or not.  - DASHBOARD_SCOPE_WORKSPACE: Only the workspace-wide dashboard, the one with no link.  - DASHBOARD_SCOPE_LINK: Only dashboards tied to a link.
     * @param {number} [pageSize] Maximum number to return. Defaults to 100, capped at 1000.
     * @param {string} [pageToken] Cursor from a previous response\&#39;s nextPageToken. Empty starts at the first page. Pages are ordered by (createdAt, id), which never change, so a record cannot move between pages while a client is walking them.
     * @param {string} [cursor] Opaque cursor from the previous page\&#39;s nextPageToken. Same as pageToken; when both are sent, pageToken wins.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsDashboardsApiInterface
     */
    analyticsDashboardsServiceListRaw(requestParameters: AnalyticsDashboardsServiceListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListDashboardsResponse>>;

    /**
     * List the workspace\'s analytics dashboards: the workspace-wide one and those scoped to a link. Filter by link or by scope.  Requires the `analytics:read` scope.
     * List analytics dashboards
     */
    analyticsDashboardsServiceList(requestParameters: AnalyticsDashboardsServiceListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListDashboardsResponse>;

    /**
     * Creates request options for analyticsDashboardsServiceUpdate without sending the request
     * @param {string} id ID of the dashboard to update.
     * @param {AnalyticsDashboardsServiceUpdateBody} analyticsDashboardsServiceUpdateBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof AnalyticsDashboardsApiInterface
     */
    analyticsDashboardsServiceUpdateRequestOpts(requestParameters: AnalyticsDashboardsServiceUpdateRequest): Promise<runtime.RequestOpts>;

    /**
     * Replace a dashboard\'s name and its widget configuration. Each widget names its own data source and visualization.  Requires the `analytics:write` scope.
     * @summary Update analytics dashboard
     * @param {string} id ID of the dashboard to update.
     * @param {AnalyticsDashboardsServiceUpdateBody} analyticsDashboardsServiceUpdateBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsDashboardsApiInterface
     */
    analyticsDashboardsServiceUpdateRaw(requestParameters: AnalyticsDashboardsServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdateDashboardResponse>>;

    /**
     * Replace a dashboard\'s name and its widget configuration. Each widget names its own data source and visualization.  Requires the `analytics:write` scope.
     * Update analytics dashboard
     */
    analyticsDashboardsServiceUpdate(requestParameters: AnalyticsDashboardsServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdateDashboardResponse>;

}

/**
 * 
 */
export class AnalyticsDashboardsApi extends runtime.BaseAPI implements AnalyticsDashboardsApiInterface {

    /**
     * Creates request options for analyticsDashboardsServiceCreate without sending the request
     */
    async analyticsDashboardsServiceCreateRequestOpts(requestParameters: AnalyticsDashboardsServiceCreateRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['createDashboardRequest'] == null) {
            throw new runtime.RequiredError(
                'createDashboardRequest',
                'Required parameter "createDashboardRequest" was null or undefined when calling analyticsDashboardsServiceCreate().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["analytics:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["analytics:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/analytics/dashboards`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateDashboardRequestToJSON(requestParameters['createDashboardRequest']),
        };
    }

    /**
     * Create a dashboard with its widgets, for the whole workspace or scoped to one link.  Requires the `analytics:write` scope.
     * Create analytics dashboard
     */
    async analyticsDashboardsServiceCreateRaw(requestParameters: AnalyticsDashboardsServiceCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreateDashboardResponse>> {
        const requestOptions = await this.analyticsDashboardsServiceCreateRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateDashboardResponseFromJSON(jsonValue));
    }

    /**
     * Create a dashboard with its widgets, for the whole workspace or scoped to one link.  Requires the `analytics:write` scope.
     * Create analytics dashboard
     */
    async analyticsDashboardsServiceCreate(requestParameters: AnalyticsDashboardsServiceCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreateDashboardResponse> {
        const response = await this.analyticsDashboardsServiceCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsDashboardsServiceDelete without sending the request
     */
    async analyticsDashboardsServiceDeleteRequestOpts(requestParameters: AnalyticsDashboardsServiceDeleteRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling analyticsDashboardsServiceDelete().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["analytics:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["analytics:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/analytics/dashboards/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Delete a dashboard and its associated assistant conversation.  Requires the `analytics:write` scope.
     * Delete analytics dashboard
     */
    async analyticsDashboardsServiceDeleteRaw(requestParameters: AnalyticsDashboardsServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        const requestOptions = await this.analyticsDashboardsServiceDeleteRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Delete a dashboard and its associated assistant conversation.  Requires the `analytics:write` scope.
     * Delete analytics dashboard
     */
    async analyticsDashboardsServiceDelete(requestParameters: AnalyticsDashboardsServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.analyticsDashboardsServiceDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsDashboardsServiceGenerateWidgetSummary without sending the request
     */
    async analyticsDashboardsServiceGenerateWidgetSummaryRequestOpts(requestParameters: AnalyticsDashboardsServiceGenerateWidgetSummaryRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['dashboardId'] == null) {
            throw new runtime.RequiredError(
                'dashboardId',
                'Required parameter "dashboardId" was null or undefined when calling analyticsDashboardsServiceGenerateWidgetSummary().'
            );
        }

        if (requestParameters['widgetId'] == null) {
            throw new runtime.RequiredError(
                'widgetId',
                'Required parameter "widgetId" was null or undefined when calling analyticsDashboardsServiceGenerateWidgetSummary().'
            );
        }

        if (requestParameters['analyticsDashboardsServiceGenerateWidgetSummaryBody'] == null) {
            throw new runtime.RequiredError(
                'analyticsDashboardsServiceGenerateWidgetSummaryBody',
                'Required parameter "analyticsDashboardsServiceGenerateWidgetSummaryBody" was null or undefined when calling analyticsDashboardsServiceGenerateWidgetSummary().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["analytics:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["analytics:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/analytics/dashboards/{dashboardId}/widgets/{widgetId}/summary`;
        urlPath = urlPath.replace(`{${"dashboardId"}}`, encodeURIComponent(String(requestParameters['dashboardId'])));
        urlPath = urlPath.replace(`{${"widgetId"}}`, encodeURIComponent(String(requestParameters['widgetId'])));

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AnalyticsDashboardsServiceGenerateWidgetSummaryBodyToJSON(requestParameters['analyticsDashboardsServiceGenerateWidgetSummaryBody']),
        };
    }

    /**
     * Analyses the widget\'s current values and stores the result. Consumes platform credits, so it runs only when requested.  Requires the `analytics:write` scope.
     * Generate a widget assistant summary
     */
    async analyticsDashboardsServiceGenerateWidgetSummaryRaw(requestParameters: AnalyticsDashboardsServiceGenerateWidgetSummaryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GenerateWidgetSummaryResponse>> {
        const requestOptions = await this.analyticsDashboardsServiceGenerateWidgetSummaryRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GenerateWidgetSummaryResponseFromJSON(jsonValue));
    }

    /**
     * Analyses the widget\'s current values and stores the result. Consumes platform credits, so it runs only when requested.  Requires the `analytics:write` scope.
     * Generate a widget assistant summary
     */
    async analyticsDashboardsServiceGenerateWidgetSummary(requestParameters: AnalyticsDashboardsServiceGenerateWidgetSummaryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GenerateWidgetSummaryResponse> {
        const response = await this.analyticsDashboardsServiceGenerateWidgetSummaryRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsDashboardsServiceGetWidgetSummary without sending the request
     */
    async analyticsDashboardsServiceGetWidgetSummaryRequestOpts(requestParameters: AnalyticsDashboardsServiceGetWidgetSummaryRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['dashboardId'] == null) {
            throw new runtime.RequiredError(
                'dashboardId',
                'Required parameter "dashboardId" was null or undefined when calling analyticsDashboardsServiceGetWidgetSummary().'
            );
        }

        if (requestParameters['widgetId'] == null) {
            throw new runtime.RequiredError(
                'widgetId',
                'Required parameter "widgetId" was null or undefined when calling analyticsDashboardsServiceGetWidgetSummary().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["analytics:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["analytics:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/analytics/dashboards/{dashboardId}/widgets/{widgetId}/summary`;
        urlPath = urlPath.replace(`{${"dashboardId"}}`, encodeURIComponent(String(requestParameters['dashboardId'])));
        urlPath = urlPath.replace(`{${"widgetId"}}`, encodeURIComponent(String(requestParameters['widgetId'])));

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Returns the last generated analysis, and whether the underlying values have changed since.  Requires the `analytics:read` scope.
     * Get a stored widget assistant summary
     */
    async analyticsDashboardsServiceGetWidgetSummaryRaw(requestParameters: AnalyticsDashboardsServiceGetWidgetSummaryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetWidgetSummaryResponse>> {
        const requestOptions = await this.analyticsDashboardsServiceGetWidgetSummaryRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetWidgetSummaryResponseFromJSON(jsonValue));
    }

    /**
     * Returns the last generated analysis, and whether the underlying values have changed since.  Requires the `analytics:read` scope.
     * Get a stored widget assistant summary
     */
    async analyticsDashboardsServiceGetWidgetSummary(requestParameters: AnalyticsDashboardsServiceGetWidgetSummaryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetWidgetSummaryResponse> {
        const response = await this.analyticsDashboardsServiceGetWidgetSummaryRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsDashboardsServiceList without sending the request
     */
    async analyticsDashboardsServiceListRequestOpts(requestParameters: AnalyticsDashboardsServiceListRequest): Promise<runtime.RequestOpts> {
        const queryParameters: any = {};

        if (requestParameters['linkId'] != null) {
            queryParameters['linkId'] = requestParameters['linkId'];
        }

        if (requestParameters['scope'] != null) {
            queryParameters['scope'] = requestParameters['scope'];
        }

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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["analytics:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["analytics:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/analytics/dashboards`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * List the workspace\'s analytics dashboards: the workspace-wide one and those scoped to a link. Filter by link or by scope.  Requires the `analytics:read` scope.
     * List analytics dashboards
     */
    async analyticsDashboardsServiceListRaw(requestParameters: AnalyticsDashboardsServiceListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListDashboardsResponse>> {
        const requestOptions = await this.analyticsDashboardsServiceListRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ListDashboardsResponseFromJSON(jsonValue));
    }

    /**
     * List the workspace\'s analytics dashboards: the workspace-wide one and those scoped to a link. Filter by link or by scope.  Requires the `analytics:read` scope.
     * List analytics dashboards
     */
    async analyticsDashboardsServiceList(requestParameters: AnalyticsDashboardsServiceListRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListDashboardsResponse> {
        const response = await this.analyticsDashboardsServiceListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsDashboardsServiceUpdate without sending the request
     */
    async analyticsDashboardsServiceUpdateRequestOpts(requestParameters: AnalyticsDashboardsServiceUpdateRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling analyticsDashboardsServiceUpdate().'
            );
        }

        if (requestParameters['analyticsDashboardsServiceUpdateBody'] == null) {
            throw new runtime.RequiredError(
                'analyticsDashboardsServiceUpdateBody',
                'Required parameter "analyticsDashboardsServiceUpdateBody" was null or undefined when calling analyticsDashboardsServiceUpdate().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["analytics:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["analytics:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/analytics/dashboards/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: AnalyticsDashboardsServiceUpdateBodyToJSON(requestParameters['analyticsDashboardsServiceUpdateBody']),
        };
    }

    /**
     * Replace a dashboard\'s name and its widget configuration. Each widget names its own data source and visualization.  Requires the `analytics:write` scope.
     * Update analytics dashboard
     */
    async analyticsDashboardsServiceUpdateRaw(requestParameters: AnalyticsDashboardsServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdateDashboardResponse>> {
        const requestOptions = await this.analyticsDashboardsServiceUpdateRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UpdateDashboardResponseFromJSON(jsonValue));
    }

    /**
     * Replace a dashboard\'s name and its widget configuration. Each widget names its own data source and visualization.  Requires the `analytics:write` scope.
     * Update analytics dashboard
     */
    async analyticsDashboardsServiceUpdate(requestParameters: AnalyticsDashboardsServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdateDashboardResponse> {
        const response = await this.analyticsDashboardsServiceUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
