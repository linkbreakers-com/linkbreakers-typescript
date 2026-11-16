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
  ErrorResponse,
  PublicWorkspace,
  UpdateWorkspaceRequest,
  Workspace,
} from '../models/index';
import {
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    PublicWorkspaceFromJSON,
    PublicWorkspaceToJSON,
    UpdateWorkspaceRequestFromJSON,
    UpdateWorkspaceRequestToJSON,
    WorkspaceFromJSON,
    WorkspaceToJSON,
} from '../models/index';

export interface WorkspacesServiceGetPublicRequest {
    slug: string;
}

export interface WorkspacesServiceUpdateRequest {
    updateWorkspaceRequest: UpdateWorkspaceRequest;
    idempotencyKey?: string;
}

/**
 * WorkspacesApi - interface
 * 
 * @export
 * @interface WorkspacesApiInterface
 */
export interface WorkspacesApiInterface {
    /**
     * Creates request options for workspacesServiceDelete without sending the request
     * @throws {RequiredError}
     * @memberof WorkspacesApiInterface
     */
    workspacesServiceDeleteRequestOpts(): Promise<runtime.RequestOpts>;

    /**
     * Soft-delete the workspace associated with the authenticated member\'s session. This operation can be reversed by contacting support.  Requires the `workspace:write` scope.
     * @summary Delete workspace
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WorkspacesApiInterface
     */
    workspacesServiceDeleteRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>>;

