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
  ApplyQrcodeTemplateRequest,
  ApplyQrcodeTemplateResponse,
  CreateQrcodeDesignRequest,
  CreateQrcodeDesignResponse,
  ErrorResponse,
  GetQrcodeDesignResponse,
  QrcodeDesignsServiceUpdateBody,
  UpdateQrcodeDesignResponse,
} from '../models/index';
import {
    ApplyQrcodeTemplateRequestFromJSON,
    ApplyQrcodeTemplateRequestToJSON,
    ApplyQrcodeTemplateResponseFromJSON,
    ApplyQrcodeTemplateResponseToJSON,
    CreateQrcodeDesignRequestFromJSON,
    CreateQrcodeDesignRequestToJSON,
    CreateQrcodeDesignResponseFromJSON,
    CreateQrcodeDesignResponseToJSON,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    GetQrcodeDesignResponseFromJSON,
    GetQrcodeDesignResponseToJSON,
    QrcodeDesignsServiceUpdateBodyFromJSON,
    QrcodeDesignsServiceUpdateBodyToJSON,
    UpdateQrcodeDesignResponseFromJSON,
    UpdateQrcodeDesignResponseToJSON,
} from '../models/index';

export interface QrcodeDesignsServiceApplyTemplateRequest {
    applyQrcodeTemplateRequest: ApplyQrcodeTemplateRequest;
    idempotencyKey?: string;
}

export interface QrcodeDesignsServiceCreateRequest {
    createQrcodeDesignRequest: CreateQrcodeDesignRequest;
    idempotencyKey?: string;
}

export interface QrcodeDesignsServiceDeleteRequest {
    id: string;
}

export interface QrcodeDesignsServiceGetRequest {
    id: string;
}

export interface QrcodeDesignsServiceUpdateRequest {
    id: string;
    qrcodeDesignsServiceUpdateBody: QrcodeDesignsServiceUpdateBody;
    idempotencyKey?: string;
}

/**
 * QRCodeDesignsApi - interface
 * 
 * @export
 * @interface QRCodeDesignsApiInterface
 */
export interface QRCodeDesignsApiInterface {
    /**
     * Creates request options for qrcodeDesignsServiceApplyTemplate without sending the request
     * @param {ApplyQrcodeTemplateRequest} applyQrcodeTemplateRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof QRCodeDesignsApiInterface
     */
    qrcodeDesignsServiceApplyTemplateRequestOpts(requestParameters: QrcodeDesignsServiceApplyTemplateRequest): Promise<runtime.RequestOpts>;

