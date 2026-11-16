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
  ErrorResponse,
  InviteMemberRequest,
  ListResponse,
  Member,
  MembersServiceUpdateBody,
  RequestEmailVerificationRequest,
} from '../models/index';
import {
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    InviteMemberRequestFromJSON,
    InviteMemberRequestToJSON,
    ListResponseFromJSON,
    ListResponseToJSON,
    MemberFromJSON,
    MemberToJSON,
    MembersServiceUpdateBodyFromJSON,
    MembersServiceUpdateBodyToJSON,
    RequestEmailVerificationRequestFromJSON,
    RequestEmailVerificationRequestToJSON,
} from '../models/index';

export interface MembersServiceAllowAccessRequest {
    id: string;
    body: object;
    idempotencyKey?: string;
}

export interface MembersServiceDeleteRequest {
    id: string;
}

export interface MembersServiceForceSignoutRequest {
    id: string;
    body: object;
    idempotencyKey?: string;
}

export interface MembersServiceGetRequest {
    id: string;
}

export interface MembersServiceInviteRequest {
    inviteMemberRequest: InviteMemberRequest;
    idempotencyKey?: string;
}

export interface MembersServiceListRequest {
    pageSize?: number;
    pageToken?: string;
    cursor?: string;
}

export interface MembersServiceRequestEmailVerificationRequest {
    requestEmailVerificationRequest: RequestEmailVerificationRequest;
    idempotencyKey?: string;
}

export interface MembersServiceRevokeAccessRequest {
    id: string;
    body: object;
    idempotencyKey?: string;
}

export interface MembersServiceUpdateRequest {
    id: string;
    membersServiceUpdateBody: MembersServiceUpdateBody;
    idempotencyKey?: string;
}

/**
 * MembersApi - interface
 * 
 * @export
 * @interface MembersApiInterface
 */
export interface MembersApiInterface {
    /**
     * Creates request options for membersServiceAllowAccess without sending the request
     * @param {string} id Member identifier (UUID) whose access should be restored
     * @param {object} body 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof MembersApiInterface
     */
    membersServiceAllowAccessRequestOpts(requestParameters: MembersServiceAllowAccessRequest): Promise<runtime.RequestOpts>;

