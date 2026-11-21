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

import { mapValues } from '../runtime';
import type { FontConfig } from './FontConfig';
import {
    FontConfigFromJSON,
    FontConfigFromJSONTyped,
    FontConfigToJSON,
    FontConfigToJSONTyped,
} from './FontConfig';
import type { ThemeColor } from './ThemeColor';
import {
    ThemeColorFromJSON,
    ThemeColorFromJSONTyped,
    ThemeColorToJSON,
    ThemeColorToJSONTyped,
} from './ThemeColor';

/**
 * The look of one role: one kind of visible thing, on every page that shows it.
 * 
 * Every setting is optional: one left unset keeps what the role inherits from
 * the theme's base styles (titleFont, bodyFont, elementFont, elementColor)
 * or, for fields and chat bubbles, the look visitor pages always had. A role
 * with nothing set is the role as it was before roles existed.
 * @export
 * @interface PageThemeRoleStyle
 */
export interface PageThemeRoleStyle {
    /**
     * Choices: the fill of a picked answer and its indicator. Fields: the focus ring.
     * @type {ThemeColor}
     * @memberof PageThemeRoleStyle
     */
    accent?: ThemeColor;
    /**
     * Border colour.
     * @type {ThemeColor}
     * @memberof PageThemeRoleStyle
     */
    borderColor?: ThemeColor;
    /**
     * Border width in pixels, 0 to 12. 0 removes the border.
     * @type {number}
     * @memberof PageThemeRoleStyle
     */
    borderSize?: number;
    /**
     * Its background. An rgba colour makes it translucent (glass).
     * @type {ThemeColor}
     * @memberof PageThemeRoleStyle
     */
    fill?: ThemeColor;
    /**
     * Its text: family, bold, italic, size and colour.
     * @type {FontConfig}
     * @memberof PageThemeRoleStyle
     */
    font?: FontConfig;
    /**
     * Fields only: the colour of the placeholder text.
     * @type {ThemeColor}
     * @memberof PageThemeRoleStyle
     */
    placeholderColor?: ThemeColor;
    /**
     * Corner radius in pixels, 0 to 999 (999 draws a pill).
     * @type {number}
     * @memberof PageThemeRoleStyle
     */
    radius?: number;
}

/**
 * Check if a given object implements the PageThemeRoleStyle interface.
 */
export function instanceOfPageThemeRoleStyle(value: object): value is PageThemeRoleStyle {
    return true;
}

export function PageThemeRoleStyleFromJSON(json: any): PageThemeRoleStyle {
    return PageThemeRoleStyleFromJSONTyped(json, false);
}

export function PageThemeRoleStyleFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageThemeRoleStyle {
    if (json == null) {
        return json;
    }
    return {
        
        'accent': json['accent'] == null ? undefined : ThemeColorFromJSON(json['accent']),
        'borderColor': json['borderColor'] == null ? undefined : ThemeColorFromJSON(json['borderColor']),
        'borderSize': json['borderSize'] == null ? undefined : json['borderSize'],
        'fill': json['fill'] == null ? undefined : ThemeColorFromJSON(json['fill']),
        'font': json['font'] == null ? undefined : FontConfigFromJSON(json['font']),
        'placeholderColor': json['placeholderColor'] == null ? undefined : ThemeColorFromJSON(json['placeholderColor']),
        'radius': json['radius'] == null ? undefined : json['radius'],
    };
}

export function PageThemeRoleStyleToJSON(json: any): PageThemeRoleStyle {
    return PageThemeRoleStyleToJSONTyped(json, false);
}

export function PageThemeRoleStyleToJSONTyped(value?: PageThemeRoleStyle | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'accent': ThemeColorToJSON(value['accent']),
        'borderColor': ThemeColorToJSON(value['borderColor']),
        'borderSize': value['borderSize'],
        'fill': ThemeColorToJSON(value['fill']),
        'font': FontConfigToJSON(value['font']),
        'placeholderColor': ThemeColorToJSON(value['placeholderColor']),
        'radius': value['radius'],
    };
}

