/* tslint:disable */
/* eslint-disable */
/**
 * Linkbreakers API
 * The Linkbreakers REST API: links, QR codes, workflows, visitors and analytics, as JSON over HTTPS. Send a workspace API token as `Authorization: Bearer <token>`.  ## Entry points  `GET https://api.linkbreakers.com/` and `GET https://api.linkbreakers.com/v1` answer without credentials with the API\'s name, version and links. This document is served at `https://api.linkbreakers.com/openapi.json`.  ## Rate limits  Every response describes where the caller stands in the IETF `RateLimit-Policy` and `RateLimit` header fields (draft-ietf-httpapi-ratelimit-headers), and in `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` and `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` (a Unix timestamp) for clients that read those. A request past the limit gets `429 Too Many Requests` with `Retry-After` in seconds.  - Workspace API token: 720 requests per 60 seconds, per token. - Dashboard session or OAuth token: 600 requests per 60 seconds, per token. - No credentials: 300 requests per 60 seconds, per client IP.  Each plan also includes a number of API calls per billing cycle. Past it, calls answer `429` with the code `MAX_PUBLIC_API_QUERIED_REACHED` until the cycle renews or the plan changes.  ## Pagination  Every list pages with opaque cursors (AIP-158). Pass `pageSize`, then send the `nextPageToken` of each response back as `pageToken` (or its alias `cursor`) to get the next page. An empty or absent `nextPageToken` means the list is complete. Each list operation describes this in `x-pagination`.  ## Batches and background jobs  `POST /v1/links/bulk` creates up to 250 links in one transactional request; `POST /v1/links/batch` takes the same links as a bare JSON array. `POST /v1/links/bulk/jobs` accepts the same batch and answers `202 Accepted` at once with a link job and a `Location` header; poll `GET /v1/links/jobs/{id}` until `status` is `LINK_JOB_STATUS_SUCCEEDED` (the created link ids are in `linksBulkCreate.linkIds`) or `LINK_JOB_STATUS_FAILED` (`error` says why, and nothing was created). Link jobs can be read for 24 hours after they finish.  ## Paused workspaces  A free workspace whose members have not verified any email address is paused 7 days after sign-up. Its calls then answer `403` with the code `WORKSPACE_UNVERIFIED` and change nothing; QR codes and links keep working for visitors. To lift the pause, ask the workspace owner to verify their email: `POST /v1/members/email-verification` sends the verification email again, and works while the workspace is paused. `unverifiedPauseAt` on the workspace says when the pause starts.  ## Versioning and deprecation  The version is in the path: every operation lives under `/v1`. Within a version, changes are additive only: new operations, new optional request fields, new response fields and new enum values. Clients should ignore fields and enum values they do not know. Anything that would break an existing client ships under a new path version instead.  An operation is retired in two steps. First it is deprecated: it keeps working, is flagged `deprecated: true` in this document, and every response carries a `Deprecation` header field (RFC 9745) with the time it was deprecated and a `Link` with `rel=\"deprecation\"` to the policy. Then, at least 180 days later, it may be removed; that date is announced in advance in a `Sunset` header field (RFC 8594) and as `x-sunset` on the operation. The full policy: https://linkbreakers.com/help/article/api-versioning-and-deprecation-policy  A renamed operation keeps answering its former path while clients still call it, until that path\'s sunset at the latest: a former path no client calls for 14 days is removed. Responses on a former path carry the same `Deprecation`, `Sunset` and `Link` header fields; this document lists only the current path, and the policy lists the former paths that still answer.  ## Idempotent retries  Every POST, PUT and PATCH accepts an optional `Idempotency-Key` header (draft-ietf-httpapi-idempotency-key-header). Send a new unique value, such as a UUID, with each logical request and reuse it only to retry that request. A retry with the same key and the same request returns the first response, marked `Idempotent-Replayed: true`, instead of running again. Keys are scoped to the token and kept for 24 hours. The same key with a different request is refused with `422`, and a retry while the first request is still running gets `409` with `Retry-After`. Server errors (5xx) and refusals such as 401, 403 and 429 are not stored, so retrying them runs the request again.  ## Identifying your client  Send a `Linkbreakers-Client` request header saying which client made the call: `<client>/<version> (<details>)`, for example `my-integration/1.2.0 (python 3.12; linux)`. The official SDKs, the CLI and the MCP bridge set it for you, as `sdk-python/2.3.1 (python 3.12.4; linux)` or `cli/1.4.0 (darwin arm64)`. It is optional and changes nothing about how a request is handled; it tells us which clients and versions are in use, so we know what can be retired and what to fix first. Keep the details short and free of personal data. Browsers may send it too: it is allowed by CORS.
 *
 * The version of the OpenAPI document: 1.205.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  ErrorResponse,
  EventsMetric,
  GetAttributeDistributionRequest,
  GetAttributeDistributionResponse,
  GetAttributeMetricRequest,
  GetAttributeMetricResponse,
  GetAttributeValuesRequest,
  GetAttributeValuesResponse,
  GetBreakdownRequest,
  GetBreakdownResponse,
  GetDeviceDistributionRequest,
  GetDeviceDistributionResponse,
  GetGeoBreakdownRequest,
  GetGeoBreakdownResponse,
  GetGroupedTimeSeriesRequest,
  GetGroupedTimeSeriesResponse,
  GetHourOfDayDistributionRequest,
  GetHourOfDayDistributionResponse,
  GetSharedLocationsResponse,
  GetStepFunnelRequest,
  GetStepFunnelResponse,
  GetTopLinksRequest,
  GetTopLinksResponse,
  GetTrafficSplitResultsRequest,
  GetTrafficSplitResultsResponse,
  GetVisitorTrendsRequest,
  GetVisitorTrendsResponse,
  ListVisitorCountriesResponse,
  WorkspaceMetric,
} from '../models/index';
import {
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    EventsMetricFromJSON,
    EventsMetricToJSON,
    GetAttributeDistributionRequestFromJSON,
    GetAttributeDistributionRequestToJSON,
    GetAttributeDistributionResponseFromJSON,
    GetAttributeDistributionResponseToJSON,
    GetAttributeMetricRequestFromJSON,
    GetAttributeMetricRequestToJSON,
    GetAttributeMetricResponseFromJSON,
    GetAttributeMetricResponseToJSON,
    GetAttributeValuesRequestFromJSON,
    GetAttributeValuesRequestToJSON,
    GetAttributeValuesResponseFromJSON,
    GetAttributeValuesResponseToJSON,
    GetBreakdownRequestFromJSON,
    GetBreakdownRequestToJSON,
    GetBreakdownResponseFromJSON,
    GetBreakdownResponseToJSON,
    GetDeviceDistributionRequestFromJSON,
    GetDeviceDistributionRequestToJSON,
    GetDeviceDistributionResponseFromJSON,
    GetDeviceDistributionResponseToJSON,
    GetGeoBreakdownRequestFromJSON,
    GetGeoBreakdownRequestToJSON,
    GetGeoBreakdownResponseFromJSON,
    GetGeoBreakdownResponseToJSON,
    GetGroupedTimeSeriesRequestFromJSON,
    GetGroupedTimeSeriesRequestToJSON,
    GetGroupedTimeSeriesResponseFromJSON,
    GetGroupedTimeSeriesResponseToJSON,
    GetHourOfDayDistributionRequestFromJSON,
    GetHourOfDayDistributionRequestToJSON,
    GetHourOfDayDistributionResponseFromJSON,
    GetHourOfDayDistributionResponseToJSON,
    GetSharedLocationsResponseFromJSON,
    GetSharedLocationsResponseToJSON,
    GetStepFunnelRequestFromJSON,
    GetStepFunnelRequestToJSON,
    GetStepFunnelResponseFromJSON,
    GetStepFunnelResponseToJSON,
    GetTopLinksRequestFromJSON,
    GetTopLinksRequestToJSON,
    GetTopLinksResponseFromJSON,
    GetTopLinksResponseToJSON,
    GetTrafficSplitResultsRequestFromJSON,
    GetTrafficSplitResultsRequestToJSON,
    GetTrafficSplitResultsResponseFromJSON,
    GetTrafficSplitResultsResponseToJSON,
    GetVisitorTrendsRequestFromJSON,
    GetVisitorTrendsRequestToJSON,
    GetVisitorTrendsResponseFromJSON,
    GetVisitorTrendsResponseToJSON,
    ListVisitorCountriesResponseFromJSON,
    ListVisitorCountriesResponseToJSON,
    WorkspaceMetricFromJSON,
    WorkspaceMetricToJSON,
} from '../models/index';

export interface AnalyticsServiceGetAttributeDistributionRequest {
    getAttributeDistributionRequest: GetAttributeDistributionRequest;
    idempotencyKey?: string;
}

export interface AnalyticsServiceGetAttributeMetricRequest {
    getAttributeMetricRequest: GetAttributeMetricRequest;
    idempotencyKey?: string;
}

export interface AnalyticsServiceGetAttributeValuesRequest {
    getAttributeValuesRequest: GetAttributeValuesRequest;
    idempotencyKey?: string;
}

export interface AnalyticsServiceGetBreakdownRequest {
    getBreakdownRequest: GetBreakdownRequest;
    idempotencyKey?: string;
}

export interface AnalyticsServiceGetDeviceDistributionRequest {
    getDeviceDistributionRequest: GetDeviceDistributionRequest;
    idempotencyKey?: string;
}

export interface AnalyticsServiceGetEventsMetricRequest {
    startDate?: Date;
    endDate?: Date;
    linkId?: string;
    directoryId?: string;
    tagId?: string;
    countries?: Array<string>;
}

export interface AnalyticsServiceGetGeoBreakdownRequest {
    getGeoBreakdownRequest: GetGeoBreakdownRequest;
    idempotencyKey?: string;
}

export interface AnalyticsServiceGetGroupedTimeSeriesRequest {
    getGroupedTimeSeriesRequest: GetGroupedTimeSeriesRequest;
    idempotencyKey?: string;
}

export interface AnalyticsServiceGetHourOfDayDistributionRequest {
    getHourOfDayDistributionRequest: GetHourOfDayDistributionRequest;
    idempotencyKey?: string;
}

export interface AnalyticsServiceGetSharedLocationsRequest {
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    linkId?: string;
    directoryId?: string;
    tagId?: string;
    countries?: Array<string>;
}

export interface AnalyticsServiceGetStepFunnelRequest {
    getStepFunnelRequest: GetStepFunnelRequest;
    idempotencyKey?: string;
}

export interface AnalyticsServiceGetTopLinksRequest {
    getTopLinksRequest: GetTopLinksRequest;
    idempotencyKey?: string;
}

export interface AnalyticsServiceGetTrafficSplitResultsRequest {
    getTrafficSplitResultsRequest: GetTrafficSplitResultsRequest;
    idempotencyKey?: string;
}

export interface AnalyticsServiceGetVisitorTrendsRequest {
    getVisitorTrendsRequest: GetVisitorTrendsRequest;
    idempotencyKey?: string;
}

/**
 * AnalyticsApi - interface
 * 
 * @export
 * @interface AnalyticsApiInterface
 */