    /**
     * Restore workspace access for a previously suspended member.  Requires the `members:write` scope.
     * @summary Allow access for a member
     * @param {string} id Member identifier (UUID) whose access should be restored
     * @param {object} body 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembersApiInterface
     */
    membersServiceAllowAccessRaw(requestParameters: MembersServiceAllowAccessRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Member>>;

    /**
     * Restore workspace access for a previously suspended member.  Requires the `members:write` scope.
     * Allow access for a member
     */
    membersServiceAllowAccess(requestParameters: MembersServiceAllowAccessRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Member>;

    /**
     * Creates request options for membersServiceDelete without sending the request
     * @param {string} id Member identifier (UUID) to delete
     * @throws {RequiredError}
     * @memberof MembersApiInterface
     */
    membersServiceDeleteRequestOpts(requestParameters: MembersServiceDeleteRequest): Promise<runtime.RequestOpts>;

    /**
     * Permanently remove a member from the workspace roster.  Requires the `members:write` scope.
     * @summary Delete a member
     * @param {string} id Member identifier (UUID) to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembersApiInterface
     */
    membersServiceDeleteRaw(requestParameters: MembersServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>>;

    /**
     * Permanently remove a member from the workspace roster.  Requires the `members:write` scope.
     * Delete a member
     */
    membersServiceDelete(requestParameters: MembersServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object>;

    /**
     * Creates request options for membersServiceForceSignout without sending the request
     * @param {string} id Member identifier (UUID) to sign out of all sessions
     * @param {object} body 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof MembersApiInterface
     */
    membersServiceForceSignoutRequestOpts(requestParameters: MembersServiceForceSignoutRequest): Promise<runtime.RequestOpts>;

    /**
     * Terminate all active sessions for the specified member.  Requires the `members:write` scope.
     * @summary Force a member to sign out
     * @param {string} id Member identifier (UUID) to sign out of all sessions
     * @param {object} body 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembersApiInterface
     */
    membersServiceForceSignoutRaw(requestParameters: MembersServiceForceSignoutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Member>>;

    /**
     * Terminate all active sessions for the specified member.  Requires the `members:write` scope.
     * Force a member to sign out
     */
    membersServiceForceSignout(requestParameters: MembersServiceForceSignoutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Member>;

    /**
     * Creates request options for membersServiceGet without sending the request
     * @param {string} id Member identifier (UUID) to retrieve
     * @throws {RequiredError}
     * @memberof MembersApiInterface
     */
    membersServiceGetRequestOpts(requestParameters: MembersServiceGetRequest): Promise<runtime.RequestOpts>;

    /**
     * Fetch a single workspace member by the provided identifier.  Requires the `members:read` scope.
     * @summary Get a member by ID
     * @param {string} id Member identifier (UUID) to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembersApiInterface
     */
    membersServiceGetRaw(requestParameters: MembersServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Member>>;

    /**
     * Fetch a single workspace member by the provided identifier.  Requires the `members:read` scope.
     * Get a member by ID
     */
    membersServiceGet(requestParameters: MembersServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Member>;

    /**
     * Creates request options for membersServiceInvite without sending the request
     * @param {InviteMemberRequest} inviteMemberRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof MembersApiInterface
     */
    membersServiceInviteRequestOpts(requestParameters: MembersServiceInviteRequest): Promise<runtime.RequestOpts>;

    /**
     * Create a pending member and dispatch an invitation email. A person who already has a Linkbreakers account is added to the workspace right away and told by email; inviting someone already in the workspace fails with MEMBER_ALREADY_IN_WORKSPACE.  Requires the `members:write` scope.
     * @summary Invite a new member
     * @param {InviteMemberRequest} inviteMemberRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembersApiInterface
     */
    membersServiceInviteRaw(requestParameters: MembersServiceInviteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Member>>;

    /**
     * Create a pending member and dispatch an invitation email. A person who already has a Linkbreakers account is added to the workspace right away and told by email; inviting someone already in the workspace fails with MEMBER_ALREADY_IN_WORKSPACE.  Requires the `members:write` scope.
     * Invite a new member
     */
    membersServiceInvite(requestParameters: MembersServiceInviteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Member>;

    /**
     * Creates request options for membersServiceList without sending the request
     * @param {number} [pageSize] Maximum number of members to return. Defaults to 100, capped at 1000.
     * @param {string} [pageToken] Cursor from a previous response\&#39;s nextPageToken. Empty starts at the first page. Pages are ordered by (createdAt, id), which never change, so a record cannot move between pages while a client is walking them.
     * @param {string} [cursor] Opaque cursor from the previous page\&#39;s nextPageToken. Same as pageToken; when both are sent, pageToken wins.
     * @throws {RequiredError}
     * @memberof MembersApiInterface
     */
    membersServiceListRequestOpts(requestParameters: MembersServiceListRequest): Promise<runtime.RequestOpts>;

    /**
     * Retrieve a paginated list of members in the current workspace.  Requires the `members:read` scope.
     * @summary List members
     * @param {number} [pageSize] Maximum number of members to return. Defaults to 100, capped at 1000.
     * @param {string} [pageToken] Cursor from a previous response\&#39;s nextPageToken. Empty starts at the first page. Pages are ordered by (createdAt, id), which never change, so a record cannot move between pages while a client is walking them.
     * @param {string} [cursor] Opaque cursor from the previous page\&#39;s nextPageToken. Same as pageToken; when both are sent, pageToken wins.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembersApiInterface
     */
    membersServiceListRaw(requestParameters: MembersServiceListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListResponse>>;

    /**
     * Retrieve a paginated list of members in the current workspace.  Requires the `members:read` scope.
     * List members
     */
    membersServiceList(requestParameters: MembersServiceListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListResponse>;

    /**
     * Creates request options for membersServiceRequestEmailVerification without sending the request
     * @param {RequestEmailVerificationRequest} requestEmailVerificationRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof MembersApiInterface
     */
    membersServiceRequestEmailVerificationRequestOpts(requestParameters: MembersServiceRequestEmailVerificationRequest): Promise<runtime.RequestOpts>;

    /**
     * Sends the verification email again to a member of the workspace whose email address is not verified yet. Pass the member\'s email address.  A free workspace with no verified address is paused 7 days after sign-up: its calls answer `WORKSPACE_UNVERIFIED` until a member opens the link in that email. Verifying one member\'s address, usually the owner\'s, lifts the pause for the whole workspace. This operation keeps working while the workspace is paused.  The address must belong to a member of the workspace. One email per address per minute, and 5 per day.  Requires the `members:write` scope.
     * @summary Resend a member\'s verification email
     * @param {RequestEmailVerificationRequest} requestEmailVerificationRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembersApiInterface
     */
    membersServiceRequestEmailVerificationRaw(requestParameters: MembersServiceRequestEmailVerificationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>>;

    /**
     * Sends the verification email again to a member of the workspace whose email address is not verified yet. Pass the member\'s email address.  A free workspace with no verified address is paused 7 days after sign-up: its calls answer `WORKSPACE_UNVERIFIED` until a member opens the link in that email. Verifying one member\'s address, usually the owner\'s, lifts the pause for the whole workspace. This operation keeps working while the workspace is paused.  The address must belong to a member of the workspace. One email per address per minute, and 5 per day.  Requires the `members:write` scope.
     * Resend a member\'s verification email
     */
    membersServiceRequestEmailVerification(requestParameters: MembersServiceRequestEmailVerificationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any>;

    /**
     * Creates request options for membersServiceRevokeAccess without sending the request
     * @param {string} id Member identifier (UUID) whose access should be suspended
     * @param {object} body 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof MembersApiInterface
     */
    membersServiceRevokeAccessRequestOpts(requestParameters: MembersServiceRevokeAccessRequest): Promise<runtime.RequestOpts>;

    /**
     * Suspend a member\'s access without removing their account.  Requires the `members:write` scope.
     * @summary Revoke access for a member
     * @param {string} id Member identifier (UUID) whose access should be suspended
     * @param {object} body 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembersApiInterface
     */
    membersServiceRevokeAccessRaw(requestParameters: MembersServiceRevokeAccessRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Member>>;

    /**
     * Suspend a member\'s access without removing their account.  Requires the `members:write` scope.
     * Revoke access for a member
     */
    membersServiceRevokeAccess(requestParameters: MembersServiceRevokeAccessRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Member>;

    /**
     * Creates request options for membersServiceUpdate without sending the request
     * @param {string} id Member identifier (UUID) to update
     * @param {MembersServiceUpdateBody} membersServiceUpdateBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof MembersApiInterface
     */
    membersServiceUpdateRequestOpts(requestParameters: MembersServiceUpdateRequest): Promise<runtime.RequestOpts>;

    /**
     * Change a teammate\'s name, role, display language or email. Only the fields you send are changed: a field left out keeps its value, so `{\"role\": \"ROLE_ADMIN\"}` promotes a teammate and leaves the rest of their profile as it is.  A role other than `ROLE_ADMIN` or `ROLE_VIEWER` fails with `MEMBER_ROLE_NOT_ALLOWED`; a language not offered fails with `MEMBER_LANGUAGE_NOT_ALLOWED`.  Requires the `members:write` scope.
     * @summary Update a member
     * @param {string} id Member identifier (UUID) to update
     * @param {MembersServiceUpdateBody} membersServiceUpdateBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembersApiInterface
     */
    membersServiceUpdateRaw(requestParameters: MembersServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Member>>;

    /**
     * Change a teammate\'s name, role, display language or email. Only the fields you send are changed: a field left out keeps its value, so `{\"role\": \"ROLE_ADMIN\"}` promotes a teammate and leaves the rest of their profile as it is.  A role other than `ROLE_ADMIN` or `ROLE_VIEWER` fails with `MEMBER_ROLE_NOT_ALLOWED`; a language not offered fails with `MEMBER_LANGUAGE_NOT_ALLOWED`.  Requires the `members:write` scope.
     * Update a member
     */
    membersServiceUpdate(requestParameters: MembersServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Member>;

}

/**
 * 
 */
export class MembersApi extends runtime.BaseAPI implements MembersApiInterface {

    /**
     * Creates request options for membersServiceAllowAccess without sending the request
     */
    async membersServiceAllowAccessRequestOpts(requestParameters: MembersServiceAllowAccessRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling membersServiceAllowAccess().'
            );
        }

        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling membersServiceAllowAccess().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["members:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["members:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/members/{id}/allow`;
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
     * Restore workspace access for a previously suspended member.  Requires the `members:write` scope.
     * Allow access for a member
     */
    async membersServiceAllowAccessRaw(requestParameters: MembersServiceAllowAccessRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Member>> {
        const requestOptions = await this.membersServiceAllowAccessRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MemberFromJSON(jsonValue));
    }

    /**
     * Restore workspace access for a previously suspended member.  Requires the `members:write` scope.
     * Allow access for a member
     */
    async membersServiceAllowAccess(requestParameters: MembersServiceAllowAccessRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Member> {
        const response = await this.membersServiceAllowAccessRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for membersServiceDelete without sending the request
     */
    async membersServiceDeleteRequestOpts(requestParameters: MembersServiceDeleteRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling membersServiceDelete().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["members:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["members:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/members/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Permanently remove a member from the workspace roster.  Requires the `members:write` scope.
     * Delete a member
     */
    async membersServiceDeleteRaw(requestParameters: MembersServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        const requestOptions = await this.membersServiceDeleteRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Permanently remove a member from the workspace roster.  Requires the `members:write` scope.
     * Delete a member
     */
    async membersServiceDelete(requestParameters: MembersServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.membersServiceDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for membersServiceForceSignout without sending the request
     */
    async membersServiceForceSignoutRequestOpts(requestParameters: MembersServiceForceSignoutRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling membersServiceForceSignout().'
            );
        }

        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling membersServiceForceSignout().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["members:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["members:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/members/{id}/signout`;
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
     * Terminate all active sessions for the specified member.  Requires the `members:write` scope.
     * Force a member to sign out
     */
    async membersServiceForceSignoutRaw(requestParameters: MembersServiceForceSignoutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Member>> {
        const requestOptions = await this.membersServiceForceSignoutRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MemberFromJSON(jsonValue));
    }

    /**
     * Terminate all active sessions for the specified member.  Requires the `members:write` scope.
     * Force a member to sign out
     */
    async membersServiceForceSignout(requestParameters: MembersServiceForceSignoutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Member> {
        const response = await this.membersServiceForceSignoutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for membersServiceGet without sending the request
     */
    async membersServiceGetRequestOpts(requestParameters: MembersServiceGetRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling membersServiceGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["members:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["members:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/members/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Fetch a single workspace member by the provided identifier.  Requires the `members:read` scope.
     * Get a member by ID
     */
    async membersServiceGetRaw(requestParameters: MembersServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Member>> {
        const requestOptions = await this.membersServiceGetRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MemberFromJSON(jsonValue));
    }

    /**
     * Fetch a single workspace member by the provided identifier.  Requires the `members:read` scope.
     * Get a member by ID
     */
    async membersServiceGet(requestParameters: MembersServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Member> {
        const response = await this.membersServiceGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for membersServiceInvite without sending the request
     */
    async membersServiceInviteRequestOpts(requestParameters: MembersServiceInviteRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['inviteMemberRequest'] == null) {
            throw new runtime.RequiredError(
                'inviteMemberRequest',
                'Required parameter "inviteMemberRequest" was null or undefined when calling membersServiceInvite().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["members:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["members:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/members/invite`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InviteMemberRequestToJSON(requestParameters['inviteMemberRequest']),
        };
    }

    /**
     * Create a pending member and dispatch an invitation email. A person who already has a Linkbreakers account is added to the workspace right away and told by email; inviting someone already in the workspace fails with MEMBER_ALREADY_IN_WORKSPACE.  Requires the `members:write` scope.
     * Invite a new member
     */
    async membersServiceInviteRaw(requestParameters: MembersServiceInviteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Member>> {
        const requestOptions = await this.membersServiceInviteRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MemberFromJSON(jsonValue));
    }

    /**
     * Create a pending member and dispatch an invitation email. A person who already has a Linkbreakers account is added to the workspace right away and told by email; inviting someone already in the workspace fails with MEMBER_ALREADY_IN_WORKSPACE.  Requires the `members:write` scope.
     * Invite a new member
     */
    async membersServiceInvite(requestParameters: MembersServiceInviteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Member> {
        const response = await this.membersServiceInviteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for membersServiceList without sending the request
     */
    async membersServiceListRequestOpts(requestParameters: MembersServiceListRequest): Promise<runtime.RequestOpts> {
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["members:read"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["members:read"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/members`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Retrieve a paginated list of members in the current workspace.  Requires the `members:read` scope.
     * List members
     */
    async membersServiceListRaw(requestParameters: MembersServiceListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListResponse>> {
        const requestOptions = await this.membersServiceListRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ListResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve a paginated list of members in the current workspace.  Requires the `members:read` scope.
     * List members
     */
    async membersServiceList(requestParameters: MembersServiceListRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListResponse> {
        const response = await this.membersServiceListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for membersServiceRequestEmailVerification without sending the request
     */
    async membersServiceRequestEmailVerificationRequestOpts(requestParameters: MembersServiceRequestEmailVerificationRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['requestEmailVerificationRequest'] == null) {
            throw new runtime.RequiredError(
                'requestEmailVerificationRequest',
                'Required parameter "requestEmailVerificationRequest" was null or undefined when calling membersServiceRequestEmailVerification().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["members:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["members:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/members/email-verification`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RequestEmailVerificationRequestToJSON(requestParameters['requestEmailVerificationRequest']),
        };
    }

    /**
     * Sends the verification email again to a member of the workspace whose email address is not verified yet. Pass the member\'s email address.  A free workspace with no verified address is paused 7 days after sign-up: its calls answer `WORKSPACE_UNVERIFIED` until a member opens the link in that email. Verifying one member\'s address, usually the owner\'s, lifts the pause for the whole workspace. This operation keeps working while the workspace is paused.  The address must belong to a member of the workspace. One email per address per minute, and 5 per day.  Requires the `members:write` scope.
     * Resend a member\'s verification email
     */
    async membersServiceRequestEmailVerificationRaw(requestParameters: MembersServiceRequestEmailVerificationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        const requestOptions = await this.membersServiceRequestEmailVerificationRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Sends the verification email again to a member of the workspace whose email address is not verified yet. Pass the member\'s email address.  A free workspace with no verified address is paused 7 days after sign-up: its calls answer `WORKSPACE_UNVERIFIED` until a member opens the link in that email. Verifying one member\'s address, usually the owner\'s, lifts the pause for the whole workspace. This operation keeps working while the workspace is paused.  The address must belong to a member of the workspace. One email per address per minute, and 5 per day.  Requires the `members:write` scope.
     * Resend a member\'s verification email
     */
    async membersServiceRequestEmailVerification(requestParameters: MembersServiceRequestEmailVerificationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.membersServiceRequestEmailVerificationRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for membersServiceRevokeAccess without sending the request
     */
    async membersServiceRevokeAccessRequestOpts(requestParameters: MembersServiceRevokeAccessRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling membersServiceRevokeAccess().'
            );
        }

        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling membersServiceRevokeAccess().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["members:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["members:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/members/{id}/revoke`;
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
     * Suspend a member\'s access without removing their account.  Requires the `members:write` scope.
     * Revoke access for a member
     */
    async membersServiceRevokeAccessRaw(requestParameters: MembersServiceRevokeAccessRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Member>> {
        const requestOptions = await this.membersServiceRevokeAccessRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MemberFromJSON(jsonValue));
    }

    /**
     * Suspend a member\'s access without removing their account.  Requires the `members:write` scope.
     * Revoke access for a member
     */
    async membersServiceRevokeAccess(requestParameters: MembersServiceRevokeAccessRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Member> {
        const response = await this.membersServiceRevokeAccessRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for membersServiceUpdate without sending the request
     */
    async membersServiceUpdateRequestOpts(requestParameters: MembersServiceUpdateRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling membersServiceUpdate().'
            );
        }

        if (requestParameters['membersServiceUpdateBody'] == null) {
            throw new runtime.RequiredError(
                'membersServiceUpdateBody',
                'Required parameter "membersServiceUpdateBody" was null or undefined when calling membersServiceUpdate().'
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
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["members:write"]);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", ["members:write"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/v1/members/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: MembersServiceUpdateBodyToJSON(requestParameters['membersServiceUpdateBody']),
        };
    }

    /**
     * Change a teammate\'s name, role, display language or email. Only the fields you send are changed: a field left out keeps its value, so `{\"role\": \"ROLE_ADMIN\"}` promotes a teammate and leaves the rest of their profile as it is.  A role other than `ROLE_ADMIN` or `ROLE_VIEWER` fails with `MEMBER_ROLE_NOT_ALLOWED`; a language not offered fails with `MEMBER_LANGUAGE_NOT_ALLOWED`.  Requires the `members:write` scope.
     * Update a member
     */
    async membersServiceUpdateRaw(requestParameters: MembersServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Member>> {
        const requestOptions = await this.membersServiceUpdateRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MemberFromJSON(jsonValue));
    }

    /**
     * Change a teammate\'s name, role, display language or email. Only the fields you send are changed: a field left out keeps its value, so `{\"role\": \"ROLE_ADMIN\"}` promotes a teammate and leaves the rest of their profile as it is.  A role other than `ROLE_ADMIN` or `ROLE_VIEWER` fails with `MEMBER_ROLE_NOT_ALLOWED`; a language not offered fails with `MEMBER_LANGUAGE_NOT_ALLOWED`.  Requires the `members:write` scope.
     * Update a member
     */
    async membersServiceUpdate(requestParameters: MembersServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Member> {
        const response = await this.membersServiceUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
