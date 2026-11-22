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

import { mapValues } from '../runtime';
import type { ContainerConfig } from './ContainerConfig';
import {
    ContainerConfigFromJSON,
    ContainerConfigFromJSONTyped,
    ContainerConfigToJSON,
    ContainerConfigToJSONTyped,
} from './ContainerConfig';
import type { FontConfig } from './FontConfig';
import {
    FontConfigFromJSON,
    FontConfigFromJSONTyped,
    FontConfigToJSON,
    FontConfigToJSONTyped,
} from './FontConfig';
import type { PageThemeElementStyleOverride } from './PageThemeElementStyleOverride';
import {
    PageThemeElementStyleOverrideFromJSON,
    PageThemeElementStyleOverrideFromJSONTyped,
    PageThemeElementStyleOverrideToJSON,
    PageThemeElementStyleOverrideToJSONTyped,
} from './PageThemeElementStyleOverride';
import type { ThemeColor } from './ThemeColor';
import {
    ThemeColorFromJSON,
    ThemeColorFromJSONTyped,
    ThemeColorToJSON,
    ThemeColorToJSONTyped,
} from './ThemeColor';
import type { PageThemeSmallText } from './PageThemeSmallText';
import {
    PageThemeSmallTextFromJSON,
    PageThemeSmallTextFromJSONTyped,
    PageThemeSmallTextToJSON,
    PageThemeSmallTextToJSONTyped,
} from './PageThemeSmallText';
import type { MediaSelection } from './MediaSelection';
import {
    MediaSelectionFromJSON,
    MediaSelectionFromJSONTyped,
    MediaSelectionToJSON,
    MediaSelectionToJSONTyped,
} from './MediaSelection';
import type { PageThemeShape } from './PageThemeShape';
import {
    PageThemeShapeFromJSON,
    PageThemeShapeFromJSONTyped,
    PageThemeShapeToJSON,
    PageThemeShapeToJSONTyped,
} from './PageThemeShape';

/**
 * The values of UpdatePageThemeRequest, without the id of one theme. Its fields
 * keep the same numbers and types.
 * @export
 * @interface BulkPageThemeValues
 */
