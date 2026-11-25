/* tslint:disable */
/* eslint-disable */
/**
 * Linkbreakers API
 * The Linkbreakers REST API: links, QR codes, workflows, visitors and analytics, as JSON over HTTPS. Send a workspace API token as `Authorization: Bearer <token>`.  ## Entry points  `GET https://api.linkbreakers.com/` and `GET https://api.linkbreakers.com/v1` answer without credentials with the API\'s name, version and links. This document is served at `https://api.linkbreakers.com/openapi.json`.  ## Rate limits  Every response describes where the caller stands in the IETF `RateLimit-Policy` and `RateLimit` header fields (draft-ietf-httpapi-ratelimit-headers), and in `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` and `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` (a Unix timestamp) for clients that read those. A request past the limit gets `429 Too Many Requests` with `Retry-After` in seconds.  - Workspace API token: 720 requests per 60 seconds, per token. - Dashboard session or OAuth token: 600 requests per 60 seconds, per token. - No credentials: 300 requests per 60 seconds, per client IP.  Each plan also includes a number of API calls per billing cycle. Past it, calls answer `429` with the code `MAX_PUBLIC_API_QUERIED_REACHED` until the cycle renews or the plan changes.  ## Pagination  Every list pages with opaque cursors (AIP-158). Pass `pageSize`, then send the `nextPageToken` of each response back as `pageToken` (or its alias `cursor`) to get the next page. An empty or absent `nextPageToken` means the list is complete. Each list operation describes this in `x-pagination`.  ## Batches and background jobs  `POST /v1/links/bulk` creates up to 250 links in one transactional request; `POST /v1/links/batch` takes the same links as a bare JSON array. `POST /v1/links/bulk/jobs` accepts the same batch and answers `202 Accepted` at once with a link job and a `Location` header; poll `GET /v1/links/jobs/{id}` until `status` is `LINK_JOB_STATUS_SUCCEEDED` (the created link ids are in `linksBulkCreate.linkIds`) or `LINK_JOB_STATUS_FAILED` (`error` says why, and nothing was created). Link jobs can be read for 24 hours after they finish.  ## Paused workspaces  A free workspace whose members have not verified any email address is paused 7 days after sign-up. Its calls then answer `403` with the code `WORKSPACE_UNVERIFIED` and change nothing; QR codes and links keep working for visitors. To lift the pause, ask the workspace owner to verify their email: `POST /v1/members/email-verification` sends the verification email again, and works while the workspace is paused. `unverifiedPauseAt` on the workspace says when the pause starts.  ## Versioning and deprecation  The version is in the path: every operation lives under `/v1`. Within a version, changes are additive only: new operations, new optional request fields, new response fields and new enum values. Clients should ignore fields and enum values they do not know. Anything that would break an existing client ships under a new path version instead.  An operation is retired in two steps. First it is deprecated: it keeps working, is flagged `deprecated: true` in this document, and every response carries a `Deprecation` header field (RFC 9745) with the time it was deprecated and a `Link` with `rel=\"deprecation\"` to the policy. Then, at least 180 days later, it may be removed; that date is announced in advance in a `Sunset` header field (RFC 8594) and as `x-sunset` on the operation. The full policy: https://linkbreakers.com/help/article/api-versioning-and-deprecation-policy  A renamed operation keeps answering its former path while clients still call it, until that path\'s sunset at the latest: a former path no client calls for 14 days is removed. Responses on a former path carry the same `Deprecation`, `Sunset` and `Link` header fields; this document lists only the current path, and the policy lists the former paths that still answer.  ## Idempotent retries  Every POST, PUT and PATCH accepts an optional `Idempotency-Key` header (draft-ietf-httpapi-idempotency-key-header). Send a new unique value, such as a UUID, with each logical request and reuse it only to retry that request. A retry with the same key and the same request returns the first response, marked `Idempotent-Replayed: true`, instead of running again. Keys are scoped to the token and kept for 24 hours. The same key with a different request is refused with `422`, and a retry while the first request is still running gets `409` with `Retry-After`. Server errors (5xx) and refusals such as 401, 403 and 429 are not stored, so retrying them runs the request again.  ## Identifying your client  Send a `Linkbreakers-Client` request header saying which client made the call: `<client>/<version> (<details>)`, for example `my-integration/1.2.0 (python 3.12; linux)`. The official SDKs, the CLI and the MCP bridge set it for you, as `sdk-python/2.3.1 (python 3.12.4; linux)` or `cli/1.4.0 (darwin arm64)`. It is optional and changes nothing about how a request is handled; it tells us which clients and versions are in use, so we know what can be retired and what to fix first. Keep the details short and free of personal data. Browsers may send it too: it is allowed by CORS.
 *
 * The version of the OpenAPI document: 1.205.2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { AgentKnowledgeItemKind } from './AgentKnowledgeItemKind';
import {
    AgentKnowledgeItemKindFromJSON,
    AgentKnowledgeItemKindFromJSONTyped,
    AgentKnowledgeItemKindToJSON,
    AgentKnowledgeItemKindToJSONTyped,
} from './AgentKnowledgeItemKind';

/**
 * Adds a knowledge item to an agent: Markdown written in it, a web page read from its URL, or a PDF or image of the media library.
 * @export
 * @interface AgentsServiceCreateKnowledgeItemBody
 */