export interface AnalyticsApiInterface {
    /**
     * Creates request options for analyticsServiceGetAttributeDistribution without sending the request
     * @param {GetAttributeDistributionRequest} getAttributeDistributionRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetAttributeDistributionRequestOpts(requestParameters: AnalyticsServiceGetAttributeDistributionRequest): Promise<runtime.RequestOpts>;

    /**
     * Returns how visitors are spread across the values of one attribute, for example how many gave each rating.  Requires the `analytics:read` scope.
     * @summary Get visitor attribute distribution
     * @param {GetAttributeDistributionRequest} getAttributeDistributionRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetAttributeDistributionRaw(requestParameters: AnalyticsServiceGetAttributeDistributionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetAttributeDistributionResponse>>;

    /**
     * Returns how visitors are spread across the values of one attribute, for example how many gave each rating.  Requires the `analytics:read` scope.
     * Get visitor attribute distribution
     */
    analyticsServiceGetAttributeDistribution(requestParameters: AnalyticsServiceGetAttributeDistributionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetAttributeDistributionResponse>;

    /**
     * Creates request options for analyticsServiceGetAttributeMetric without sending the request
     * @param {GetAttributeMetricRequest} getAttributeMetricRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetAttributeMetricRequestOpts(requestParameters: AnalyticsServiceGetAttributeMetricRequest): Promise<runtime.RequestOpts>;

    /**
     * Returns count, average, minimum and maximum for a visitor attribute, plus how much of the audience carries it.  Requires the `analytics:read` scope.
     * @summary Get visitor attribute metric
     * @param {GetAttributeMetricRequest} getAttributeMetricRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetAttributeMetricRaw(requestParameters: AnalyticsServiceGetAttributeMetricRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetAttributeMetricResponse>>;

    /**
     * Returns count, average, minimum and maximum for a visitor attribute, plus how much of the audience carries it.  Requires the `analytics:read` scope.
     * Get visitor attribute metric
     */
    analyticsServiceGetAttributeMetric(requestParameters: AnalyticsServiceGetAttributeMetricRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetAttributeMetricResponse>;

    /**
     * Creates request options for analyticsServiceGetAttributeValues without sending the request
     * @param {GetAttributeValuesRequest} getAttributeValuesRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetAttributeValuesRequestOpts(requestParameters: AnalyticsServiceGetAttributeValuesRequest): Promise<runtime.RequestOpts>;

    /**
     * Returns the individual recorded values of one attribute, most recent first. Intended for free text such as comments.  Requires the `analytics:read` scope.
     * @summary List visitor attribute values
     * @param {GetAttributeValuesRequest} getAttributeValuesRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetAttributeValuesRaw(requestParameters: AnalyticsServiceGetAttributeValuesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetAttributeValuesResponse>>;

    /**
     * Returns the individual recorded values of one attribute, most recent first. Intended for free text such as comments.  Requires the `analytics:read` scope.
     * List visitor attribute values
     */
    analyticsServiceGetAttributeValues(requestParameters: AnalyticsServiceGetAttributeValuesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetAttributeValuesResponse>;

    /**
     * Creates request options for analyticsServiceGetBreakdown without sending the request
     * @param {GetBreakdownRequest} getBreakdownRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetBreakdownRequestOpts(requestParameters: AnalyticsServiceGetBreakdownRequest): Promise<runtime.RequestOpts>;

    /**
     * Returns a ranked breakdown of events by any dimension (browser, platform, device type, country, city, visit type, in-app browser, in-app browser version).  Requires the `analytics:read` scope.
     * @summary Get dimension breakdown
     * @param {GetBreakdownRequest} getBreakdownRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetBreakdownRaw(requestParameters: AnalyticsServiceGetBreakdownRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetBreakdownResponse>>;

    /**
     * Returns a ranked breakdown of events by any dimension (browser, platform, device type, country, city, visit type, in-app browser, in-app browser version).  Requires the `analytics:read` scope.
     * Get dimension breakdown
     */
    analyticsServiceGetBreakdown(requestParameters: AnalyticsServiceGetBreakdownRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetBreakdownResponse>;

    /**
     * Creates request options for analyticsServiceGetDeviceDistribution without sending the request
     * @param {GetDeviceDistributionRequest} getDeviceDistributionRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetDeviceDistributionRequestOpts(requestParameters: AnalyticsServiceGetDeviceDistributionRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieve event distribution across device types.  Requires the `analytics:read` scope.
     * @summary Get device distribution
     * @param {GetDeviceDistributionRequest} getDeviceDistributionRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetDeviceDistributionRaw(requestParameters: AnalyticsServiceGetDeviceDistributionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetDeviceDistributionResponse>>;

    /**
     * Retrieve event distribution across device types.  Requires the `analytics:read` scope.
     * Get device distribution
     */
    analyticsServiceGetDeviceDistribution(requestParameters: AnalyticsServiceGetDeviceDistributionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetDeviceDistributionResponse>;

    /**
     * Creates request options for analyticsServiceGetEventsMetric without sending the request
     * @param {Date} [startDate] Inclusive start timestamp for the aggregation
     * @param {Date} [endDate] Inclusive end timestamp for the aggregation
     * @param {string} [linkId] Optional link filter (UUID); when omitted aggregates workspace-wide  UUID format
     * @param {string} [directoryId] Optional directory filter (UUID): the links of this directory and of every directory below it. Send linkId or directoryId, not both; when both are omitted aggregates workspace-wide
     * @param {string} [tagId] Optional tag filter (UUID): every link carrying this tag. Send at most one of linkId, directoryId and tagId
     * @param {Array<string>} [countries] Optional country filter: visits from any of these countries (ISO 3166-1 alpha-2 codes, e.g. \&quot;FR\&quot;). Combines with the link, directory or tag filter
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetEventsMetricRequestOpts(requestParameters: AnalyticsServiceGetEventsMetricRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieve aggregated event analytics for the provided time window and optional link filter.  Requires the `analytics:read` scope.
     * @summary Get events metric
     * @param {Date} [startDate] Inclusive start timestamp for the aggregation
     * @param {Date} [endDate] Inclusive end timestamp for the aggregation
     * @param {string} [linkId] Optional link filter (UUID); when omitted aggregates workspace-wide  UUID format
     * @param {string} [directoryId] Optional directory filter (UUID): the links of this directory and of every directory below it. Send linkId or directoryId, not both; when both are omitted aggregates workspace-wide
     * @param {string} [tagId] Optional tag filter (UUID): every link carrying this tag. Send at most one of linkId, directoryId and tagId
     * @param {Array<string>} [countries] Optional country filter: visits from any of these countries (ISO 3166-1 alpha-2 codes, e.g. \&quot;FR\&quot;). Combines with the link, directory or tag filter
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetEventsMetricRaw(requestParameters: AnalyticsServiceGetEventsMetricRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EventsMetric>>;

    /**
     * Retrieve aggregated event analytics for the provided time window and optional link filter.  Requires the `analytics:read` scope.
     * Get events metric
     */
    analyticsServiceGetEventsMetric(requestParameters: AnalyticsServiceGetEventsMetricRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EventsMetric>;

    /**
     * Creates request options for analyticsServiceGetGeoBreakdown without sending the request
     * @param {GetGeoBreakdownRequest} getGeoBreakdownRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetGeoBreakdownRequestOpts(requestParameters: AnalyticsServiceGetGeoBreakdownRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieve geographic distribution of events grouped by country or city.  Requires the `analytics:read` scope.
     * @summary Get geographic breakdown
     * @param {GetGeoBreakdownRequest} getGeoBreakdownRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetGeoBreakdownRaw(requestParameters: AnalyticsServiceGetGeoBreakdownRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetGeoBreakdownResponse>>;

    /**
     * Retrieve geographic distribution of events grouped by country or city.  Requires the `analytics:read` scope.
     * Get geographic breakdown
     */
    analyticsServiceGetGeoBreakdown(requestParameters: AnalyticsServiceGetGeoBreakdownRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetGeoBreakdownResponse>;

    /**
     * Creates request options for analyticsServiceGetGroupedTimeSeries without sending the request
     * @param {GetGroupedTimeSeriesRequest} getGroupedTimeSeriesRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetGroupedTimeSeriesRequestOpts(requestParameters: AnalyticsServiceGetGroupedTimeSeriesRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieve time-bucketed event counts grouped by a dimension like country, city, device type, or visit type.  Requires the `analytics:read` scope.
     * @summary Get grouped time series
     * @param {GetGroupedTimeSeriesRequest} getGroupedTimeSeriesRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetGroupedTimeSeriesRaw(requestParameters: AnalyticsServiceGetGroupedTimeSeriesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetGroupedTimeSeriesResponse>>;

    /**
     * Retrieve time-bucketed event counts grouped by a dimension like country, city, device type, or visit type.  Requires the `analytics:read` scope.
     * Get grouped time series
     */
    analyticsServiceGetGroupedTimeSeries(requestParameters: AnalyticsServiceGetGroupedTimeSeriesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetGroupedTimeSeriesResponse>;

    /**
     * Creates request options for analyticsServiceGetHourOfDayDistribution without sending the request
     * @param {GetHourOfDayDistributionRequest} getHourOfDayDistributionRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetHourOfDayDistributionRequestOpts(requestParameters: AnalyticsServiceGetHourOfDayDistributionRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieve event counts aggregated by hour of day, in the workspace\'s time zone, for identifying peak activity times.  Requires the `analytics:read` scope.
     * @summary Get hour of day distribution
     * @param {GetHourOfDayDistributionRequest} getHourOfDayDistributionRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetHourOfDayDistributionRaw(requestParameters: AnalyticsServiceGetHourOfDayDistributionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetHourOfDayDistributionResponse>>;

    /**
     * Retrieve event counts aggregated by hour of day, in the workspace\'s time zone, for identifying peak activity times.  Requires the `analytics:read` scope.
     * Get hour of day distribution
     */
    analyticsServiceGetHourOfDayDistribution(requestParameters: AnalyticsServiceGetHourOfDayDistributionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetHourOfDayDistributionResponse>;

    /**
     * Creates request options for analyticsServiceGetSharedLocations without sending the request
     * @param {Date} [startDate] Inclusive start timestamp. Without startDate and endDate the request covers all time.
     * @param {Date} [endDate] Exclusive end timestamp
     * @param {number} [limit] Maximum number of positions returned, newest first. Defaults to and may not exceed 2000. total still counts every match.
     * @param {string} [linkId] Optional link filter (UUID); when omitted covers the whole workspace
     * @param {string} [directoryId] Optional directory filter (UUID): the links of this directory and of every directory below it. Send at most one of linkId, directoryId and tagId
     * @param {string} [tagId] Optional tag filter (UUID): every link carrying this tag. Send at most one of linkId, directoryId and tagId
     * @param {Array<string>} [countries] Optional country filter: visits from any of these countries (ISO 3166-1 alpha-2 codes, e.g. \&quot;FR\&quot;). Combines with the link, directory or tag filter
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetSharedLocationsRequestOpts(requestParameters: AnalyticsServiceGetSharedLocationsRequest): Promise<runtime.RequestOpts>;

    /**
     * Returns the precise positions visitors shared through a Location request workflow step, newest first, capped at 2000, with the total count. Without startDate and endDate it covers all time.  Requires the `analytics:read` scope.
     * @summary List shared locations
     * @param {Date} [startDate] Inclusive start timestamp. Without startDate and endDate the request covers all time.
     * @param {Date} [endDate] Exclusive end timestamp
     * @param {number} [limit] Maximum number of positions returned, newest first. Defaults to and may not exceed 2000. total still counts every match.
     * @param {string} [linkId] Optional link filter (UUID); when omitted covers the whole workspace
     * @param {string} [directoryId] Optional directory filter (UUID): the links of this directory and of every directory below it. Send at most one of linkId, directoryId and tagId
     * @param {string} [tagId] Optional tag filter (UUID): every link carrying this tag. Send at most one of linkId, directoryId and tagId
     * @param {Array<string>} [countries] Optional country filter: visits from any of these countries (ISO 3166-1 alpha-2 codes, e.g. \&quot;FR\&quot;). Combines with the link, directory or tag filter
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetSharedLocationsRaw(requestParameters: AnalyticsServiceGetSharedLocationsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetSharedLocationsResponse>>;

    /**
     * Returns the precise positions visitors shared through a Location request workflow step, newest first, capped at 2000, with the total count. Without startDate and endDate it covers all time.  Requires the `analytics:read` scope.
     * List shared locations
     */
    analyticsServiceGetSharedLocations(requestParameters: AnalyticsServiceGetSharedLocationsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetSharedLocationsResponse>;

    /**
     * Creates request options for analyticsServiceGetStepFunnel without sending the request
     * @param {GetStepFunnelRequest} getStepFunnelRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetStepFunnelRequestOpts(requestParameters: AnalyticsServiceGetStepFunnelRequest): Promise<runtime.RequestOpts>;

    /**
     * Returns the workflow steps visitors reached, in distinct visitors, ordered from arrival to exit, with the conversion rate and drop-off at each step.  Requires the `analytics:read` scope.
     * @summary Get workflow step funnel
     * @param {GetStepFunnelRequest} getStepFunnelRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetStepFunnelRaw(requestParameters: AnalyticsServiceGetStepFunnelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetStepFunnelResponse>>;

    /**
     * Returns the workflow steps visitors reached, in distinct visitors, ordered from arrival to exit, with the conversion rate and drop-off at each step.  Requires the `analytics:read` scope.
     * Get workflow step funnel
     */
    analyticsServiceGetStepFunnel(requestParameters: AnalyticsServiceGetStepFunnelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetStepFunnelResponse>;

    /**
     * Creates request options for analyticsServiceGetTopLinks without sending the request
     * @param {GetTopLinksRequest} getTopLinksRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetTopLinksRequestOpts(requestParameters: AnalyticsServiceGetTopLinksRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieve links ranked by event count for identifying best performing QR codes and links.  Requires the `analytics:read` scope.
     * @summary Get top performing links
     * @param {GetTopLinksRequest} getTopLinksRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetTopLinksRaw(requestParameters: AnalyticsServiceGetTopLinksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetTopLinksResponse>>;

    /**
     * Retrieve links ranked by event count for identifying best performing QR codes and links.  Requires the `analytics:read` scope.
     * Get top performing links
     */
    analyticsServiceGetTopLinks(requestParameters: AnalyticsServiceGetTopLinksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetTopLinksResponse>;

    /**
     * Creates request options for analyticsServiceGetTrafficSplitResults without sending the request
     * @param {GetTrafficSplitResultsRequest} getTrafficSplitResultsRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetTrafficSplitResultsRequestOpts(requestParameters: AnalyticsServiceGetTrafficSplitResultsRequest): Promise<runtime.RequestOpts>;

    /**
     * Returns visits and visitors per variant of a traffic split step, leaving out bots, link previews and automated browsers, with whether there is enough data (100 per variant) and a sample ratio mismatch warning. A sticky split, the default, compares visitors against the weights. With sticky off every visit is assigned afresh, so it compares visits and one person may appear under several variants. It does not test significance or name a winner.  Requires the `analytics:read` scope.
     * @summary Get traffic split results
     * @param {GetTrafficSplitResultsRequest} getTrafficSplitResultsRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetTrafficSplitResultsRaw(requestParameters: AnalyticsServiceGetTrafficSplitResultsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetTrafficSplitResultsResponse>>;

    /**
     * Returns visits and visitors per variant of a traffic split step, leaving out bots, link previews and automated browsers, with whether there is enough data (100 per variant) and a sample ratio mismatch warning. A sticky split, the default, compares visitors against the weights. With sticky off every visit is assigned afresh, so it compares visits and one person may appear under several variants. It does not test significance or name a winner.  Requires the `analytics:read` scope.
     * Get traffic split results
     */
    analyticsServiceGetTrafficSplitResults(requestParameters: AnalyticsServiceGetTrafficSplitResultsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetTrafficSplitResultsResponse>;

    /**
     * Creates request options for analyticsServiceGetVisitorTrends without sending the request
     * @param {GetVisitorTrendsRequest} getVisitorTrendsRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetVisitorTrendsRequestOpts(requestParameters: AnalyticsServiceGetVisitorTrendsRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieve new vs returning visitor counts over time.  Requires the `analytics:read` scope.
     * @summary Get visitor trends
     * @param {GetVisitorTrendsRequest} getVisitorTrendsRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetVisitorTrendsRaw(requestParameters: AnalyticsServiceGetVisitorTrendsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetVisitorTrendsResponse>>;

    /**
     * Retrieve new vs returning visitor counts over time.  Requires the `analytics:read` scope.
     * Get visitor trends
     */
    analyticsServiceGetVisitorTrends(requestParameters: AnalyticsServiceGetVisitorTrendsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetVisitorTrendsResponse>;

    /**
     * Creates request options for analyticsServiceGetWorkspaceMetric without sending the request
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetWorkspaceMetricRequestOpts(): Promise<runtime.RequestOpts>;

    /**
     * Return high-level workspace totals covering members, links, and activity volume.  Requires the `analytics:read` scope.
     * @summary Get workspace metric
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceGetWorkspaceMetricRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<WorkspaceMetric>>;

    /**
     * Return high-level workspace totals covering members, links, and activity volume.  Requires the `analytics:read` scope.
     * Get workspace metric
     */
    analyticsServiceGetWorkspaceMetric(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<WorkspaceMetric>;

    /**
     * Creates request options for analyticsServiceListVisitorCountries without sending the request
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceListVisitorCountriesRequestOpts(): Promise<runtime.RequestOpts>;

    /**
     * Every country the workspace\'s visits came from, all time, most visited first, without counts. Meant for country filters. For visit numbers per country, use the geo breakdown.  Requires the `analytics:read` scope.
     * @summary List visitor countries
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnalyticsApiInterface
     */
    analyticsServiceListVisitorCountriesRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListVisitorCountriesResponse>>;

    /**
     * Every country the workspace\'s visits came from, all time, most visited first, without counts. Meant for country filters. For visit numbers per country, use the geo breakdown.  Requires the `analytics:read` scope.
     * List visitor countries
     */
    analyticsServiceListVisitorCountries(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListVisitorCountriesResponse>;

}

/**
 * 
 */
export class AnalyticsApi extends runtime.BaseAPI implements AnalyticsApiInterface {

    /**
     * Creates request options for analyticsServiceGetAttributeDistribution without sending the request
     */
    async analyticsServiceGetAttributeDistributionRequestOpts(requestParameters: AnalyticsServiceGetAttributeDistributionRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['getAttributeDistributionRequest'] == null) {
            throw new runtime.RequiredError(
                'getAttributeDistributionRequest',
                'Required parameter "getAttributeDistributionRequest" was null or undefined when calling analyticsServiceGetAttributeDistribution().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["analytics:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["analytics:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/analytics/attributes/distribution`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GetAttributeDistributionRequestToJSON(requestParameters['getAttributeDistributionRequest']),
        };
    }

    /**
     * Returns how visitors are spread across the values of one attribute, for example how many gave each rating.  Requires the `analytics:read` scope.
     * Get visitor attribute distribution
     */
    async analyticsServiceGetAttributeDistributionRaw(requestParameters: AnalyticsServiceGetAttributeDistributionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetAttributeDistributionResponse>> {
        const requestOptions = await this.analyticsServiceGetAttributeDistributionRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetAttributeDistributionResponseFromJSON(jsonValue));
    }

    /**
     * Returns how visitors are spread across the values of one attribute, for example how many gave each rating.  Requires the `analytics:read` scope.
     * Get visitor attribute distribution
     */
    async analyticsServiceGetAttributeDistribution(requestParameters: AnalyticsServiceGetAttributeDistributionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetAttributeDistributionResponse> {
        const response = await this.analyticsServiceGetAttributeDistributionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsServiceGetAttributeMetric without sending the request
     */
    async analyticsServiceGetAttributeMetricRequestOpts(requestParameters: AnalyticsServiceGetAttributeMetricRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['getAttributeMetricRequest'] == null) {
            throw new runtime.RequiredError(
                'getAttributeMetricRequest',
                'Required parameter "getAttributeMetricRequest" was null or undefined when calling analyticsServiceGetAttributeMetric().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["analytics:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["analytics:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/analytics/attributes/metric`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GetAttributeMetricRequestToJSON(requestParameters['getAttributeMetricRequest']),
        };
    }

    /**
     * Returns count, average, minimum and maximum for a visitor attribute, plus how much of the audience carries it.  Requires the `analytics:read` scope.
     * Get visitor attribute metric
     */
    async analyticsServiceGetAttributeMetricRaw(requestParameters: AnalyticsServiceGetAttributeMetricRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetAttributeMetricResponse>> {
        const requestOptions = await this.analyticsServiceGetAttributeMetricRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetAttributeMetricResponseFromJSON(jsonValue));
    }

    /**
     * Returns count, average, minimum and maximum for a visitor attribute, plus how much of the audience carries it.  Requires the `analytics:read` scope.
     * Get visitor attribute metric
     */
    async analyticsServiceGetAttributeMetric(requestParameters: AnalyticsServiceGetAttributeMetricRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetAttributeMetricResponse> {
        const response = await this.analyticsServiceGetAttributeMetricRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsServiceGetAttributeValues without sending the request
     */
    async analyticsServiceGetAttributeValuesRequestOpts(requestParameters: AnalyticsServiceGetAttributeValuesRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['getAttributeValuesRequest'] == null) {
            throw new runtime.RequiredError(
                'getAttributeValuesRequest',
                'Required parameter "getAttributeValuesRequest" was null or undefined when calling analyticsServiceGetAttributeValues().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["analytics:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["analytics:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/analytics/attributes/values`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GetAttributeValuesRequestToJSON(requestParameters['getAttributeValuesRequest']),
        };
    }

    /**
     * Returns the individual recorded values of one attribute, most recent first. Intended for free text such as comments.  Requires the `analytics:read` scope.
     * List visitor attribute values
     */
    async analyticsServiceGetAttributeValuesRaw(requestParameters: AnalyticsServiceGetAttributeValuesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetAttributeValuesResponse>> {
        const requestOptions = await this.analyticsServiceGetAttributeValuesRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetAttributeValuesResponseFromJSON(jsonValue));
    }

    /**
     * Returns the individual recorded values of one attribute, most recent first. Intended for free text such as comments.  Requires the `analytics:read` scope.
     * List visitor attribute values
     */
    async analyticsServiceGetAttributeValues(requestParameters: AnalyticsServiceGetAttributeValuesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetAttributeValuesResponse> {
        const response = await this.analyticsServiceGetAttributeValuesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsServiceGetBreakdown without sending the request
     */
    async analyticsServiceGetBreakdownRequestOpts(requestParameters: AnalyticsServiceGetBreakdownRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['getBreakdownRequest'] == null) {
            throw new runtime.RequiredError(
                'getBreakdownRequest',
                'Required parameter "getBreakdownRequest" was null or undefined when calling analyticsServiceGetBreakdown().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["analytics:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["analytics:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/analytics/breakdown`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GetBreakdownRequestToJSON(requestParameters['getBreakdownRequest']),
        };
    }

    /**
     * Returns a ranked breakdown of events by any dimension (browser, platform, device type, country, city, visit type, in-app browser, in-app browser version).  Requires the `analytics:read` scope.
     * Get dimension breakdown
     */
    async analyticsServiceGetBreakdownRaw(requestParameters: AnalyticsServiceGetBreakdownRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetBreakdownResponse>> {
        const requestOptions = await this.analyticsServiceGetBreakdownRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetBreakdownResponseFromJSON(jsonValue));
    }

    /**
     * Returns a ranked breakdown of events by any dimension (browser, platform, device type, country, city, visit type, in-app browser, in-app browser version).  Requires the `analytics:read` scope.
     * Get dimension breakdown
     */
    async analyticsServiceGetBreakdown(requestParameters: AnalyticsServiceGetBreakdownRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetBreakdownResponse> {
        const response = await this.analyticsServiceGetBreakdownRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsServiceGetDeviceDistribution without sending the request
     */
    async analyticsServiceGetDeviceDistributionRequestOpts(requestParameters: AnalyticsServiceGetDeviceDistributionRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['getDeviceDistributionRequest'] == null) {
            throw new runtime.RequiredError(
                'getDeviceDistributionRequest',
                'Required parameter "getDeviceDistributionRequest" was null or undefined when calling analyticsServiceGetDeviceDistribution().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["analytics:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["analytics:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/analytics/devices`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GetDeviceDistributionRequestToJSON(requestParameters['getDeviceDistributionRequest']),
        };
    }

    /**
     * Retrieve event distribution across device types.  Requires the `analytics:read` scope.
     * Get device distribution
     */
    async analyticsServiceGetDeviceDistributionRaw(requestParameters: AnalyticsServiceGetDeviceDistributionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetDeviceDistributionResponse>> {
        const requestOptions = await this.analyticsServiceGetDeviceDistributionRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetDeviceDistributionResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve event distribution across device types.  Requires the `analytics:read` scope.
     * Get device distribution
     */
    async analyticsServiceGetDeviceDistribution(requestParameters: AnalyticsServiceGetDeviceDistributionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetDeviceDistributionResponse> {
        const response = await this.analyticsServiceGetDeviceDistributionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsServiceGetEventsMetric without sending the request
     */
    async analyticsServiceGetEventsMetricRequestOpts(requestParameters: AnalyticsServiceGetEventsMetricRequest): Promise<runtime.RequestOpts> {
        const queryParameters: any = {};

        if (requestParameters['startDate'] != null) {
            queryParameters['startDate'] = (requestParameters['startDate'] as any).toISOString();
        }

        if (requestParameters['endDate'] != null) {
            queryParameters['endDate'] = (requestParameters['endDate'] as any).toISOString();
        }

        if (requestParameters['linkId'] != null) {
            queryParameters['linkId'] = requestParameters['linkId'];
        }

        if (requestParameters['directoryId'] != null) {
            queryParameters['directoryId'] = requestParameters['directoryId'];
        }

        if (requestParameters['tagId'] != null) {
            queryParameters['tagId'] = requestParameters['tagId'];
        }

        if (requestParameters['countries'] != null) {
            queryParameters['countries'] = requestParameters['countries'];
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

        let urlPath = `/v1/metrics/events`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Retrieve aggregated event analytics for the provided time window and optional link filter.  Requires the `analytics:read` scope.
     * Get events metric
     */
    async analyticsServiceGetEventsMetricRaw(requestParameters: AnalyticsServiceGetEventsMetricRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EventsMetric>> {
        const requestOptions = await this.analyticsServiceGetEventsMetricRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EventsMetricFromJSON(jsonValue));
    }

    /**
     * Retrieve aggregated event analytics for the provided time window and optional link filter.  Requires the `analytics:read` scope.
     * Get events metric
     */
    async analyticsServiceGetEventsMetric(requestParameters: AnalyticsServiceGetEventsMetricRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EventsMetric> {
        const response = await this.analyticsServiceGetEventsMetricRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsServiceGetGeoBreakdown without sending the request
     */
    async analyticsServiceGetGeoBreakdownRequestOpts(requestParameters: AnalyticsServiceGetGeoBreakdownRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['getGeoBreakdownRequest'] == null) {
            throw new runtime.RequiredError(
                'getGeoBreakdownRequest',
                'Required parameter "getGeoBreakdownRequest" was null or undefined when calling analyticsServiceGetGeoBreakdown().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["analytics:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["analytics:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/analytics/geo`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GetGeoBreakdownRequestToJSON(requestParameters['getGeoBreakdownRequest']),
        };
    }

    /**
     * Retrieve geographic distribution of events grouped by country or city.  Requires the `analytics:read` scope.
     * Get geographic breakdown
     */
    async analyticsServiceGetGeoBreakdownRaw(requestParameters: AnalyticsServiceGetGeoBreakdownRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetGeoBreakdownResponse>> {
        const requestOptions = await this.analyticsServiceGetGeoBreakdownRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetGeoBreakdownResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve geographic distribution of events grouped by country or city.  Requires the `analytics:read` scope.
     * Get geographic breakdown
     */
    async analyticsServiceGetGeoBreakdown(requestParameters: AnalyticsServiceGetGeoBreakdownRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetGeoBreakdownResponse> {
        const response = await this.analyticsServiceGetGeoBreakdownRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsServiceGetGroupedTimeSeries without sending the request
     */
    async analyticsServiceGetGroupedTimeSeriesRequestOpts(requestParameters: AnalyticsServiceGetGroupedTimeSeriesRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['getGroupedTimeSeriesRequest'] == null) {
            throw new runtime.RequiredError(
                'getGroupedTimeSeriesRequest',
                'Required parameter "getGroupedTimeSeriesRequest" was null or undefined when calling analyticsServiceGetGroupedTimeSeries().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["analytics:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["analytics:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/analytics/timeseries`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GetGroupedTimeSeriesRequestToJSON(requestParameters['getGroupedTimeSeriesRequest']),
        };
    }

    /**
     * Retrieve time-bucketed event counts grouped by a dimension like country, city, device type, or visit type.  Requires the `analytics:read` scope.
     * Get grouped time series
     */
    async analyticsServiceGetGroupedTimeSeriesRaw(requestParameters: AnalyticsServiceGetGroupedTimeSeriesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetGroupedTimeSeriesResponse>> {
        const requestOptions = await this.analyticsServiceGetGroupedTimeSeriesRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetGroupedTimeSeriesResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve time-bucketed event counts grouped by a dimension like country, city, device type, or visit type.  Requires the `analytics:read` scope.
     * Get grouped time series
     */
    async analyticsServiceGetGroupedTimeSeries(requestParameters: AnalyticsServiceGetGroupedTimeSeriesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetGroupedTimeSeriesResponse> {
        const response = await this.analyticsServiceGetGroupedTimeSeriesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsServiceGetHourOfDayDistribution without sending the request
     */
    async analyticsServiceGetHourOfDayDistributionRequestOpts(requestParameters: AnalyticsServiceGetHourOfDayDistributionRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['getHourOfDayDistributionRequest'] == null) {
            throw new runtime.RequiredError(
                'getHourOfDayDistributionRequest',
                'Required parameter "getHourOfDayDistributionRequest" was null or undefined when calling analyticsServiceGetHourOfDayDistribution().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["analytics:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["analytics:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/analytics/hours`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GetHourOfDayDistributionRequestToJSON(requestParameters['getHourOfDayDistributionRequest']),
        };
    }

    /**
     * Retrieve event counts aggregated by hour of day, in the workspace\'s time zone, for identifying peak activity times.  Requires the `analytics:read` scope.
     * Get hour of day distribution
     */
    async analyticsServiceGetHourOfDayDistributionRaw(requestParameters: AnalyticsServiceGetHourOfDayDistributionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetHourOfDayDistributionResponse>> {
        const requestOptions = await this.analyticsServiceGetHourOfDayDistributionRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetHourOfDayDistributionResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve event counts aggregated by hour of day, in the workspace\'s time zone, for identifying peak activity times.  Requires the `analytics:read` scope.
     * Get hour of day distribution
     */
    async analyticsServiceGetHourOfDayDistribution(requestParameters: AnalyticsServiceGetHourOfDayDistributionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetHourOfDayDistributionResponse> {
        const response = await this.analyticsServiceGetHourOfDayDistributionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsServiceGetSharedLocations without sending the request
     */
    async analyticsServiceGetSharedLocationsRequestOpts(requestParameters: AnalyticsServiceGetSharedLocationsRequest): Promise<runtime.RequestOpts> {
        const queryParameters: any = {};

        if (requestParameters['startDate'] != null) {
            queryParameters['startDate'] = (requestParameters['startDate'] as any).toISOString();
        }

        if (requestParameters['endDate'] != null) {
            queryParameters['endDate'] = (requestParameters['endDate'] as any).toISOString();
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['linkId'] != null) {
            queryParameters['linkId'] = requestParameters['linkId'];
        }

        if (requestParameters['directoryId'] != null) {
            queryParameters['directoryId'] = requestParameters['directoryId'];
        }

        if (requestParameters['tagId'] != null) {
            queryParameters['tagId'] = requestParameters['tagId'];
        }

        if (requestParameters['countries'] != null) {
            queryParameters['countries'] = requestParameters['countries'];
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

        let urlPath = `/v1/analytics/shared-locations`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Returns the precise positions visitors shared through a Location request workflow step, newest first, capped at 2000, with the total count. Without startDate and endDate it covers all time.  Requires the `analytics:read` scope.
     * List shared locations
     */
    async analyticsServiceGetSharedLocationsRaw(requestParameters: AnalyticsServiceGetSharedLocationsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetSharedLocationsResponse>> {
        const requestOptions = await this.analyticsServiceGetSharedLocationsRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetSharedLocationsResponseFromJSON(jsonValue));
    }

    /**
     * Returns the precise positions visitors shared through a Location request workflow step, newest first, capped at 2000, with the total count. Without startDate and endDate it covers all time.  Requires the `analytics:read` scope.
     * List shared locations
     */
    async analyticsServiceGetSharedLocations(requestParameters: AnalyticsServiceGetSharedLocationsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetSharedLocationsResponse> {
        const response = await this.analyticsServiceGetSharedLocationsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsServiceGetStepFunnel without sending the request
     */
    async analyticsServiceGetStepFunnelRequestOpts(requestParameters: AnalyticsServiceGetStepFunnelRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['getStepFunnelRequest'] == null) {
            throw new runtime.RequiredError(
                'getStepFunnelRequest',
                'Required parameter "getStepFunnelRequest" was null or undefined when calling analyticsServiceGetStepFunnel().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["analytics:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["analytics:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/analytics/funnel`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GetStepFunnelRequestToJSON(requestParameters['getStepFunnelRequest']),
        };
    }

    /**
     * Returns the workflow steps visitors reached, in distinct visitors, ordered from arrival to exit, with the conversion rate and drop-off at each step.  Requires the `analytics:read` scope.
     * Get workflow step funnel
     */
    async analyticsServiceGetStepFunnelRaw(requestParameters: AnalyticsServiceGetStepFunnelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetStepFunnelResponse>> {
        const requestOptions = await this.analyticsServiceGetStepFunnelRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetStepFunnelResponseFromJSON(jsonValue));
    }

    /**
     * Returns the workflow steps visitors reached, in distinct visitors, ordered from arrival to exit, with the conversion rate and drop-off at each step.  Requires the `analytics:read` scope.
     * Get workflow step funnel
     */
    async analyticsServiceGetStepFunnel(requestParameters: AnalyticsServiceGetStepFunnelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetStepFunnelResponse> {
        const response = await this.analyticsServiceGetStepFunnelRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsServiceGetTopLinks without sending the request
     */
    async analyticsServiceGetTopLinksRequestOpts(requestParameters: AnalyticsServiceGetTopLinksRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['getTopLinksRequest'] == null) {
            throw new runtime.RequiredError(
                'getTopLinksRequest',
                'Required parameter "getTopLinksRequest" was null or undefined when calling analyticsServiceGetTopLinks().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["analytics:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["analytics:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/analytics/top-links`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GetTopLinksRequestToJSON(requestParameters['getTopLinksRequest']),
        };
    }

    /**
     * Retrieve links ranked by event count for identifying best performing QR codes and links.  Requires the `analytics:read` scope.
     * Get top performing links
     */
    async analyticsServiceGetTopLinksRaw(requestParameters: AnalyticsServiceGetTopLinksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetTopLinksResponse>> {
        const requestOptions = await this.analyticsServiceGetTopLinksRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetTopLinksResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve links ranked by event count for identifying best performing QR codes and links.  Requires the `analytics:read` scope.
     * Get top performing links
     */
    async analyticsServiceGetTopLinks(requestParameters: AnalyticsServiceGetTopLinksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetTopLinksResponse> {
        const response = await this.analyticsServiceGetTopLinksRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsServiceGetTrafficSplitResults without sending the request
     */
    async analyticsServiceGetTrafficSplitResultsRequestOpts(requestParameters: AnalyticsServiceGetTrafficSplitResultsRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['getTrafficSplitResultsRequest'] == null) {
            throw new runtime.RequiredError(
                'getTrafficSplitResultsRequest',
                'Required parameter "getTrafficSplitResultsRequest" was null or undefined when calling analyticsServiceGetTrafficSplitResults().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["analytics:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["analytics:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/analytics/traffic-split`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GetTrafficSplitResultsRequestToJSON(requestParameters['getTrafficSplitResultsRequest']),
        };
    }

    /**
     * Returns visits and visitors per variant of a traffic split step, leaving out bots, link previews and automated browsers, with whether there is enough data (100 per variant) and a sample ratio mismatch warning. A sticky split, the default, compares visitors against the weights. With sticky off every visit is assigned afresh, so it compares visits and one person may appear under several variants. It does not test significance or name a winner.  Requires the `analytics:read` scope.
     * Get traffic split results
     */
    async analyticsServiceGetTrafficSplitResultsRaw(requestParameters: AnalyticsServiceGetTrafficSplitResultsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetTrafficSplitResultsResponse>> {
        const requestOptions = await this.analyticsServiceGetTrafficSplitResultsRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetTrafficSplitResultsResponseFromJSON(jsonValue));
    }

    /**
     * Returns visits and visitors per variant of a traffic split step, leaving out bots, link previews and automated browsers, with whether there is enough data (100 per variant) and a sample ratio mismatch warning. A sticky split, the default, compares visitors against the weights. With sticky off every visit is assigned afresh, so it compares visits and one person may appear under several variants. It does not test significance or name a winner.  Requires the `analytics:read` scope.
     * Get traffic split results
     */
    async analyticsServiceGetTrafficSplitResults(requestParameters: AnalyticsServiceGetTrafficSplitResultsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetTrafficSplitResultsResponse> {
        const response = await this.analyticsServiceGetTrafficSplitResultsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsServiceGetVisitorTrends without sending the request
     */
    async analyticsServiceGetVisitorTrendsRequestOpts(requestParameters: AnalyticsServiceGetVisitorTrendsRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['getVisitorTrendsRequest'] == null) {
            throw new runtime.RequiredError(
                'getVisitorTrendsRequest',
                'Required parameter "getVisitorTrendsRequest" was null or undefined when calling analyticsServiceGetVisitorTrends().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["analytics:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["analytics:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/analytics/visitors`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GetVisitorTrendsRequestToJSON(requestParameters['getVisitorTrendsRequest']),
        };
    }

    /**
     * Retrieve new vs returning visitor counts over time.  Requires the `analytics:read` scope.
     * Get visitor trends
     */
    async analyticsServiceGetVisitorTrendsRaw(requestParameters: AnalyticsServiceGetVisitorTrendsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetVisitorTrendsResponse>> {
        const requestOptions = await this.analyticsServiceGetVisitorTrendsRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetVisitorTrendsResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve new vs returning visitor counts over time.  Requires the `analytics:read` scope.
     * Get visitor trends
     */
    async analyticsServiceGetVisitorTrends(requestParameters: AnalyticsServiceGetVisitorTrendsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetVisitorTrendsResponse> {
        const response = await this.analyticsServiceGetVisitorTrendsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsServiceGetWorkspaceMetric without sending the request
     */
    async analyticsServiceGetWorkspaceMetricRequestOpts(): Promise<runtime.RequestOpts> {
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

        let urlPath = `/v1/metrics/workspace`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Return high-level workspace totals covering members, links, and activity volume.  Requires the `analytics:read` scope.
     * Get workspace metric
     */
    async analyticsServiceGetWorkspaceMetricRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<WorkspaceMetric>> {
        const requestOptions = await this.analyticsServiceGetWorkspaceMetricRequestOpts();
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WorkspaceMetricFromJSON(jsonValue));
    }

    /**
     * Return high-level workspace totals covering members, links, and activity volume.  Requires the `analytics:read` scope.
     * Get workspace metric
     */
    async analyticsServiceGetWorkspaceMetric(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<WorkspaceMetric> {
        const response = await this.analyticsServiceGetWorkspaceMetricRaw(initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for analyticsServiceListVisitorCountries without sending the request
     */
    async analyticsServiceListVisitorCountriesRequestOpts(): Promise<runtime.RequestOpts> {
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

        let urlPath = `/v1/analytics/visitor-countries`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Every country the workspace\'s visits came from, all time, most visited first, without counts. Meant for country filters. For visit numbers per country, use the geo breakdown.  Requires the `analytics:read` scope.
     * List visitor countries
     */
    async analyticsServiceListVisitorCountriesRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListVisitorCountriesResponse>> {
        const requestOptions = await this.analyticsServiceListVisitorCountriesRequestOpts();
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ListVisitorCountriesResponseFromJSON(jsonValue));
    }

    /**
     * Every country the workspace\'s visits came from, all time, most visited first, without counts. Meant for country filters. For visit numbers per country, use the geo breakdown.  Requires the `analytics:read` scope.
     * List visitor countries
     */
    async analyticsServiceListVisitorCountries(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListVisitorCountriesResponse> {
        const response = await this.analyticsServiceListVisitorCountriesRaw(initOverrides);
        return await response.value();
    }

}
