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
import type { PageThemeShape } from './PageThemeShape';
import {
    PageThemeShapeFromJSON,
    PageThemeShapeFromJSONTyped,
    PageThemeShapeToJSON,
    PageThemeShapeToJSONTyped,
} from './PageThemeShape';

/**
 * 
 * @export
 * @interface PageTheme
 */
export interface PageTheme {
    /**
     * 
     * @type {boolean}
     * @memberof PageTheme
     */
    badgeEnabled?: boolean;
    /**
     * 
     * @type {ThemeColor}
     * @memberof PageTheme
     */
    badgeIconColor?: ThemeColor;
    /**
     * 
     * @type {string}
     * @memberof PageTheme
     */
    badgeId?: string;
    /**
     * 
     * @type {PageThemeBadgeShapeEnum}
     * @memberof PageTheme
     */
    badgeShape?: PageThemeBadgeShapeEnum;
    /**
     * How body text is aligned: descriptions, messages, helper text, and answer and button labels. Unset: centered. UNSPECIFIED on an update clears it.
     * @type {PageThemeBodyAlignEnum}
     * @memberof PageTheme
     */
    bodyAlign?: PageThemeBodyAlignEnum;
    /**
     * 
     * @type {FontConfig}
     * @memberof PageTheme
     */
    bodyFont?: FontConfig;
    /**
     * 
     * @type {ThemeColor}
     * @memberof PageTheme
     */
    canvasColor?: ThemeColor;
    /**
     * 
     * @type {string}
     * @memberof PageTheme
     */
    canvasCoverId?: string;
    /**
     * 
     * @type {PageThemeCanvasCoverModeEnum}
     * @memberof PageTheme
     */
    canvasCoverMode?: PageThemeCanvasCoverModeEnum;
    /**
     * A texture laid over the page background. Unset reads as NONE.
     * @type {PageThemeCanvasTextureEnum}
     * @memberof PageTheme
     */
    canvasTexture?: PageThemeCanvasTextureEnum;
    /**
     * How a choice question lays out its answers: AUTO (pills or tiles) or ROWS. Unset reads as AUTO.
     * @type {PageThemeChoiceLayoutEnum}
     * @memberof PageTheme
     */
    choiceLayout?: PageThemeChoiceLayoutEnum;
    /**
     * 
     * @type {ContainerConfig}
     * @memberof PageTheme
     */
    containerConfig?: ContainerConfig;
    /**
     * 
     * @type {boolean}
     * @memberof PageTheme
     */
    containerEnabled?: boolean;
    /**
     * 
     * @type {Date}
     * @memberof PageTheme
     */
    readonly createdAt?: Date;
    /**
     * 
     * @type {ThemeColor}
     * @memberof PageTheme
     */
    elementColor?: ThemeColor;
    /**
     * 
     * @type {FontConfig}
     * @memberof PageTheme
     */
    elementFont?: FontConfig;
    /**
     * The look of each element job (SURFACE, SELECTED, ACTION, QUIET). A job not listed follows the shape, the colours, or the look it always had.
     * @type {Array<PageThemeElementStyleOverride>}
     * @memberof PageTheme
     */
    elementStyles?: Array<PageThemeElementStyleOverride>;
    /**
     * Whether the footer logo (a small company or brand logo centered at the bottom of every page using this theme) is shown.
     * 
     * Turning it off keeps footerLogoId, so turning it back on restores the
     * same image.
     * @type {boolean}
     * @memberof PageTheme
     */
    footerLogoEnabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PageTheme
     */
    footerLogoId?: string;
    /**
     * How titles and headline questions are aligned. Unset: centered titles, questions as the question style draws them. UNSPECIFIED on an update clears it.
     * @type {PageThemeHeadingAlignEnum}
     * @memberof PageTheme
     */
    headingAlign?: PageThemeHeadingAlignEnum;
    /**
     * 
     * @type {string}
     * @memberof PageTheme
     */
    readonly id?: string;
    /**
     * How a form's questions are written: LABEL (small, in the body text) or HEADLINE (a heading, in the title font). Unset reads as LABEL.
     * @type {PageThemeQuestionStyleEnum}
     * @memberof PageTheme
     */
    questionStyle?: PageThemeQuestionStyleEnum;
    /**
     * The radius and border every job follows unless it has its own.
     * @type {PageThemeShape}
     * @memberof PageTheme
     */
    shape?: PageThemeShape;
    /**
     * Small text: hints, counters, consent. Unset: the body text, smaller and muted.
     * @type {PageThemeSmallText}
     * @memberof PageTheme
     */
    smallText?: PageThemeSmallText;
    /**
     * The text colour headings, body and small text follow when their own font has none. On an update, a colour without colours clears it.
     * @type {ThemeColor}
     * @memberof PageTheme
     */
    textColor?: ThemeColor;
    /**
     * 
     * @type {FontConfig}
     * @memberof PageTheme
     */
    titleFont?: FontConfig;
    /**
     * 
     * @type {Date}
     * @memberof PageTheme
     */
    readonly updatedAt?: Date;
    /**
     * How visitor pages pace their content. Unset reads as CLASSIC.
     * @type {PageThemeVisitorExperienceEnum}
     * @memberof PageTheme
     */
    visitorExperience?: PageThemeVisitorExperienceEnum;
    /**
     * 
     * @type {string}
     * @memberof PageTheme
     */
    readonly workspaceId?: string;
}


