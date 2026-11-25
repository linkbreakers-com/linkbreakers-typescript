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
import type { AgentKnowledgeItemStatus } from './AgentKnowledgeItemStatus';
import {
    AgentKnowledgeItemStatusFromJSON,
    AgentKnowledgeItemStatusFromJSONTyped,
    AgentKnowledgeItemStatusToJSON,
    AgentKnowledgeItemStatusToJSONTyped,
} from './AgentKnowledgeItemStatus';

/**
 * One thing the agent knows: Markdown, a web page or a media file. The agent answers from the text of its items.
 * @export
 * @interface AgentKnowledgeItem
 */
export interface AgentKnowledgeItem {
    /**
     * The agent the item belongs to (UUID).
     * @type {string}
     * @memberof AgentKnowledgeItem
     */
    readonly agentId?: string;
    /**
     * What the agent knows from this item, in Markdown. For a Markdown item, the text written; for a web page or media item, the text read from it, empty until it is ready.
     * @type {string}
     * @memberof AgentKnowledgeItem
     */
    content?: string;
    /**
     * When the item was created.
     * @type {Date}
     * @memberof AgentKnowledgeItem
     */
    readonly createdAt?: Date;
    /**
     * Why the web page or file could not be read. Set only when the status is failed.
     * @type {string}
     * @memberof AgentKnowledgeItem
     */
    readonly failureReason?: string;
    /**
     * The unique identifier of the item (UUID).
     * @type {string}
     * @memberof AgentKnowledgeItem
     */
    readonly id?: string;
    /**
     * What the item is made of. It cannot change once the item exists.
     * @type {AgentKnowledgeItemKind}
     * @memberof AgentKnowledgeItem
     */
    kind?: AgentKnowledgeItemKind;
    /**
     * The media item read (UUID): a PDF or an image of the workspace's media library. Set for media items only.
     * @type {string}
     * @memberof AgentKnowledgeItem
     */
    mediaId?: string;
    /**
     * When the web page or file was last read successfully. Empty for Markdown items and for items never read.
     * @type {Date}
     * @memberof AgentKnowledgeItem
     */
    readonly readAt?: Date;
    /**
     * Whether the item's text is part of what the agent knows.
     * @type {AgentKnowledgeItemStatus}
     * @memberof AgentKnowledgeItem
     */
    readonly status?: AgentKnowledgeItemStatus;
    /**
     * The item's title. A web page or file added without one takes the page's title or the file's name.
     * @type {string}
     * @memberof AgentKnowledgeItem
     */
    title?: string;
    /**
     * When the item was last updated.
     * @type {Date}
     * @memberof AgentKnowledgeItem
     */
    readonly updatedAt?: Date;
    /**
     * The web page's http or https URL. Set for web page items only.
     * @type {string}
     * @memberof AgentKnowledgeItem
     */
    url?: string;
}



/**
 * Check if a given object implements the AgentKnowledgeItem interface.
 */
export function instanceOfAgentKnowledgeItem(value: object): value is AgentKnowledgeItem {
    return true;
}

export function AgentKnowledgeItemFromJSON(json: any): AgentKnowledgeItem {
    return AgentKnowledgeItemFromJSONTyped(json, false);
}

export function AgentKnowledgeItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): AgentKnowledgeItem {
    if (json == null) {
        return json;
    }
    return {
        
        'agentId': json['agentId'] == null ? undefined : json['agentId'],
        'content': json['content'] == null ? undefined : json['content'],
        'createdAt': json['createdAt'] == null ? undefined : (new Date(json['createdAt'])),
        'failureReason': json['failureReason'] == null ? undefined : json['failureReason'],
        'id': json['id'] == null ? undefined : json['id'],
        'kind': json['kind'] == null ? undefined : AgentKnowledgeItemKindFromJSON(json['kind']),
        'mediaId': json['mediaId'] == null ? undefined : json['mediaId'],
        'readAt': json['readAt'] == null ? undefined : (new Date(json['readAt'])),
        'status': json['status'] == null ? undefined : AgentKnowledgeItemStatusFromJSON(json['status']),
        'title': json['title'] == null ? undefined : json['title'],
        'updatedAt': json['updatedAt'] == null ? undefined : (new Date(json['updatedAt'])),
        'url': json['url'] == null ? undefined : json['url'],
    };
}

export function AgentKnowledgeItemToJSON(json: any): AgentKnowledgeItem {
    return AgentKnowledgeItemToJSONTyped(json, false);
}

export function AgentKnowledgeItemToJSONTyped(value?: Omit<AgentKnowledgeItem, 'agentId'|'createdAt'|'failureReason'|'id'|'readAt'|'status'|'updatedAt'> | null, ignoreDiscriminator: boolean = false): any {
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