export interface BulkPageThemeValues {
    /**
     * 
     * @type {MediaSelection}
     * @memberof BulkPageThemeValues
     */
    badge?: MediaSelection;
    /**
     * 
     * @type {boolean}
     * @memberof BulkPageThemeValues
     */
    badgeEnabled?: boolean;
    /**
     * 
     * @type {ThemeColor}
     * @memberof BulkPageThemeValues
     */
    badgeIconColor?: ThemeColor;
    /**
     * 
     * @type {BulkPageThemeValuesBadgeShapeEnum}
     * @memberof BulkPageThemeValues
     */
    badgeShape?: BulkPageThemeValuesBadgeShapeEnum;
    /**
     * How body text is aligned: descriptions, messages, helper text, and answer and button labels. Unset: centered. UNSPECIFIED on an update clears it.
     * @type {BulkPageThemeValuesBodyAlignEnum}
     * @memberof BulkPageThemeValues
     */
    bodyAlign?: BulkPageThemeValuesBodyAlignEnum;
    /**
     * 
     * @type {FontConfig}
     * @memberof BulkPageThemeValues
     */
    bodyFont?: FontConfig;
    /**
     * 
     * @type {ThemeColor}
     * @memberof BulkPageThemeValues
     */
    canvasColor?: ThemeColor;
    /**
     * 
     * @type {MediaSelection}
     * @memberof BulkPageThemeValues
     */
    canvasCover?: MediaSelection;
    /**
     * 
     * @type {BulkPageThemeValuesCanvasCoverModeEnum}
     * @memberof BulkPageThemeValues
     */
    canvasCoverMode?: BulkPageThemeValuesCanvasCoverModeEnum;
    /**
     * 
     * @type {BulkPageThemeValuesCanvasTextureEnum}
     * @memberof BulkPageThemeValues
     */
    canvasTexture?: BulkPageThemeValuesCanvasTextureEnum;
    /**
     * 
     * @type {BulkPageThemeValuesChoiceLayoutEnum}
     * @memberof BulkPageThemeValues
     */
    choiceLayout?: BulkPageThemeValuesChoiceLayoutEnum;
    /**
     * 
     * @type {ContainerConfig}
     * @memberof BulkPageThemeValues
     */
    containerConfig?: ContainerConfig;
    /**
     * 
     * @type {boolean}
     * @memberof BulkPageThemeValues
     */
    containerEnabled?: boolean;
    /**
     * 
     * @type {ThemeColor}
     * @memberof BulkPageThemeValues
     */
    elementColor?: ThemeColor;
    /**
     * 
     * @type {FontConfig}
     * @memberof BulkPageThemeValues
     */
    elementFont?: FontConfig;
    /**
     * The look of each element job (SURFACE, SELECTED, ACTION, QUIET). A job not listed follows the shape, the colours, or the look it always had.
     * @type {Array<PageThemeElementStyleOverride>}
     * @memberof BulkPageThemeValues
     */
    elementStyles?: Array<PageThemeElementStyleOverride>;
    /**
     * 
     * @type {MediaSelection}
     * @memberof BulkPageThemeValues
     */
    footerLogo?: MediaSelection;
    /**
     * 
     * @type {boolean}
     * @memberof BulkPageThemeValues
     */
    footerLogoEnabled?: boolean;
    /**
     * How titles and headline questions are aligned. Unset: centered titles, questions as the question style draws them. UNSPECIFIED on an update clears it.
     * @type {BulkPageThemeValuesHeadingAlignEnum}
     * @memberof BulkPageThemeValues
     */
    headingAlign?: BulkPageThemeValuesHeadingAlignEnum;
    /**
     * 
     * @type {BulkPageThemeValuesQuestionStyleEnum}
     * @memberof BulkPageThemeValues
     */
    questionStyle?: BulkPageThemeValuesQuestionStyleEnum;
    /**
     * The radius and border every job follows unless it has its own.
     * @type {PageThemeShape}
     * @memberof BulkPageThemeValues
     */
    shape?: PageThemeShape;
    /**
     * Small text: hints, counters, consent. Unset: the body text, smaller and muted.
     * @type {PageThemeSmallText}
     * @memberof BulkPageThemeValues
     */
    smallText?: PageThemeSmallText;
    /**
     * The text colour headings, body and small text follow when their own font has none. On an update, a colour without colours clears it.
     * @type {ThemeColor}
     * @memberof BulkPageThemeValues
     */
    textColor?: ThemeColor;
    /**
     * 
     * @type {FontConfig}
     * @memberof BulkPageThemeValues
     */
    titleFont?: FontConfig;
    /**
     * 
     * @type {BulkPageThemeValuesVisitorExperienceEnum}
     * @memberof BulkPageThemeValues
     */
    visitorExperience?: BulkPageThemeValuesVisitorExperienceEnum;
}


/**
 * @export
 */
export const BulkPageThemeValuesBadgeShapeEnum = {
    PageThemeBadgeShapeUnspecified: 'PAGE_THEME_BADGE_SHAPE_UNSPECIFIED',
    PageThemeBadgeShapeCircle: 'PAGE_THEME_BADGE_SHAPE_CIRCLE',
    PageThemeBadgeShapeSquare: 'PAGE_THEME_BADGE_SHAPE_SQUARE',
    PageThemeBadgeShapeRounded: 'PAGE_THEME_BADGE_SHAPE_ROUNDED'
} as const;
export type BulkPageThemeValuesBadgeShapeEnum = typeof BulkPageThemeValuesBadgeShapeEnum[keyof typeof BulkPageThemeValuesBadgeShapeEnum];

/**
 * @export
 */
export const BulkPageThemeValuesBodyAlignEnum = {
    PageThemeTextAlignUnspecified: 'PAGE_THEME_TEXT_ALIGN_UNSPECIFIED',
    PageThemeTextAlignCenter: 'PAGE_THEME_TEXT_ALIGN_CENTER',
    PageThemeTextAlignLeft: 'PAGE_THEME_TEXT_ALIGN_LEFT'
} as const;
export type BulkPageThemeValuesBodyAlignEnum = typeof BulkPageThemeValuesBodyAlignEnum[keyof typeof BulkPageThemeValuesBodyAlignEnum];

/**
 * @export
 */
export const BulkPageThemeValuesCanvasCoverModeEnum = {
    PageThemeBackgroundCoverModeUnspecified: 'PAGE_THEME_BACKGROUND_COVER_MODE_UNSPECIFIED',
    PageThemeBackgroundCoverModeFull: 'PAGE_THEME_BACKGROUND_COVER_MODE_FULL',
    PageThemeBackgroundCoverModeProgressiveTop: 'PAGE_THEME_BACKGROUND_COVER_MODE_PROGRESSIVE_TOP',
    PageThemeBackgroundCoverModeProgressiveBottom: 'PAGE_THEME_BACKGROUND_COVER_MODE_PROGRESSIVE_BOTTOM'
} as const;
export type BulkPageThemeValuesCanvasCoverModeEnum = typeof BulkPageThemeValuesCanvasCoverModeEnum[keyof typeof BulkPageThemeValuesCanvasCoverModeEnum];