    /**
     * Soft-delete the workspace associated with the authenticated member\'s session. This operation can be reversed by contacting support.  Requires the `workspace:write` scope.
     * Delete workspace
     */
    workspacesServiceDelete(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object>;

    /**
     * Creates request options for workspacesServiceGet without sending the request
     * @throws {RequiredError}
     * @memberof WorkspacesApiInterface
     */
    workspacesServiceGetRequestOpts(): Promise<runtime.RequestOpts>;

    /**
     * Return the workspace associated with the authenticated member\'s current session.  Requires the `workspace:read` scope.
     * @summary Get my workspace
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WorkspacesApiInterface
     */
    workspacesServiceGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Workspace>>;

    /**
     * Return the workspace associated with the authenticated member\'s current session.  Requires the `workspace:read` scope.
     * Get my workspace
     */
    workspacesServiceGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Workspace>;

    /**
     * Creates request options for workspacesServiceGetPublic without sending the request
     * @param {string} slug Workspace slug to retrieve
     * @throws {RequiredError}
     * @memberof WorkspacesApiInterface
     */
    workspacesServiceGetPublicRequestOpts(requestParameters: WorkspacesServiceGetPublicRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieve public information about a workspace that has been published.
     * @summary Get a public workspace by slug
     * @param {string} slug Workspace slug to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WorkspacesApiInterface
     */
    workspacesServiceGetPublicRaw(requestParameters: WorkspacesServiceGetPublicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PublicWorkspace>>;

    /**
     * Retrieve public information about a workspace that has been published.
     * Get a public workspace by slug
     */
    workspacesServiceGetPublic(requestParameters: WorkspacesServiceGetPublicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PublicWorkspace>;

    /**
     * Creates request options for workspacesServiceUpdate without sending the request
     * @param {UpdateWorkspaceRequest} updateWorkspaceRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof WorkspacesApiInterface
     */
    workspacesServiceUpdateRequestOpts(requestParameters: WorkspacesServiceUpdateRequest): Promise<runtime.RequestOpts>;

    /**
     * Modify workspace settings such as the display name and MFA enforcement policy.  Requires the `workspace:write` scope.
     * @summary Update a workspace
     * @param {UpdateWorkspaceRequest} updateWorkspaceRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WorkspacesApiInterface
     */
    workspacesServiceUpdateRaw(requestParameters: WorkspacesServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Workspace>>;

    /**
     * Modify workspace settings such as the display name and MFA enforcement policy.  Requires the `workspace:write` scope.
     * Update a workspace
     */
    workspacesServiceUpdate(requestParameters: WorkspacesServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Workspace>;

}

/**
 * 
 */
export class WorkspacesApi extends runtime.BaseAPI implements WorkspacesApiInterface {

    /**
     * Creates request options for workspacesServiceDelete without sending the request
     */
    async workspacesServiceDeleteRequestOpts(): Promise<runtime.RequestOpts> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["workspace:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["workspace:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/workspace`;

        return {
            path: urlPath,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Soft-delete the workspace associated with the authenticated member\'s session. This operation can be reversed by contacting support.  Requires the `workspace:write` scope.
     * Delete workspace
     */
    async workspacesServiceDeleteRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        const requestOptions = await this.workspacesServiceDeleteRequestOpts();
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Soft-delete the workspace associated with the authenticated member\'s session. This operation can be reversed by contacting support.  Requires the `workspace:write` scope.
     * Delete workspace
     */
    async workspacesServiceDelete(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.workspacesServiceDeleteRaw(initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for workspacesServiceGet without sending the request
     */
    async workspacesServiceGetRequestOpts(): Promise<runtime.RequestOpts> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["workspace:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["workspace:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/workspace`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Return the workspace associated with the authenticated member\'s current session.  Requires the `workspace:read` scope.
     * Get my workspace
     */
    async workspacesServiceGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Workspace>> {
        const requestOptions = await this.workspacesServiceGetRequestOpts();
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WorkspaceFromJSON(jsonValue));
    }

    /**
     * Return the workspace associated with the authenticated member\'s current session.  Requires the `workspace:read` scope.
     * Get my workspace
     */
    async workspacesServiceGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Workspace> {
        const response = await this.workspacesServiceGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for workspacesServiceGetPublic without sending the request
     */
    async workspacesServiceGetPublicRequestOpts(requestParameters: WorkspacesServiceGetPublicRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['slug'] == null) {
            throw new runtime.RequiredError(
                'slug',
                'Required parameter "slug" was null or undefined when calling workspacesServiceGetPublic().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/v1/public/workspaces/{slug}`;
        urlPath = urlPath.replace(`{${"slug"}}`, encodeURIComponent(String(requestParameters['slug'])));

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Retrieve public information about a workspace that has been published.
     * Get a public workspace by slug
     */
    async workspacesServiceGetPublicRaw(requestParameters: WorkspacesServiceGetPublicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PublicWorkspace>> {
        const requestOptions = await this.workspacesServiceGetPublicRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PublicWorkspaceFromJSON(jsonValue));
    }

    /**
     * Retrieve public information about a workspace that has been published.
     * Get a public workspace by slug
     */
    async workspacesServiceGetPublic(requestParameters: WorkspacesServiceGetPublicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PublicWorkspace> {
        const response = await this.workspacesServiceGetPublicRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for workspacesServiceUpdate without sending the request
     */
    async workspacesServiceUpdateRequestOpts(requestParameters: WorkspacesServiceUpdateRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['updateWorkspaceRequest'] == null) {
            throw new runtime.RequiredError(
                'updateWorkspaceRequest',
                'Required parameter "updateWorkspaceRequest" was null or undefined when calling workspacesServiceUpdate().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["workspace:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["workspace:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/workspace`;

        return {
            path: urlPath,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateWorkspaceRequestToJSON(requestParameters['updateWorkspaceRequest']),
        };
    }

    /**
     * Modify workspace settings such as the display name and MFA enforcement policy.  Requires the `workspace:write` scope.
     * Update a workspace
     */
    async workspacesServiceUpdateRaw(requestParameters: WorkspacesServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Workspace>> {
        const requestOptions = await this.workspacesServiceUpdateRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WorkspaceFromJSON(jsonValue));
    }

    /**
     * Modify workspace settings such as the display name and MFA enforcement policy.  Requires the `workspace:write` scope.
     * Update a workspace
     */
    async workspacesServiceUpdate(requestParameters: WorkspacesServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Workspace> {
        const response = await this.workspacesServiceUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