/**
 * @export
 */
export const PageThemeBadgeShapeEnum = {
    PageThemeBadgeShapeUnspecified: 'PAGE_THEME_BADGE_SHAPE_UNSPECIFIED',
    PageThemeBadgeShapeCircle: 'PAGE_THEME_BADGE_SHAPE_CIRCLE',
    PageThemeBadgeShapeSquare: 'PAGE_THEME_BADGE_SHAPE_SQUARE',
    PageThemeBadgeShapeRounded: 'PAGE_THEME_BADGE_SHAPE_ROUNDED'
} as const;
export type PageThemeBadgeShapeEnum = typeof PageThemeBadgeShapeEnum[keyof typeof PageThemeBadgeShapeEnum];

/**
 * @export
 */
export const PageThemeBodyAlignEnum = {
    PageThemeTextAlignUnspecified: 'PAGE_THEME_TEXT_ALIGN_UNSPECIFIED',
    PageThemeTextAlignCenter: 'PAGE_THEME_TEXT_ALIGN_CENTER',
    PageThemeTextAlignLeft: 'PAGE_THEME_TEXT_ALIGN_LEFT'
} as const;
export type PageThemeBodyAlignEnum = typeof PageThemeBodyAlignEnum[keyof typeof PageThemeBodyAlignEnum];

/**
 * @export
 */
export const PageThemeCanvasCoverModeEnum = {
    PageThemeBackgroundCoverModeUnspecified: 'PAGE_THEME_BACKGROUND_COVER_MODE_UNSPECIFIED',
    PageThemeBackgroundCoverModeFull: 'PAGE_THEME_BACKGROUND_COVER_MODE_FULL',
    PageThemeBackgroundCoverModeProgressiveTop: 'PAGE_THEME_BACKGROUND_COVER_MODE_PROGRESSIVE_TOP',
    PageThemeBackgroundCoverModeProgressiveBottom: 'PAGE_THEME_BACKGROUND_COVER_MODE_PROGRESSIVE_BOTTOM'
} as const;
export type PageThemeCanvasCoverModeEnum = typeof PageThemeCanvasCoverModeEnum[keyof typeof PageThemeCanvasCoverModeEnum];

/**
 * @export
 */
export const PageThemeCanvasTextureEnum = {
    PageThemeCanvasTextureUnspecified: 'PAGE_THEME_CANVAS_TEXTURE_UNSPECIFIED',
    PageThemeCanvasTextureNone: 'PAGE_THEME_CANVAS_TEXTURE_NONE',
    PageThemeCanvasTextureBrushed: 'PAGE_THEME_CANVAS_TEXTURE_BRUSHED',
    PageThemeCanvasTextureGrain: 'PAGE_THEME_CANVAS_TEXTURE_GRAIN',
    PageThemeCanvasTextureStarfield: 'PAGE_THEME_CANVAS_TEXTURE_STARFIELD'
} as const;
export type PageThemeCanvasTextureEnum = typeof PageThemeCanvasTextureEnum[keyof typeof PageThemeCanvasTextureEnum];

