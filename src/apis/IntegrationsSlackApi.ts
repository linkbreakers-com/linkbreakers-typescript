/* tslint:disable */
/* eslint-disable */
/**
 * Linkbreakers API
 * The Linkbreakers REST API: links, QR codes, workflows, visitors and analytics, as JSON over HTTPS. Send a workspace API token as `Authorization: Bearer <token>`.  ## Entry points  `GET https://api.linkbreakers.com/` and `GET https://api.linkbreakers.com/v1` answer without credentials with the API\'s name, version and links. This document is served at `https://api.linkbreakers.com/openapi.json`.  ## Rate limits  Every response describes where the caller stands in the IETF `RateLimit-Policy` and `RateLimit` header fields (draft-ietf-httpapi-ratelimit-headers), and in `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` and `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` (a Unix timestamp) for clients that read those. A request past the limit gets `429 Too Many Requests` with `Retry-After` in seconds.  - Workspace API token: 720 requests per 60 seconds, per token. - Dashboard session or OAuth token: 600 requests per 60 seconds, per token. - No credentials: 300 requests per 60 seconds, per client IP.  Each plan also includes a number of API calls per billing cycle. Past it, calls answer `429` with the code `MAX_PUBLIC_API_QUERIED_REACHED` until the cycle renews or the plan changes.  ## Pagination  Every list pages with opaque cursors (AIP-158). Pass `pageSize`, then send the `nextPageToken` of each response back as `pageToken` (or its alias `cursor`) to get the next page. An empty or absent `nextPageToken` means the list is complete. Each list operation describes this in `x-pagination`.  ## Batches and background jobs  `POST /v1/links/bulk` creates up to 250 links in one transactional request; `POST /v1/links/batch` takes the same links as a bare JSON array. `POST /v1/links/bulk/jobs` accepts the same batch and answers `202 Accepted` at once with a job and a `Location` header; poll `GET /v1/jobs/{id}` until `status` is `JOB_STATUS_SUCCEEDED` (the created link ids are in `linksBulkCreate.linkIds`) or `JOB_STATUS_FAILED` (`error` says why, and nothing was created). Jobs can be read for 24 hours after they finish.  ## Paused workspaces  A free workspace whose members have not verified any email address is paused 7 days after sign-up. Its calls then answer `403` with the code `WORKSPACE_UNVERIFIED` and change nothing; QR codes and links keep working for visitors. To lift the pause, ask the workspace owner to verify their email: `POST /v1/members/email-verification` sends the verification email again, and works while the workspace is paused. `unverifiedPauseAt` on the workspace says when the pause starts.  ## Versioning and deprecation  The version is in the path: every operation lives under `/v1`. Within a version, changes are additive only: new operations, new optional request fields, new response fields and new enum values. Clients should ignore fields and enum values they do not know. Anything that would break an existing client ships under a new path version instead.  An operation is retired in two steps. First it is deprecated: it keeps working, is flagged `deprecated: true` in this document, and every response carries a `Deprecation` header field (RFC 9745) with the time it was deprecated and a `Link` with `rel=\"deprecation\"` to the policy. Then, at least 180 days later, it may be removed; that date is announced in advance in a `Sunset` header field (RFC 8594) and as `x-sunset` on the operation. The full policy: https://linkbreakers.com/help/article/api-versioning-and-deprecation-policy  A renamed operation keeps answering its former path while clients still call it, until that path\'s sunset at the latest: a former path no client calls for 14 days is removed. Responses on a former path carry the same `Deprecation`, `Sunset` and `Link` header fields; this document lists only the current path, and the policy lists the former paths that still answer.  ## Idempotent retries  Every POST, PUT and PATCH accepts an optional `Idempotency-Key` header (draft-ietf-httpapi-idempotency-key-header). Send a new unique value, such as a UUID, with each logical request and reuse it only to retry that request. A retry with the same key and the same request returns the first response, marked `Idempotent-Replayed: true`, instead of running again. Keys are scoped to the token and kept for 24 hours. The same key with a different request is refused with `422`, and a retry while the first request is still running gets `409` with `Retry-After`. Server errors (5xx) and refusals such as 401, 403 and 429 are not stored, so retrying them runs the request again.  ## Identifying your client  Send a `Linkbreakers-Client` request header saying which client made the call: `<client>/<version> (<details>)`, for example `my-integration/1.2.0 (python 3.12; linux)`. The official SDKs, the CLI and the MCP bridge set it for you, as `sdk-python/2.3.1 (python 3.12.4; linux)` or `cli/1.4.0 (darwin arm64)`. It is optional and changes nothing about how a request is handled; it tells us which clients and versions are in use, so we know what can be retired and what to fix first. Keep the details short and free of personal data. Browsers may send it too: it is allowed by CORS.
 *
 * The version of the OpenAPI document: 1.202.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  ErrorResponse,
  GetSlackIntegrationResponse,
  ListSlackChannelsResponse,
  TestSlackIntegrationResponse,
  UpdateSlackIntegrationRequest,
  UpdateSlackIntegrationResponse,
} from '../models/index';
import {
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    GetSlackIntegrationResponseFromJSON,
    GetSlackIntegrationResponseToJSON,
    ListSlackChannelsResponseFromJSON,
    ListSlackChannelsResponseToJSON,
    TestSlackIntegrationResponseFromJSON,
    TestSlackIntegrationResponseToJSON,
    UpdateSlackIntegrationRequestFromJSON,
    UpdateSlackIntegrationRequestToJSON,
    UpdateSlackIntegrationResponseFromJSON,
    UpdateSlackIntegrationResponseToJSON,
} from '../models/index';

export interface SlackIntegrationsServiceTestRequest {
    body: object;
    idempotencyKey?: string;
}

export interface SlackIntegrationsServiceUpdateRequest {
    updateSlackIntegrationRequest: UpdateSlackIntegrationRequest;
    idempotencyKey?: string;
}

/**
 * IntegrationsSlackApi - interface
 * 
 * @export
 * @interface IntegrationsSlackApiInterface
 */