export interface AgentsServiceCreateKnowledgeItemBody {
    /**
     * The Markdown text, for a Markdown item only.
     * @type {string}
     * @memberof AgentsServiceCreateKnowledgeItemBody
     */
    content?: string;
    /**
     * What the item is made of: MARKDOWN takes content, WEB_PAGE takes url, MEDIA takes mediaId.
     * @type {AgentKnowledgeItemKind}
     * @memberof AgentsServiceCreateKnowledgeItemBody
     */
    kind: AgentKnowledgeItemKind;
    /**
     * The media item to read (UUID), for a media item only: a PDF or an image of the workspace's media library.
     * @type {string}
     * @memberof AgentsServiceCreateKnowledgeItemBody
     */
    mediaId?: string;
    /**
     * The item's title. Required for a Markdown item; a web page or file left without one takes the page's title or the file's name.
     * @type {string}
     * @memberof AgentsServiceCreateKnowledgeItemBody
     */
    title?: string;
    /**
     * The web page's http or https URL, for a web page item only. One item reads one page.
     * @type {string}
     * @memberof AgentsServiceCreateKnowledgeItemBody
     */
    url?: string;
}



/**
 * Check if a given object implements the AgentsServiceCreateKnowledgeItemBody interface.
 */
export function instanceOfAgentsServiceCreateKnowledgeItemBody(value: object): value is AgentsServiceCreateKnowledgeItemBody {
    if (!('kind' in value) || value['kind'] === undefined) return false;
    return true;
}

export function AgentsServiceCreateKnowledgeItemBodyFromJSON(json: any): AgentsServiceCreateKnowledgeItemBody {
    return AgentsServiceCreateKnowledgeItemBodyFromJSONTyped(json, false);
}

export function AgentsServiceCreateKnowledgeItemBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): AgentsServiceCreateKnowledgeItemBody {
    if (json == null) {
        return json;
    }
    return {
        
        'content': json['content'] == null ? undefined : json['content'],
        'kind': AgentKnowledgeItemKindFromJSON(json['kind']),
        'mediaId': json['mediaId'] == null ? undefined : json['mediaId'],
        'title': json['title'] == null ? undefined : json['title'],
        'url': json['url'] == null ? undefined : json['url'],
    };
}

export function AgentsServiceCreateKnowledgeItemBodyToJSON(json: any): AgentsServiceCreateKnowledgeItemBody {
    return AgentsServiceCreateKnowledgeItemBodyToJSONTyped(json, false);
}

export function AgentsServiceCreateKnowledgeItemBodyToJSONTyped(value?: AgentsServiceCreateKnowledgeItemBody | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'content': value['content'],
        'kind': AgentKnowledgeItemKindToJSON(value['kind']),
        'mediaId': value['mediaId'],
        'title': value['title'],
        'url': value['url'],
    };
}