/**
 * @export
 */
export const BulkPageThemeValuesCanvasTextureEnum = {
    PageThemeCanvasTextureUnspecified: 'PAGE_THEME_CANVAS_TEXTURE_UNSPECIFIED',
    PageThemeCanvasTextureNone: 'PAGE_THEME_CANVAS_TEXTURE_NONE',
    PageThemeCanvasTextureBrushed: 'PAGE_THEME_CANVAS_TEXTURE_BRUSHED',
    PageThemeCanvasTextureGrain: 'PAGE_THEME_CANVAS_TEXTURE_GRAIN',
    PageThemeCanvasTextureStarfield: 'PAGE_THEME_CANVAS_TEXTURE_STARFIELD'
} as const;
export type BulkPageThemeValuesCanvasTextureEnum = typeof BulkPageThemeValuesCanvasTextureEnum[keyof typeof BulkPageThemeValuesCanvasTextureEnum];

/**
 * @export
 */
export const BulkPageThemeValuesChoiceLayoutEnum = {
    PageThemeChoiceLayoutUnspecified: 'PAGE_THEME_CHOICE_LAYOUT_UNSPECIFIED',
    PageThemeChoiceLayoutAuto: 'PAGE_THEME_CHOICE_LAYOUT_AUTO',
    PageThemeChoiceLayoutRows: 'PAGE_THEME_CHOICE_LAYOUT_ROWS'
} as const;
export type BulkPageThemeValuesChoiceLayoutEnum = typeof BulkPageThemeValuesChoiceLayoutEnum[keyof typeof BulkPageThemeValuesChoiceLayoutEnum];

/**
 * @export
 */
export const BulkPageThemeValuesHeadingAlignEnum = {
    PageThemeTextAlignUnspecified: 'PAGE_THEME_TEXT_ALIGN_UNSPECIFIED',
    PageThemeTextAlignCenter: 'PAGE_THEME_TEXT_ALIGN_CENTER',
    PageThemeTextAlignLeft: 'PAGE_THEME_TEXT_ALIGN_LEFT'
} as const;
export type BulkPageThemeValuesHeadingAlignEnum = typeof BulkPageThemeValuesHeadingAlignEnum[keyof typeof BulkPageThemeValuesHeadingAlignEnum];

/**
 * @export
 */
export const BulkPageThemeValuesQuestionStyleEnum = {
    PageThemeQuestionStyleUnspecified: 'PAGE_THEME_QUESTION_STYLE_UNSPECIFIED',
    PageThemeQuestionStyleLabel: 'PAGE_THEME_QUESTION_STYLE_LABEL',
    PageThemeQuestionStyleHeadline: 'PAGE_THEME_QUESTION_STYLE_HEADLINE'
} as const;
export type BulkPageThemeValuesQuestionStyleEnum = typeof BulkPageThemeValuesQuestionStyleEnum[keyof typeof BulkPageThemeValuesQuestionStyleEnum];

/**
 * @export
 */
export const BulkPageThemeValuesVisitorExperienceEnum = {
    PageThemeVisitorExperienceUnspecified: 'PAGE_THEME_VISITOR_EXPERIENCE_UNSPECIFIED',
    PageThemeVisitorExperienceClassic: 'PAGE_THEME_VISITOR_EXPERIENCE_CLASSIC',
    PageThemeVisitorExperienceFocused: 'PAGE_THEME_VISITOR_EXPERIENCE_FOCUSED'
} as const;
export type BulkPageThemeValuesVisitorExperienceEnum = typeof BulkPageThemeValuesVisitorExperienceEnum[keyof typeof BulkPageThemeValuesVisitorExperienceEnum];


/**
 * Check if a given object implements the BulkPageThemeValues interface.
 */
export function instanceOfBulkPageThemeValues(value: object): value is BulkPageThemeValues {
    return true;
}

export function BulkPageThemeValuesFromJSON(json: any): BulkPageThemeValues {
    return BulkPageThemeValuesFromJSONTyped(json, false);
}