/**
 * @export
 */
export const PageThemeChoiceLayoutEnum = {
    PageThemeChoiceLayoutUnspecified: 'PAGE_THEME_CHOICE_LAYOUT_UNSPECIFIED',
    PageThemeChoiceLayoutAuto: 'PAGE_THEME_CHOICE_LAYOUT_AUTO',
    PageThemeChoiceLayoutRows: 'PAGE_THEME_CHOICE_LAYOUT_ROWS'
} as const;
export type PageThemeChoiceLayoutEnum = typeof PageThemeChoiceLayoutEnum[keyof typeof PageThemeChoiceLayoutEnum];

/**
 * @export
 */
export const PageThemeHeadingAlignEnum = {
    PageThemeTextAlignUnspecified: 'PAGE_THEME_TEXT_ALIGN_UNSPECIFIED',
    PageThemeTextAlignCenter: 'PAGE_THEME_TEXT_ALIGN_CENTER',
    PageThemeTextAlignLeft: 'PAGE_THEME_TEXT_ALIGN_LEFT'
} as const;
export type PageThemeHeadingAlignEnum = typeof PageThemeHeadingAlignEnum[keyof typeof PageThemeHeadingAlignEnum];

/**
 * @export
 */
export const PageThemeQuestionStyleEnum = {
    PageThemeQuestionStyleUnspecified: 'PAGE_THEME_QUESTION_STYLE_UNSPECIFIED',
    PageThemeQuestionStyleLabel: 'PAGE_THEME_QUESTION_STYLE_LABEL',
    PageThemeQuestionStyleHeadline: 'PAGE_THEME_QUESTION_STYLE_HEADLINE'
} as const;
export type PageThemeQuestionStyleEnum = typeof PageThemeQuestionStyleEnum[keyof typeof PageThemeQuestionStyleEnum];

/**
 * @export
 */
export const PageThemeVisitorExperienceEnum = {
    PageThemeVisitorExperienceUnspecified: 'PAGE_THEME_VISITOR_EXPERIENCE_UNSPECIFIED',
    PageThemeVisitorExperienceClassic: 'PAGE_THEME_VISITOR_EXPERIENCE_CLASSIC',
    PageThemeVisitorExperienceFocused: 'PAGE_THEME_VISITOR_EXPERIENCE_FOCUSED'
} as const;
export type PageThemeVisitorExperienceEnum = typeof PageThemeVisitorExperienceEnum[keyof typeof PageThemeVisitorExperienceEnum];


/**
 * Check if a given object implements the PageTheme interface.
 */
export function instanceOfPageTheme(value: object): value is PageTheme {
    return true;
}

export function PageThemeFromJSON(json: any): PageTheme {
    return PageThemeFromJSONTyped(json, false);
}

