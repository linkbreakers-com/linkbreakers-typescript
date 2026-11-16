/* tslint:disable */
/* eslint-disable */
/**
 * Linkbreakers API
 * The Linkbreakers REST API: links, QR codes, workflows, visitors and analytics, as JSON over HTTPS. Send a workspace API token as `Authorization: Bearer <token>`.  ## Entry points  `GET https://api.linkbreakers.com/` and `GET https://api.linkbreakers.com/v1` answer without credentials with the API\'s name, version and links. This document is served at `https://api.linkbreakers.com/openapi.json`.  ## Rate limits  Every response describes where the caller stands in the IETF `RateLimit-Policy` and `RateLimit` header fields (draft-ietf-httpapi-ratelimit-headers), and in `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` and `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` (a Unix timestamp) for clients that read those. A request past the limit gets `429 Too Many Requests` with `Retry-After` in seconds.  - Workspace API token: 720 requests per 60 seconds, per token. - Dashboard session or OAuth token: 600 requests per 60 seconds, per token. - No credentials: 300 requests per 60 seconds, per client IP.  Each plan also includes a number of API calls per billing cycle. Past it, calls answer `429` with the code `MAX_PUBLIC_API_QUERIED_REACHED` until the cycle renews or the plan changes.  ## Pagination  Every list pages with opaque cursors (AIP-158). Pass `pageSize`, then send the `nextPageToken` of each response back as `pageToken` (or its alias `cursor`) to get the next page. An empty or absent `nextPageToken` means the list is complete. Each list operation describes this in `x-pagination`.  ## Batches and background jobs  `POST /v1/links/bulk` creates up to 250 links in one transactional request; `POST /v1/links/batch` takes the same links as a bare JSON array. `POST /v1/links/bulk/jobs` accepts the same batch and answers `202 Accepted` at once with a job and a `Location` header; poll `GET /v1/jobs/{id}` until `status` is `JOB_STATUS_SUCCEEDED` (the created link ids are in `linksBulkCreate.linkIds`) or `JOB_STATUS_FAILED` (`error` says why, and nothing was created). Jobs can be read for 24 hours after they finish.  ## Paused workspaces  A free workspace whose members have not verified any email address is paused 7 days after sign-up. Its calls then answer `403` with the code `WORKSPACE_UNVERIFIED` and change nothing; QR codes and links keep working for visitors. To lift the pause, ask the workspace owner to verify their email: `POST /v1/members/email-verification` sends the verification email again, and works while the workspace is paused. `unverifiedPauseAt` on the workspace says when the pause starts.  ## Versioning and deprecation  The version is in the path: every operation lives under `/v1`. Within a version, changes are additive only: new operations, new optional request fields, new response fields and new enum values. Clients should ignore fields and enum values they do not know. Anything that would break an existing client ships under a new path version instead.  An operation is retired in two steps. First it is deprecated: it keeps working, is flagged `deprecated: true` in this document, and every response carries a `Deprecation` header field (RFC 9745) with the time it was deprecated and a `Link` with `rel=\"deprecation\"` to the policy. Then, at least 180 days later, it may be removed; that date is announced in advance in a `Sunset` header field (RFC 8594) and as `x-sunset` on the operation. The full policy: https://linkbreakers.com/help/article/api-versioning-and-deprecation-policy  A renamed operation keeps answering its former path while clients still call it, until that path\'s sunset at the latest: a former path no client calls for 14 days is removed. Responses on a former path carry the same `Deprecation`, `Sunset` and `Link` header fields; this document lists only the current path, and the policy lists the former paths that still answer.  ## Idempotent retries  Every POST, PUT and PATCH accepts an optional `Idempotency-Key` header (draft-ietf-httpapi-idempotency-key-header). Send a new unique value, such as a UUID, with each logical request and reuse it only to retry that request. A retry with the same key and the same request returns the first response, marked `Idempotent-Replayed: true`, instead of running again. Keys are scoped to the token and kept for 24 hours. The same key with a different request is refused with `422`, and a retry while the first request is still running gets `409` with `Retry-After`. Server errors (5xx) and refusals such as 401, 403 and 429 are not stored, so retrying them runs the request again.  ## Identifying your client  Send a `Linkbreakers-Client` request header saying which client made the call: `<client>/<version> (<details>)`, for example `my-integration/1.2.0 (python 3.12; linux)`. The official SDKs, the CLI and the MCP bridge set it for you, as `sdk-python/2.3.1 (python 3.12.4; linux)` or `cli/1.4.0 (darwin arm64)`. It is optional and changes nothing about how a request is handled; it tells us which clients and versions are in use, so we know what can be retired and what to fix first. Keep the details short and free of personal data. Browsers may send it too: it is allowed by CORS.
 *
 * The version of the OpenAPI document: 1.200.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  ConnectFormToolResponse,
  ErrorResponse,
  FormIntegrationsServiceChooseFormLinkBody,
  FormIntegrationsServiceConnectBody,
  FormIntegrationsServiceUpdateBody,
  GetFormConnectionResponse,
  ListFormConnectionsResponse,
  ListFormToolFormsResponse,
  UpdateFormConnectionResponse,
} from '../models/index';
import {
    ConnectFormToolResponseFromJSON,
    ConnectFormToolResponseToJSON,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    FormIntegrationsServiceChooseFormLinkBodyFromJSON,
    FormIntegrationsServiceChooseFormLinkBodyToJSON,
    FormIntegrationsServiceConnectBodyFromJSON,
    FormIntegrationsServiceConnectBodyToJSON,
    FormIntegrationsServiceUpdateBodyFromJSON,
    FormIntegrationsServiceUpdateBodyToJSON,
    GetFormConnectionResponseFromJSON,
    GetFormConnectionResponseToJSON,
    ListFormConnectionsResponseFromJSON,
    ListFormConnectionsResponseToJSON,
    ListFormToolFormsResponseFromJSON,
    ListFormToolFormsResponseToJSON,
    UpdateFormConnectionResponseFromJSON,
    UpdateFormConnectionResponseToJSON,
} from '../models/index';

export interface FormIntegrationsServiceChooseFormLinkRequest {
    tool: string;
    formId: string;
    formIntegrationsServiceChooseFormLinkBody: FormIntegrationsServiceChooseFormLinkBody;
    idempotencyKey?: string;
}

export interface FormIntegrationsServiceConnectRequest {
    tool: string;
    formIntegrationsServiceConnectBody: FormIntegrationsServiceConnectBody;
    idempotencyKey?: string;
}

export interface FormIntegrationsServiceDisconnectRequest {
    tool: string;
}

export interface FormIntegrationsServiceGetRequest {
    tool: string;
}

export interface FormIntegrationsServiceListFormsRequest {
    tool: string;
}

export interface FormIntegrationsServicePrepareFormsRequest {
    tool: string;
    body: object;
    idempotencyKey?: string;
}

export interface FormIntegrationsServiceUpdateRequest {
    tool: string;
    formIntegrationsServiceUpdateBody: FormIntegrationsServiceUpdateBody;
    idempotencyKey?: string;
}

/**
 * IntegrationsFormsApi - interface
 * 
 * @export
 * @interface IntegrationsFormsApiInterface
 */