    /**
     * Copy all design settings from a community QR code template to an existing link\'s QR code design. This replaces the current design with the template\'s styling.  Requires the `qrcodes:write` scope.
     * @summary Apply a QR code template to a link
     * @param {ApplyQrcodeTemplateRequest} applyQrcodeTemplateRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QRCodeDesignsApiInterface
     */
    qrcodeDesignsServiceApplyTemplateRaw(requestParameters: QrcodeDesignsServiceApplyTemplateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApplyQrcodeTemplateResponse>>;

    /**
     * Copy all design settings from a community QR code template to an existing link\'s QR code design. This replaces the current design with the template\'s styling.  Requires the `qrcodes:write` scope.
     * Apply a QR code template to a link
     */
    qrcodeDesignsServiceApplyTemplate(requestParameters: QrcodeDesignsServiceApplyTemplateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApplyQrcodeTemplateResponse>;

    /**
     * Creates request options for qrcodeDesignsServiceCreate without sending the request
     * @param {CreateQrcodeDesignRequest} createQrcodeDesignRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof QRCodeDesignsApiInterface
     */
    qrcodeDesignsServiceCreateRequestOpts(requestParameters: QrcodeDesignsServiceCreateRequest): Promise<runtime.RequestOpts>;

    /**
     * Provision a QR code styling preset that can be reused across links or templates. No API token is needed; the logo, if any, is a public upload passed by its media id.
     * @summary Create a new QR code design
     * @param {CreateQrcodeDesignRequest} createQrcodeDesignRequest 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QRCodeDesignsApiInterface
     */
    qrcodeDesignsServiceCreateRaw(requestParameters: QrcodeDesignsServiceCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreateQrcodeDesignResponse>>;

    /**
     * Provision a QR code styling preset that can be reused across links or templates. No API token is needed; the logo, if any, is a public upload passed by its media id.
     * Create a new QR code design
     */
    qrcodeDesignsServiceCreate(requestParameters: QrcodeDesignsServiceCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreateQrcodeDesignResponse>;

    /**
     * Creates request options for qrcodeDesignsServiceDelete without sending the request
     * @param {string} id The ID of the QR code design to delete
     * @throws {RequiredError}
     * @memberof QRCodeDesignsApiInterface
     */
    qrcodeDesignsServiceDeleteRequestOpts(requestParameters: QrcodeDesignsServiceDeleteRequest): Promise<runtime.RequestOpts>;

    /**
     * Remove a QR code design that is no longer in use by any assets.  Requires the `qrcodes:write` scope.
     * @summary Delete a QR code design
     * @param {string} id The ID of the QR code design to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QRCodeDesignsApiInterface
     */
    qrcodeDesignsServiceDeleteRaw(requestParameters: QrcodeDesignsServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>>;

    /**
     * Remove a QR code design that is no longer in use by any assets.  Requires the `qrcodes:write` scope.
     * Delete a QR code design
     */
    qrcodeDesignsServiceDelete(requestParameters: QrcodeDesignsServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object>;

    /**
     * Creates request options for qrcodeDesignsServiceGet without sending the request
     * @param {string} id The ID of the QR code design to get (UUID)
     * @throws {RequiredError}
     * @memberof QRCodeDesignsApiInterface
     */
    qrcodeDesignsServiceGetRequestOpts(requestParameters: QrcodeDesignsServiceGetRequest): Promise<runtime.RequestOpts>;

    /**
     * Fetch a QR code design by its identifier including computed metadata.  Requires the `qrcodes:read` scope.
     * @summary Get a QR code design
     * @param {string} id The ID of the QR code design to get (UUID)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QRCodeDesignsApiInterface
     */
    qrcodeDesignsServiceGetRaw(requestParameters: QrcodeDesignsServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetQrcodeDesignResponse>>;

    /**
     * Fetch a QR code design by its identifier including computed metadata.  Requires the `qrcodes:read` scope.
     * Get a QR code design
     */
    qrcodeDesignsServiceGet(requestParameters: QrcodeDesignsServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetQrcodeDesignResponse>;

    /**
     * Creates request options for qrcodeDesignsServiceUpdate without sending the request
     * @param {string} id The ID of the QR code design to update (UUID)
     * @param {QrcodeDesignsServiceUpdateBody} qrcodeDesignsServiceUpdateBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof QRCodeDesignsApiInterface
     */
    qrcodeDesignsServiceUpdateRequestOpts(requestParameters: QrcodeDesignsServiceUpdateRequest): Promise<runtime.RequestOpts>;

    /**
     * Apply styling tweaks or media changes to an existing QR code design.  Requires the `qrcodes:write` scope.
     * @summary Update a QR code design
     * @param {string} id The ID of the QR code design to update (UUID)
     * @param {QrcodeDesignsServiceUpdateBody} qrcodeDesignsServiceUpdateBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QRCodeDesignsApiInterface
     */
    qrcodeDesignsServiceUpdateRaw(requestParameters: QrcodeDesignsServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdateQrcodeDesignResponse>>;

    /**
     * Apply styling tweaks or media changes to an existing QR code design.  Requires the `qrcodes:write` scope.
     * Update a QR code design
     */
    qrcodeDesignsServiceUpdate(requestParameters: QrcodeDesignsServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdateQrcodeDesignResponse>;

}

/**
 * 
 */
export class QRCodeDesignsApi extends runtime.BaseAPI implements QRCodeDesignsApiInterface {

    /**
     * Creates request options for qrcodeDesignsServiceApplyTemplate without sending the request
     */
    async qrcodeDesignsServiceApplyTemplateRequestOpts(requestParameters: QrcodeDesignsServiceApplyTemplateRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['applyQrcodeTemplateRequest'] == null) {
            throw new runtime.RequiredError(
                'applyQrcodeTemplateRequest',
                'Required parameter "applyQrcodeTemplateRequest" was null or undefined when calling qrcodeDesignsServiceApplyTemplate().'
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

        let urlPath = `/v1/qrcode-designs/apply-template`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ApplyQrcodeTemplateRequestToJSON(requestParameters['applyQrcodeTemplateRequest']),
        };
    }

    /**
     * Copy all design settings from a community QR code template to an existing link\'s QR code design. This replaces the current design with the template\'s styling.  Requires the `qrcodes:write` scope.
     * Apply a QR code template to a link
     */
    async qrcodeDesignsServiceApplyTemplateRaw(requestParameters: QrcodeDesignsServiceApplyTemplateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApplyQrcodeTemplateResponse>> {
        const requestOptions = await this.qrcodeDesignsServiceApplyTemplateRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApplyQrcodeTemplateResponseFromJSON(jsonValue));
    }

    /**
     * Copy all design settings from a community QR code template to an existing link\'s QR code design. This replaces the current design with the template\'s styling.  Requires the `qrcodes:write` scope.
     * Apply a QR code template to a link
     */
    async qrcodeDesignsServiceApplyTemplate(requestParameters: QrcodeDesignsServiceApplyTemplateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApplyQrcodeTemplateResponse> {
        const response = await this.qrcodeDesignsServiceApplyTemplateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for qrcodeDesignsServiceCreate without sending the request
     */
    async qrcodeDesignsServiceCreateRequestOpts(requestParameters: QrcodeDesignsServiceCreateRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['createQrcodeDesignRequest'] == null) {
            throw new runtime.RequiredError(
                'createQrcodeDesignRequest',
                'Required parameter "createQrcodeDesignRequest" was null or undefined when calling qrcodeDesignsServiceCreate().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters['idempotencyKey'] != null) {
            headerParameters['Idempotency-Key'] = String(requestParameters['idempotencyKey']);
        }


        let urlPath = `/v1/qrcode-designs`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateQrcodeDesignRequestToJSON(requestParameters['createQrcodeDesignRequest']),
        };
    }

    /**
     * Provision a QR code styling preset that can be reused across links or templates. No API token is needed; the logo, if any, is a public upload passed by its media id.
     * Create a new QR code design
     */
    async qrcodeDesignsServiceCreateRaw(requestParameters: QrcodeDesignsServiceCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreateQrcodeDesignResponse>> {
        const requestOptions = await this.qrcodeDesignsServiceCreateRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateQrcodeDesignResponseFromJSON(jsonValue));
    }

    /**
     * Provision a QR code styling preset that can be reused across links or templates. No API token is needed; the logo, if any, is a public upload passed by its media id.
     * Create a new QR code design
     */
    async qrcodeDesignsServiceCreate(requestParameters: QrcodeDesignsServiceCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreateQrcodeDesignResponse> {
        const response = await this.qrcodeDesignsServiceCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for qrcodeDesignsServiceDelete without sending the request
     */
    async qrcodeDesignsServiceDeleteRequestOpts(requestParameters: QrcodeDesignsServiceDeleteRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling qrcodeDesignsServiceDelete().'
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

        let urlPath = `/v1/qrcode-designs/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Remove a QR code design that is no longer in use by any assets.  Requires the `qrcodes:write` scope.
     * Delete a QR code design
     */
    async qrcodeDesignsServiceDeleteRaw(requestParameters: QrcodeDesignsServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        const requestOptions = await this.qrcodeDesignsServiceDeleteRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Remove a QR code design that is no longer in use by any assets.  Requires the `qrcodes:write` scope.
     * Delete a QR code design
     */
    async qrcodeDesignsServiceDelete(requestParameters: QrcodeDesignsServiceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.qrcodeDesignsServiceDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for qrcodeDesignsServiceGet without sending the request
     */
    async qrcodeDesignsServiceGetRequestOpts(requestParameters: QrcodeDesignsServiceGetRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling qrcodeDesignsServiceGet().'
            );
        }

        const queryParameters: any = {};

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

        let urlPath = `/v1/qrcode-designs/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Fetch a QR code design by its identifier including computed metadata.  Requires the `qrcodes:read` scope.
     * Get a QR code design
     */
    async qrcodeDesignsServiceGetRaw(requestParameters: QrcodeDesignsServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetQrcodeDesignResponse>> {
        const requestOptions = await this.qrcodeDesignsServiceGetRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetQrcodeDesignResponseFromJSON(jsonValue));
    }

    /**
     * Fetch a QR code design by its identifier including computed metadata.  Requires the `qrcodes:read` scope.
     * Get a QR code design
     */
    async qrcodeDesignsServiceGet(requestParameters: QrcodeDesignsServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetQrcodeDesignResponse> {
        const response = await this.qrcodeDesignsServiceGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for qrcodeDesignsServiceUpdate without sending the request
     */
    async qrcodeDesignsServiceUpdateRequestOpts(requestParameters: QrcodeDesignsServiceUpdateRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling qrcodeDesignsServiceUpdate().'
            );
        }

        if (requestParameters['qrcodeDesignsServiceUpdateBody'] == null) {
            throw new runtime.RequiredError(
                'qrcodeDesignsServiceUpdateBody',
                'Required parameter "qrcodeDesignsServiceUpdateBody" was null or undefined when calling qrcodeDesignsServiceUpdate().'
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

        let urlPath = `/v1/qrcode-designs/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: QrcodeDesignsServiceUpdateBodyToJSON(requestParameters['qrcodeDesignsServiceUpdateBody']),
        };
    }

    /**
     * Apply styling tweaks or media changes to an existing QR code design.  Requires the `qrcodes:write` scope.
     * Update a QR code design
     */
    async qrcodeDesignsServiceUpdateRaw(requestParameters: QrcodeDesignsServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdateQrcodeDesignResponse>> {
        const requestOptions = await this.qrcodeDesignsServiceUpdateRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UpdateQrcodeDesignResponseFromJSON(jsonValue));
    }

    /**
     * Apply styling tweaks or media changes to an existing QR code design.  Requires the `qrcodes:write` scope.
     * Update a QR code design
     */
    async qrcodeDesignsServiceUpdate(requestParameters: QrcodeDesignsServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdateQrcodeDesignResponse> {
        const response = await this.qrcodeDesignsServiceUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