export function PageThemeFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageTheme {
    if (json == null) {
        return json;
    }
    return {
        
        'badgeEnabled': json['badgeEnabled'] == null ? undefined : json['badgeEnabled'],
        'badgeIconColor': json['badgeIconColor'] == null ? undefined : ThemeColorFromJSON(json['badgeIconColor']),
        'badgeId': json['badgeId'] == null ? undefined : json['badgeId'],
        'badgeShape': json['badgeShape'] == null ? undefined : json['badgeShape'],
        'bodyAlign': json['bodyAlign'] == null ? undefined : json['bodyAlign'],
        'bodyFont': json['bodyFont'] == null ? undefined : FontConfigFromJSON(json['bodyFont']),
        'canvasColor': json['canvasColor'] == null ? undefined : ThemeColorFromJSON(json['canvasColor']),
        'canvasCoverId': json['canvasCoverId'] == null ? undefined : json['canvasCoverId'],
        'canvasCoverMode': json['canvasCoverMode'] == null ? undefined : json['canvasCoverMode'],
        'canvasTexture': json['canvasTexture'] == null ? undefined : json['canvasTexture'],
        'choiceLayout': json['choiceLayout'] == null ? undefined : json['choiceLayout'],
        'containerConfig': json['containerConfig'] == null ? undefined : ContainerConfigFromJSON(json['containerConfig']),
        'containerEnabled': json['containerEnabled'] == null ? undefined : json['containerEnabled'],
        'createdAt': json['createdAt'] == null ? undefined : (new Date(json['createdAt'])),
        'elementColor': json['elementColor'] == null ? undefined : ThemeColorFromJSON(json['elementColor']),
        'elementFont': json['elementFont'] == null ? undefined : FontConfigFromJSON(json['elementFont']),
        'elementStyles': json['elementStyles'] == null ? undefined : ((json['elementStyles'] as Array<any>).map(PageThemeElementStyleOverrideFromJSON)),
        'footerLogoEnabled': json['footerLogoEnabled'] == null ? undefined : json['footerLogoEnabled'],
        'footerLogoId': json['footerLogoId'] == null ? undefined : json['footerLogoId'],
        'headingAlign': json['headingAlign'] == null ? undefined : json['headingAlign'],
        'id': json['id'] == null ? undefined : json['id'],
        'questionStyle': json['questionStyle'] == null ? undefined : json['questionStyle'],
        'shape': json['shape'] == null ? undefined : PageThemeShapeFromJSON(json['shape']),
        'smallText': json['smallText'] == null ? undefined : PageThemeSmallTextFromJSON(json['smallText']),
        'textColor': json['textColor'] == null ? undefined : ThemeColorFromJSON(json['textColor']),
        'titleFont': json['titleFont'] == null ? undefined : FontConfigFromJSON(json['titleFont']),
        'updatedAt': json['updatedAt'] == null ? undefined : (new Date(json['updatedAt'])),
        'visitorExperience': json['visitorExperience'] == null ? undefined : json['visitorExperience'],
        'workspaceId': json['workspaceId'] == null ? undefined : json['workspaceId'],
    };
}

export function PageThemeToJSON(json: any): PageTheme {
    return PageThemeToJSONTyped(json, false);
}

export function PageThemeToJSONTyped(value?: Omit<PageTheme, 'createdAt'|'id'|'updatedAt'|'workspaceId'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'badgeEnabled': value['badgeEnabled'],
        'badgeIconColor': ThemeColorToJSON(value['badgeIconColor']),
        'badgeId': value['badgeId'],
        'badgeShape': value['badgeShape'],
        'bodyAlign': value['bodyAlign'],
        'bodyFont': FontConfigToJSON(value['bodyFont']),
        'canvasColor': ThemeColorToJSON(value['canvasColor']),
        'canvasCoverId': value['canvasCoverId'],
        'canvasCoverMode': value['canvasCoverMode'],
        'canvasTexture': value['canvasTexture'],
        'choiceLayout': value['choiceLayout'],
        'containerConfig': ContainerConfigToJSON(value['containerConfig']),
        'containerEnabled': value['containerEnabled'],
        'elementColor': ThemeColorToJSON(value['elementColor']),
        'elementFont': FontConfigToJSON(value['elementFont']),
        'elementStyles': value['elementStyles'] == null ? undefined : ((value['elementStyles'] as Array<any>).map(PageThemeElementStyleOverrideToJSON)),
        'footerLogoEnabled': value['footerLogoEnabled'],
        'footerLogoId': value['footerLogoId'],
        'headingAlign': value['headingAlign'],
        'questionStyle': value['questionStyle'],
        'shape': PageThemeShapeToJSON(value['shape']),
        'smallText': PageThemeSmallTextToJSON(value['smallText']),
        'textColor': ThemeColorToJSON(value['textColor']),
        'titleFont': FontConfigToJSON(value['titleFont']),
        'visitorExperience': value['visitorExperience'],
    };
}