export interface IntegrationsFormsApiInterface {
    /**
     * Creates request options for formIntegrationsServiceChooseFormLink without sending the request
     * @param {string} tool 
     * @param {string} formId The form\&#39;s ID at the tool, as listed in the forms found behind links.
     * @param {FormIntegrationsServiceChooseFormLinkBody} formIntegrationsServiceChooseFormLinkBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof IntegrationsFormsApiInterface
     */
    formIntegrationsServiceChooseFormLinkRequestOpts(requestParameters: FormIntegrationsServiceChooseFormLinkRequest): Promise<runtime.RequestOpts>;

    /**
     * When the same form is behind several links and the tool cannot always tell which link a response came from, record the link its responses belong to. Only Google Forms needs it; the other tools\' responses carry the visit, and they fail with `FORM_LINK_CHOICE_NOT_NEEDED`. Fails with `GOOGLE_FORMS_LINK_NOT_BEHIND_FORM` when the link does not open the form.  Requires the `integrations:write` scope.
     * @summary Choose the link of a shared form
     * @param {string} tool 
     * @param {string} formId The form\&#39;s ID at the tool, as listed in the forms found behind links.
     * @param {FormIntegrationsServiceChooseFormLinkBody} formIntegrationsServiceChooseFormLinkBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IntegrationsFormsApiInterface
     */
    formIntegrationsServiceChooseFormLinkRaw(requestParameters: FormIntegrationsServiceChooseFormLinkRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>>;

    /**
     * When the same form is behind several links and the tool cannot always tell which link a response came from, record the link its responses belong to. Only Google Forms needs it; the other tools\' responses carry the visit, and they fail with `FORM_LINK_CHOICE_NOT_NEEDED`. Fails with `GOOGLE_FORMS_LINK_NOT_BEHIND_FORM` when the link does not open the form.  Requires the `integrations:write` scope.
     * Choose the link of a shared form
     */
    formIntegrationsServiceChooseFormLink(requestParameters: FormIntegrationsServiceChooseFormLinkRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object>;

    /**
     * Creates request options for formIntegrationsServiceConnect without sending the request
     * @param {string} tool 
     * @param {FormIntegrationsServiceConnectBody} formIntegrationsServiceConnectBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof IntegrationsFormsApiInterface
     */
    formIntegrationsServiceConnectRequestOpts(requestParameters: FormIntegrationsServiceConnectRequest): Promise<runtime.RequestOpts>;

    /**
     * Connect Tally, Jotform or Paperform with the account\'s API key. The forms behind the workspace\'s links are prepared at once: a hidden lbid field and a webhook. Typeform and Google Forms connect by signing in, in the dashboard; Google Forms fails here with `FORM_TOOL_SIGN_IN_REQUIRED`.  Requires the `integrations:write` scope.
     * @summary Connect a form tool with an API key
     * @param {string} tool 
     * @param {FormIntegrationsServiceConnectBody} formIntegrationsServiceConnectBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IntegrationsFormsApiInterface
     */
    formIntegrationsServiceConnectRaw(requestParameters: FormIntegrationsServiceConnectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectFormToolResponse>>;

    /**
     * Connect Tally, Jotform or Paperform with the account\'s API key. The forms behind the workspace\'s links are prepared at once: a hidden lbid field and a webhook. Typeform and Google Forms connect by signing in, in the dashboard; Google Forms fails here with `FORM_TOOL_SIGN_IN_REQUIRED`.  Requires the `integrations:write` scope.
     * Connect a form tool with an API key
     */
    formIntegrationsServiceConnect(requestParameters: FormIntegrationsServiceConnectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConnectFormToolResponse>;

    /**
     * Creates request options for formIntegrationsServiceDisconnect without sending the request
     * @param {string} tool 
     * @throws {RequiredError}
     * @memberof IntegrationsFormsApiInterface
     */
    formIntegrationsServiceDisconnectRequestOpts(requestParameters: FormIntegrationsServiceDisconnectRequest): Promise<runtime.RequestOpts>;

    /**
     * Remove our webhooks from its forms, or for Google Forms revoke our access to the Google account, and forget the credential.  Requires the `integrations:write` scope.
     * @summary Disconnect a form tool
     * @param {string} tool 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IntegrationsFormsApiInterface
     */
    formIntegrationsServiceDisconnectRaw(requestParameters: FormIntegrationsServiceDisconnectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>>;

    /**
     * Remove our webhooks from its forms, or for Google Forms revoke our access to the Google account, and forget the credential.  Requires the `integrations:write` scope.
     * Disconnect a form tool
     */
    formIntegrationsServiceDisconnect(requestParameters: FormIntegrationsServiceDisconnectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object>;

    /**
     * Creates request options for formIntegrationsServiceGet without sending the request
     * @param {string} tool 
     * @throws {RequiredError}
     * @memberof IntegrationsFormsApiInterface
     */
    formIntegrationsServiceGetRequestOpts(requestParameters: FormIntegrationsServiceGetRequest): Promise<runtime.RequestOpts>;

    /**
     * Return one form tool\'s connection, empty when it is not connected.  Requires the `integrations:read` scope.
     * @summary Get a form tool connection
     * @param {string} tool 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IntegrationsFormsApiInterface
     */
    formIntegrationsServiceGetRaw(requestParameters: FormIntegrationsServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetFormConnectionResponse>>;

    /**
     * Return one form tool\'s connection, empty when it is not connected.  Requires the `integrations:read` scope.
     * Get a form tool connection
     */
    formIntegrationsServiceGet(requestParameters: FormIntegrationsServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetFormConnectionResponse>;

    /**
     * Creates request options for formIntegrationsServiceList without sending the request
     * @throws {RequiredError}
     * @memberof IntegrationsFormsApiInterface
     */
    formIntegrationsServiceListRequestOpts(): Promise<runtime.RequestOpts>;

    /**
     * Return the workspace\'s connected form tools: Google Forms, Tally, Typeform, Jotform and Paperform.  Requires the `integrations:read` scope.
     * @summary List form tool connections
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IntegrationsFormsApiInterface
     */
    formIntegrationsServiceListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListFormConnectionsResponse>>;

    /**
     * Return the workspace\'s connected form tools: Google Forms, Tally, Typeform, Jotform and Paperform.  Requires the `integrations:read` scope.
     * List form tool connections
     */
    formIntegrationsServiceList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListFormConnectionsResponse>;

    /**
     * Creates request options for formIntegrationsServiceListForms without sending the request
     * @param {string} tool 
     * @throws {RequiredError}
     * @memberof IntegrationsFormsApiInterface
     */
    formIntegrationsServiceListFormsRequestOpts(requestParameters: FormIntegrationsServiceListFormsRequest): Promise<runtime.RequestOpts>;

    /**
     * Return the forms of a connected tool behind the workspace\'s links, each with whether it is ready.  Requires the `integrations:read` scope.
     * @summary List the forms found behind links
     * @param {string} tool 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IntegrationsFormsApiInterface
     */
    formIntegrationsServiceListFormsRaw(requestParameters: FormIntegrationsServiceListFormsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListFormToolFormsResponse>>;

    /**
     * Return the forms of a connected tool behind the workspace\'s links, each with whether it is ready.  Requires the `integrations:read` scope.
     * List the forms found behind links
     */
    formIntegrationsServiceListForms(requestParameters: FormIntegrationsServiceListFormsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListFormToolFormsResponse>;

    /**
     * Creates request options for formIntegrationsServicePrepareForms without sending the request
     * @param {string} tool 
     * @param {object} body 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof IntegrationsFormsApiInterface
     */
    formIntegrationsServicePrepareFormsRequestOpts(requestParameters: FormIntegrationsServicePrepareFormsRequest): Promise<runtime.RequestOpts>;

    /**
     * Add the hidden field and webhook to every form behind a link now, rather than at the next daily check. For Google Forms, which does not send responses as they come, this also reads the responses that arrived since the last read, rather than at the next one a few minutes later.  Requires the `integrations:write` scope.
     * @summary Check the forms again
     * @param {string} tool 
     * @param {object} body 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IntegrationsFormsApiInterface
     */
    formIntegrationsServicePrepareFormsRaw(requestParameters: FormIntegrationsServicePrepareFormsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListFormToolFormsResponse>>;

    /**
     * Add the hidden field and webhook to every form behind a link now, rather than at the next daily check. For Google Forms, which does not send responses as they come, this also reads the responses that arrived since the last read, rather than at the next one a few minutes later.  Requires the `integrations:write` scope.
     * Check the forms again
     */
    formIntegrationsServicePrepareForms(requestParameters: FormIntegrationsServicePrepareFormsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListFormToolFormsResponse>;

    /**
     * Creates request options for formIntegrationsServiceUpdate without sending the request
     * @param {string} tool 
     * @param {FormIntegrationsServiceUpdateBody} formIntegrationsServiceUpdateBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @throws {RequiredError}
     * @memberof IntegrationsFormsApiInterface
     */
    formIntegrationsServiceUpdateRequestOpts(requestParameters: FormIntegrationsServiceUpdateRequest): Promise<runtime.RequestOpts>;

    /**
     * Pause or resume it, or change which links\' forms bring answers in and which answers are kept.  Requires the `integrations:write` scope.
     * @summary Update a form tool connection
     * @param {string} tool 
     * @param {FormIntegrationsServiceUpdateBody} formIntegrationsServiceUpdateBody 
     * @param {string} [idempotencyKey] A unique value per request, such as a UUID, that makes retrying it safe: a retry with the same key and body returns the first response instead of acting twice.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IntegrationsFormsApiInterface
     */
    formIntegrationsServiceUpdateRaw(requestParameters: FormIntegrationsServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdateFormConnectionResponse>>;

    /**
     * Pause or resume it, or change which links\' forms bring answers in and which answers are kept.  Requires the `integrations:write` scope.
     * Update a form tool connection
     */
    formIntegrationsServiceUpdate(requestParameters: FormIntegrationsServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdateFormConnectionResponse>;

}

/**
 * 
 */
export class IntegrationsFormsApi extends runtime.BaseAPI implements IntegrationsFormsApiInterface {

    /**
     * Creates request options for formIntegrationsServiceChooseFormLink without sending the request
     */
    async formIntegrationsServiceChooseFormLinkRequestOpts(requestParameters: FormIntegrationsServiceChooseFormLinkRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['tool'] == null) {
            throw new runtime.RequiredError(
                'tool',
                'Required parameter "tool" was null or undefined when calling formIntegrationsServiceChooseFormLink().'
            );
        }

        if (requestParameters['formId'] == null) {
            throw new runtime.RequiredError(
                'formId',
                'Required parameter "formId" was null or undefined when calling formIntegrationsServiceChooseFormLink().'
            );
        }

        if (requestParameters['formIntegrationsServiceChooseFormLinkBody'] == null) {
            throw new runtime.RequiredError(
                'formIntegrationsServiceChooseFormLinkBody',
                'Required parameter "formIntegrationsServiceChooseFormLinkBody" was null or undefined when calling formIntegrationsServiceChooseFormLink().'
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

        let urlPath = `/v1/form-integrations/{tool}/forms/{formId}/link`;
        urlPath = urlPath.replace(`{${"tool"}}`, encodeURIComponent(String(requestParameters['tool'])));
        urlPath = urlPath.replace(`{${"formId"}}`, encodeURIComponent(String(requestParameters['formId'])));

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: FormIntegrationsServiceChooseFormLinkBodyToJSON(requestParameters['formIntegrationsServiceChooseFormLinkBody']),
        };
    }

    /**
     * When the same form is behind several links and the tool cannot always tell which link a response came from, record the link its responses belong to. Only Google Forms needs it; the other tools\' responses carry the visit, and they fail with `FORM_LINK_CHOICE_NOT_NEEDED`. Fails with `GOOGLE_FORMS_LINK_NOT_BEHIND_FORM` when the link does not open the form.  Requires the `integrations:write` scope.
     * Choose the link of a shared form
     */
    async formIntegrationsServiceChooseFormLinkRaw(requestParameters: FormIntegrationsServiceChooseFormLinkRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        const requestOptions = await this.formIntegrationsServiceChooseFormLinkRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * When the same form is behind several links and the tool cannot always tell which link a response came from, record the link its responses belong to. Only Google Forms needs it; the other tools\' responses carry the visit, and they fail with `FORM_LINK_CHOICE_NOT_NEEDED`. Fails with `GOOGLE_FORMS_LINK_NOT_BEHIND_FORM` when the link does not open the form.  Requires the `integrations:write` scope.
     * Choose the link of a shared form
     */
    async formIntegrationsServiceChooseFormLink(requestParameters: FormIntegrationsServiceChooseFormLinkRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.formIntegrationsServiceChooseFormLinkRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for formIntegrationsServiceConnect without sending the request
     */
    async formIntegrationsServiceConnectRequestOpts(requestParameters: FormIntegrationsServiceConnectRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['tool'] == null) {
            throw new runtime.RequiredError(
                'tool',
                'Required parameter "tool" was null or undefined when calling formIntegrationsServiceConnect().'
            );
        }

        if (requestParameters['formIntegrationsServiceConnectBody'] == null) {
            throw new runtime.RequiredError(
                'formIntegrationsServiceConnectBody',
                'Required parameter "formIntegrationsServiceConnectBody" was null or undefined when calling formIntegrationsServiceConnect().'
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

        let urlPath = `/v1/form-integrations/{tool}/connect`;
        urlPath = urlPath.replace(`{${"tool"}}`, encodeURIComponent(String(requestParameters['tool'])));

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: FormIntegrationsServiceConnectBodyToJSON(requestParameters['formIntegrationsServiceConnectBody']),
        };
    }

    /**
     * Connect Tally, Jotform or Paperform with the account\'s API key. The forms behind the workspace\'s links are prepared at once: a hidden lbid field and a webhook. Typeform and Google Forms connect by signing in, in the dashboard; Google Forms fails here with `FORM_TOOL_SIGN_IN_REQUIRED`.  Requires the `integrations:write` scope.
     * Connect a form tool with an API key
     */
    async formIntegrationsServiceConnectRaw(requestParameters: FormIntegrationsServiceConnectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectFormToolResponse>> {
        const requestOptions = await this.formIntegrationsServiceConnectRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConnectFormToolResponseFromJSON(jsonValue));
    }

    /**
     * Connect Tally, Jotform or Paperform with the account\'s API key. The forms behind the workspace\'s links are prepared at once: a hidden lbid field and a webhook. Typeform and Google Forms connect by signing in, in the dashboard; Google Forms fails here with `FORM_TOOL_SIGN_IN_REQUIRED`.  Requires the `integrations:write` scope.
     * Connect a form tool with an API key
     */
    async formIntegrationsServiceConnect(requestParameters: FormIntegrationsServiceConnectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConnectFormToolResponse> {
        const response = await this.formIntegrationsServiceConnectRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for formIntegrationsServiceDisconnect without sending the request
     */
    async formIntegrationsServiceDisconnectRequestOpts(requestParameters: FormIntegrationsServiceDisconnectRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['tool'] == null) {
            throw new runtime.RequiredError(
                'tool',
                'Required parameter "tool" was null or undefined when calling formIntegrationsServiceDisconnect().'
            );
        }

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

        let urlPath = `/v1/form-integrations/{tool}`;
        urlPath = urlPath.replace(`{${"tool"}}`, encodeURIComponent(String(requestParameters['tool'])));

        return {
            path: urlPath,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Remove our webhooks from its forms, or for Google Forms revoke our access to the Google account, and forget the credential.  Requires the `integrations:write` scope.
     * Disconnect a form tool
     */
    async formIntegrationsServiceDisconnectRaw(requestParameters: FormIntegrationsServiceDisconnectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        const requestOptions = await this.formIntegrationsServiceDisconnectRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Remove our webhooks from its forms, or for Google Forms revoke our access to the Google account, and forget the credential.  Requires the `integrations:write` scope.
     * Disconnect a form tool
     */
    async formIntegrationsServiceDisconnect(requestParameters: FormIntegrationsServiceDisconnectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.formIntegrationsServiceDisconnectRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for formIntegrationsServiceGet without sending the request
     */
    async formIntegrationsServiceGetRequestOpts(requestParameters: FormIntegrationsServiceGetRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['tool'] == null) {
            throw new runtime.RequiredError(
                'tool',
                'Required parameter "tool" was null or undefined when calling formIntegrationsServiceGet().'
            );
        }

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

        let urlPath = `/v1/form-integrations/{tool}`;
        urlPath = urlPath.replace(`{${"tool"}}`, encodeURIComponent(String(requestParameters['tool'])));

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Return one form tool\'s connection, empty when it is not connected.  Requires the `integrations:read` scope.
     * Get a form tool connection
     */
    async formIntegrationsServiceGetRaw(requestParameters: FormIntegrationsServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetFormConnectionResponse>> {
        const requestOptions = await this.formIntegrationsServiceGetRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetFormConnectionResponseFromJSON(jsonValue));
    }

    /**
     * Return one form tool\'s connection, empty when it is not connected.  Requires the `integrations:read` scope.
     * Get a form tool connection
     */
    async formIntegrationsServiceGet(requestParameters: FormIntegrationsServiceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetFormConnectionResponse> {
        const response = await this.formIntegrationsServiceGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for formIntegrationsServiceList without sending the request
     */
    async formIntegrationsServiceListRequestOpts(): Promise<runtime.RequestOpts> {
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

        let urlPath = `/v1/form-integrations`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Return the workspace\'s connected form tools: Google Forms, Tally, Typeform, Jotform and Paperform.  Requires the `integrations:read` scope.
     * List form tool connections
     */
    async formIntegrationsServiceListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListFormConnectionsResponse>> {
        const requestOptions = await this.formIntegrationsServiceListRequestOpts();
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ListFormConnectionsResponseFromJSON(jsonValue));
    }

    /**
     * Return the workspace\'s connected form tools: Google Forms, Tally, Typeform, Jotform and Paperform.  Requires the `integrations:read` scope.
     * List form tool connections
     */
    async formIntegrationsServiceList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListFormConnectionsResponse> {
        const response = await this.formIntegrationsServiceListRaw(initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for formIntegrationsServiceListForms without sending the request
     */
    async formIntegrationsServiceListFormsRequestOpts(requestParameters: FormIntegrationsServiceListFormsRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['tool'] == null) {
            throw new runtime.RequiredError(
                'tool',
                'Required parameter "tool" was null or undefined when calling formIntegrationsServiceListForms().'
            );
        }

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

        let urlPath = `/v1/form-integrations/{tool}/forms`;
        urlPath = urlPath.replace(`{${"tool"}}`, encodeURIComponent(String(requestParameters['tool'])));

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    /**
     * Return the forms of a connected tool behind the workspace\'s links, each with whether it is ready.  Requires the `integrations:read` scope.
     * List the forms found behind links
     */
    async formIntegrationsServiceListFormsRaw(requestParameters: FormIntegrationsServiceListFormsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListFormToolFormsResponse>> {
        const requestOptions = await this.formIntegrationsServiceListFormsRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ListFormToolFormsResponseFromJSON(jsonValue));
    }

    /**
     * Return the forms of a connected tool behind the workspace\'s links, each with whether it is ready.  Requires the `integrations:read` scope.
     * List the forms found behind links
     */
    async formIntegrationsServiceListForms(requestParameters: FormIntegrationsServiceListFormsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListFormToolFormsResponse> {
        const response = await this.formIntegrationsServiceListFormsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for formIntegrationsServicePrepareForms without sending the request
     */
    async formIntegrationsServicePrepareFormsRequestOpts(requestParameters: FormIntegrationsServicePrepareFormsRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['tool'] == null) {
            throw new runtime.RequiredError(
                'tool',
                'Required parameter "tool" was null or undefined when calling formIntegrationsServicePrepareForms().'
            );
        }

        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling formIntegrationsServicePrepareForms().'
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

        let urlPath = `/v1/form-integrations/{tool}/forms/prepare`;
        urlPath = urlPath.replace(`{${"tool"}}`, encodeURIComponent(String(requestParameters['tool'])));

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['body'] as any,
        };
    }

    /**
     * Add the hidden field and webhook to every form behind a link now, rather than at the next daily check. For Google Forms, which does not send responses as they come, this also reads the responses that arrived since the last read, rather than at the next one a few minutes later.  Requires the `integrations:write` scope.
     * Check the forms again
     */
    async formIntegrationsServicePrepareFormsRaw(requestParameters: FormIntegrationsServicePrepareFormsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListFormToolFormsResponse>> {
        const requestOptions = await this.formIntegrationsServicePrepareFormsRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ListFormToolFormsResponseFromJSON(jsonValue));
    }

    /**
     * Add the hidden field and webhook to every form behind a link now, rather than at the next daily check. For Google Forms, which does not send responses as they come, this also reads the responses that arrived since the last read, rather than at the next one a few minutes later.  Requires the `integrations:write` scope.
     * Check the forms again
     */
    async formIntegrationsServicePrepareForms(requestParameters: FormIntegrationsServicePrepareFormsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListFormToolFormsResponse> {
        const response = await this.formIntegrationsServicePrepareFormsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates request options for formIntegrationsServiceUpdate without sending the request
     */
    async formIntegrationsServiceUpdateRequestOpts(requestParameters: FormIntegrationsServiceUpdateRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['tool'] == null) {
            throw new runtime.RequiredError(
                'tool',
                'Required parameter "tool" was null or undefined when calling formIntegrationsServiceUpdate().'
            );
        }

        if (requestParameters['formIntegrationsServiceUpdateBody'] == null) {
            throw new runtime.RequiredError(
                'formIntegrationsServiceUpdateBody',
                'Required parameter "formIntegrationsServiceUpdateBody" was null or undefined when calling formIntegrationsServiceUpdate().'
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

        let urlPath = `/v1/form-integrations/{tool}`;
        urlPath = urlPath.replace(`{${"tool"}}`, encodeURIComponent(String(requestParameters['tool'])));

        return {
            path: urlPath,
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: FormIntegrationsServiceUpdateBodyToJSON(requestParameters['formIntegrationsServiceUpdateBody']),
        };
    }

    /**
     * Pause or resume it, or change which links\' forms bring answers in and which answers are kept.  Requires the `integrations:write` scope.
     * Update a form tool connection
     */
    async formIntegrationsServiceUpdateRaw(requestParameters: FormIntegrationsServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdateFormConnectionResponse>> {
        const requestOptions = await this.formIntegrationsServiceUpdateRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UpdateFormConnectionResponseFromJSON(jsonValue));
    }

    /**
     * Pause or resume it, or change which links\' forms bring answers in and which answers are kept.  Requires the `integrations:write` scope.
     * Update a form tool connection
     */
    async formIntegrationsServiceUpdate(requestParameters: FormIntegrationsServiceUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdateFormConnectionResponse> {
        const response = await this.formIntegrationsServiceUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