export function BulkPageThemeValuesFromJSONTyped(json: any, ignoreDiscriminator: boolean): BulkPageThemeValues {
    if (json == null) {
        return json;
    }
    return {
        
        'badge': json['badge'] == null ? undefined : MediaSelectionFromJSON(json['badge']),
        'badgeEnabled': json['badgeEnabled'] == null ? undefined : json['badgeEnabled'],
        'badgeIconColor': json['badgeIconColor'] == null ? undefined : ThemeColorFromJSON(json['badgeIconColor']),
        'badgeShape': json['badgeShape'] == null ? undefined : json['badgeShape'],
        'bodyAlign': json['bodyAlign'] == null ? undefined : json['bodyAlign'],
        'bodyFont': json['bodyFont'] == null ? undefined : FontConfigFromJSON(json['bodyFont']),
        'canvasColor': json['canvasColor'] == null ? undefined : ThemeColorFromJSON(json['canvasColor']),
        'canvasCover': json['canvasCover'] == null ? undefined : MediaSelectionFromJSON(json['canvasCover']),
        'canvasCoverMode': json['canvasCoverMode'] == null ? undefined : json['canvasCoverMode'],
        'canvasTexture': json['canvasTexture'] == null ? undefined : json['canvasTexture'],
        'choiceLayout': json['choiceLayout'] == null ? undefined : json['choiceLayout'],
        'containerConfig': json['containerConfig'] == null ? undefined : ContainerConfigFromJSON(json['containerConfig']),
        'containerEnabled': json['containerEnabled'] == null ? undefined : json['containerEnabled'],
        'elementColor': json['elementColor'] == null ? undefined : ThemeColorFromJSON(json['elementColor']),
        'elementFont': json['elementFont'] == null ? undefined : FontConfigFromJSON(json['elementFont']),
        'elementStyles': json['elementStyles'] == null ? undefined : ((json['elementStyles'] as Array<any>).map(PageThemeElementStyleOverrideFromJSON)),
        'footerLogo': json['footerLogo'] == null ? undefined : MediaSelectionFromJSON(json['footerLogo']),
        'footerLogoEnabled': json['footerLogoEnabled'] == null ? undefined : json['footerLogoEnabled'],
        'headingAlign': json['headingAlign'] == null ? undefined : json['headingAlign'],
        'questionStyle': json['questionStyle'] == null ? undefined : json['questionStyle'],
        'shape': json['shape'] == null ? undefined : PageThemeShapeFromJSON(json['shape']),
        'smallText': json['smallText'] == null ? undefined : PageThemeSmallTextFromJSON(json['smallText']),
        'textColor': json['textColor'] == null ? undefined : ThemeColorFromJSON(json['textColor']),
        'titleFont': json['titleFont'] == null ? undefined : FontConfigFromJSON(json['titleFont']),
        'visitorExperience': json['visitorExperience'] == null ? undefined : json['visitorExperience'],
    };
}

export function BulkPageThemeValuesToJSON(json: any): BulkPageThemeValues {
    return BulkPageThemeValuesToJSONTyped(json, false);
}

export function BulkPageThemeValuesToJSONTyped(value?: BulkPageThemeValues | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'badge': MediaSelectionToJSON(value['badge']),
        'badgeEnabled': value['badgeEnabled'],
        'badgeIconColor': ThemeColorToJSON(value['badgeIconColor']),
        'badgeShape': value['badgeShape'],
        'bodyAlign': value['bodyAlign'],
        'bodyFont': FontConfigToJSON(value['bodyFont']),
        'canvasColor': ThemeColorToJSON(value['canvasColor']),
        'canvasCover': MediaSelectionToJSON(value['canvasCover']),
        'canvasCoverMode': value['canvasCoverMode'],
        'canvasTexture': value['canvasTexture'],
        'choiceLayout': value['choiceLayout'],
        'containerConfig': ContainerConfigToJSON(value['containerConfig']),
        'containerEnabled': value['containerEnabled'],
        'elementColor': ThemeColorToJSON(value['elementColor']),
        'elementFont': FontConfigToJSON(value['elementFont']),
        'elementStyles': value['elementStyles'] == null ? undefined : ((value['elementStyles'] as Array<any>).map(PageThemeElementStyleOverrideToJSON)),
        'footerLogo': MediaSelectionToJSON(value['footerLogo']),
        'footerLogoEnabled': value['footerLogoEnabled'],
        'headingAlign': value['headingAlign'],
        'questionStyle': value['questionStyle'],
        'shape': PageThemeShapeToJSON(value['shape']),
        'smallText': PageThemeSmallTextToJSON(value['smallText']),
        'textColor': ThemeColorToJSON(value['textColor']),
        'titleFont': FontConfigToJSON(value['titleFont']),
        'visitorExperience': value['visitorExperience'],
    };
}