export interface IntegrationsSlackApiInterface {
    /**
     * Creates request options for slackIntegrationsServiceDelete without sending the request
     * @throws {RequiredError}
     * @memberof IntegrationsSlackApiInterface
     */
    slackIntegrationsServiceDeleteRequestOpts(): Promise<runtime.RequestOpts>;

    /**
     * Disconnect and remove the Slack integration from the workspace.  Requires the `integrations:write` scope.
     * @summary Disconnect Slack integration
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IntegrationsSlackApiInterface
     */
    slackIntegrationsServiceDeleteRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>>;

    /**
     * Disconnect and remove the Slack integration from the workspace.  Requires the `integrations:write` scope.
     * Disconnect Slack integration
     */
    slackIntegrationsServiceDelete(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object>;

    /**
     * Creates request options for slackIntegrationsServiceGet without sending the request
     * @throws {RequiredError}
     * @memberof IntegrationsSlackApiInterface
     */
    slackIntegrationsServiceGetRequestOpts(): Promise<runtime.RequestOpts>;

    /**
     * Retrieve the Slack integration configuration for the workspace.  Requires the `integrations:read` scope.
     * @summary Get Slack integration
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IntegrationsSlackApiInterface
     */
    slackIntegrationsServiceGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetSlackIntegrationResponse>>;

    /**
     * Retrieve the Slack integration configuration for the workspace.  Requires the `integrations:read` scope.
     * Get Slack integration
     */
    slackIntegrationsServiceGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetSlackIntegrationResponse>;

    /**
     * Creates request options for slackIntegrationsServiceListChannels without sending the request
     * @throws {RequiredError}
     * @memberof IntegrationsSlackApiInterface
     */
    slackIntegrationsServiceListChannelsRequestOpts(): Promise<runtime.RequestOpts>;

    /**
     * List available Slack channels the bot can send notifications to.  Requires the `integrations:read` scope.
     * @summary List Slack channels
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IntegrationsSlackApiInterface
     */
    slackIntegrationsServiceListChannelsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListSlackChannelsResponse>>;

    /**
     * List available Slack channels the bot can send notifications to.  Requires the `integrations:read` scope.
     * List Slack channels
     */
    slackIntegrationsServiceListChannels(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListSlackChannelsResponse>;

    /**
     * Creates request options for slackIntegrationsServiceTest without sending the request
     * @param {object} body 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof IntegrationsSlackApiInterface
     */
    slackIntegrationsServiceTestRequestOpts(requestParameters: SlackIntegrationsServiceTestRequest): Promise<runtime.RequestOpts>;

    /**
     * Send a test notification to verify the Slack integration is working.  Requires the `integrations:write` scope.
     * @summary Test Slack integration
     * @param {object} body 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IntegrationsSlackApiInterface
     */
    slackIntegrationsServiceTestRaw(requestParameters: SlackIntegrationsServiceTestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TestSlackIntegrationResponse>>;

    /**
     * Send a test notification to verify the Slack integration is working.  Requires the `integrations:write` scope.
     * Test Slack integration
     */
    slackIntegrationsServiceTest(requestParameters: SlackIntegrationsServiceTestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TestSlackIntegrationResponse>;

    /**
     * Creates request options for slackIntegrationsServiceUpdate without sending the request
     * @param {UpdateSlackIntegrationRequest} updateSlackIntegrationRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof IntegrationsSlackApiInterface
     */
    slackIntegrationsServiceUpdateRequestOpts(requestParameters: SlackIntegrationsServiceUpdateRequest): Promise<runtime.RequestOpts>;

    /**
     * Update the Slack integration configuration (channel, triggers, status).  Requires the `integrations:write` scope.
     * @summary Update Slack integration
     * @param {UpdateSlackIntegrationRequest} updateSlackIntegrationRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IntegrationsSlackApiInterface
     */
    slackIntegrationsServiceUpdateRaw(requestParameters: SlackIntegrationsServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdateSlackIntegrationResponse>>;

    /**
     * Update the Slack integration configuration (channel, triggers, status).  Requires the `integrations:write` scope.
     * Update Slack integration
     */
    slackIntegrationsServiceUpdate(requestParameters: SlackIntegrationsServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdateSlackIntegrationResponse>;

}

/**
 * 
 */
export class IntegrationsSlackApi extends runtime.BaseAPI implements IntegrationsSlackApiInterface {

    /**
     * Creates request options for slackIntegrationsServiceDelete without sending the request
     */
    async slackIntegrationsServiceDeleteRequestOpts(): Promise<runtime.RequestOpts> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["integrations:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["integrations:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/slack-integrations`;

        return {
            path: urlPath,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Disconnect and remove the Slack integration from the workspace.  Requires the `integrations:write` scope.
     * Disconnect Slack integration
     */
    async slackIntegrationsServiceDeleteRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        const requestOptions = await this.slackIntegrationsServiceDeleteRequestOpts();
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Disconnect and remove the Slack integration from the workspace.  Requires the `integrations:write` scope.
     * Disconnect Slack integration
     */
    async slackIntegrationsServiceDelete(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.slackIntegrationsServiceDeleteRaw(initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for slackIntegrationsServiceGet without sending the request
     */
    async slackIntegrationsServiceGetRequestOpts(): Promise<runtime.RequestOpts> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["integrations:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["integrations:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/slack-integrations`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Retrieve the Slack integration configuration for the workspace.  Requires the `integrations:read` scope.
     * Get Slack integration
     */
    async slackIntegrationsServiceGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetSlackIntegrationResponse>> {
        const requestOptions = await this.slackIntegrationsServiceGetRequestOpts();
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetSlackIntegrationResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve the Slack integration configuration for the workspace.  Requires the `integrations:read` scope.
     * Get Slack integration
     */
    async slackIntegrationsServiceGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetSlackIntegrationResponse> {
        const response = await this.slackIntegrationsServiceGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for slackIntegrationsServiceListChannels without sending the request
     */
    async slackIntegrationsServiceListChannelsRequestOpts(): Promise<runtime.RequestOpts> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["integrations:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["integrations:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/slack-integrations/channels`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * List available Slack channels the bot can send notifications to.  Requires the `integrations:read` scope.
     * List Slack channels
     */
    async slackIntegrationsServiceListChannelsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListSlackChannelsResponse>> {
        const requestOptions = await this.slackIntegrationsServiceListChannelsRequestOpts();
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ListSlackChannelsResponseFromJSON(jsonValue));
    }

    /**
     * List available Slack channels the bot can send notifications to.  Requires the `integrations:read` scope.
     * List Slack channels
     */
    async slackIntegrationsServiceListChannels(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListSlackChannelsResponse> {
        const response = await this.slackIntegrationsServiceListChannelsRaw(initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for slackIntegrationsServiceTest without sending the request
     */
    async slackIntegrationsServiceTestRequestOpts(requestParameters: SlackIntegrationsServiceTestRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling slackIntegrationsServiceTest().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["integrations:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["integrations:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/slack-integrations/test`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['body'] as any,
        };
    }

    /**
     * Send a test notification to verify the Slack integration is working.  Requires the `integrations:write` scope.
     * Test Slack integration
     */
    async slackIntegrationsServiceTestRaw(requestParameters: SlackIntegrationsServiceTestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TestSlackIntegrationResponse>> {
        const requestOptions = await this.slackIntegrationsServiceTestRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TestSlackIntegrationResponseFromJSON(jsonValue));
    }

    /**
     * Send a test notification to verify the Slack integration is working.  Requires the `integrations:write` scope.
     * Test Slack integration
     */
    async slackIntegrationsServiceTest(requestParameters: SlackIntegrationsServiceTestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TestSlackIntegrationResponse> {
        const response = await this.slackIntegrationsServiceTestRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for slackIntegrationsServiceUpdate without sending the request
     */
    async slackIntegrationsServiceUpdateRequestOpts(requestParameters: SlackIntegrationsServiceUpdateRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['updateSlackIntegrationRequest'] == null) {
            throw new runtime.RequiredError(
                'updateSlackIntegrationRequest',
                'Required parameter "updateSlackIntegrationRequest" was null or undefined when calling slackIntegrationsServiceUpdate().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["integrations:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["integrations:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/slack-integrations`;

        return {
            path: urlPath,
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateSlackIntegrationRequestToJSON(requestParameters['updateSlackIntegrationRequest']),
        };
    }

    /**
     * Update the Slack integration configuration (channel, triggers, status).  Requires the `integrations:write` scope.
     * Update Slack integration
     */
    async slackIntegrationsServiceUpdateRaw(requestParameters: SlackIntegrationsServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdateSlackIntegrationResponse>> {
        const requestOptions = await this.slackIntegrationsServiceUpdateRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UpdateSlackIntegrationResponseFromJSON(jsonValue));
    }

    /**
     * Update the Slack integration configuration (channel, triggers, status).  Requires the `integrations:write` scope.
     * Update Slack integration
     */
    async slackIntegrationsServiceUpdate(requestParameters: SlackIntegrationsServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdateSlackIntegrationResponse> {
        const response = await this.slackIntegrationsServiceUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
