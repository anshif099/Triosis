type ConnectionHealth = 'healthy' | 'unverified' | 'error' | 'unknown';
type SyncStatus = 'idle' | 'syncing' | 'manual' | 'error';
interface Website {
    id: string;
    name: string;
    domain: string;
    framework: string;
    hosting?: string;
    ownerName?: string;
    ownerEmail?: string;
    apiKey: string;
    secretKeyHash: string;
    verificationCode?: string;
    verificationStatus: 'verified' | 'unverified';
    status: 'active' | 'pending' | 'suspended';
    sdkInstalled: boolean;
    sdkVersion?: string;
    lastSync?: number;
    connectionHealth: ConnectionHealth;
    syncStatus: SyncStatus;
    syncMode?: 'manifest' | 'manual' | 'runtime';
    createdAt: number;
    updatedAt: number;
}

interface PageBlock {
    id: string;
    type: string;
    content: Record<string, unknown>;
}
interface PageSEO {
    metaTitle: string;
    metaDescription: string;
    canonicalUrl?: string;
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
    focusKeyword?: string;
    robots?: string;
    jsonLd?: string;
}
interface PageLocale {
    title: string;
    slug: string;
    seo: PageSEO;
    blocks: PageBlock[];
}
interface Page {
    id: string;
    title: string;
    slug: string;
    status: 'draft' | 'published' | 'archived';
    source: 'cms' | 'imported' | 'generated';
    isImported: boolean;
    routeId?: string;
    route?: string;
    locales: Record<string, PageLocale>;
    contentTypeRefs?: string[];
    lastSynced?: number;
    publishedAt?: number;
    createdAt: number;
    updatedAt: number;
}

interface RouteEntry {
    id: string;
    path: string;
    title: string;
    layout?: string;
    contentModel?: string;
    source: 'registered' | 'cms-generated';
    published: boolean;
    createdAt?: number;
}

interface NavItem {
    id: string;
    label: string;
    path?: string;
    url?: string;
    icon?: string;
    order: number;
    external?: boolean;
    children?: NavItem[];
}
interface NavMenu {
    id: string;
    label: string;
    items: NavItem[];
    registeredAt?: number;
}

interface LayoutDefinition {
    id: string;
    label: string;
    slots: string[];
    isDefault: boolean;
    registeredAt?: number;
}

interface ThemeTokens {
    branding: {
        siteName: string;
        logo: string;
        tagline: string;
    };
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
        darkBackground: string;
        darkText: string;
    };
    typography: {
        headingFont: string;
        bodyFont: string;
        baseSize: string;
        lineHeight: string;
        letterSpacing: string;
    };
    spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
    };
    borderRadius: {
        sm: string;
        md: string;
        lg: string;
        full: string;
    };
    containerWidth: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        full: string;
    };
    breakpoints: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    buttons: {
        borderRadius: string;
        fontWeight: string;
        paddingX: string;
        paddingY: string;
    };
    darkMode: {
        enabled: boolean;
        strategy: 'class' | 'media';
    };
}

type EditableType = 'text' | 'textarea' | 'richtext' | 'image' | 'video' | 'button' | 'repeater' | 'section';
interface EditableRegion {
    id: string;
    type: EditableType;
    label: string;
    editable?: boolean;
    defaultValue?: unknown;
    registeredAt?: number;
}

type FieldType = 'text' | 'textarea' | 'richtext' | 'number' | 'boolean' | 'date' | 'datetime' | 'image' | 'video' | 'file' | 'url' | 'email' | 'select' | 'multiselect' | 'relation' | 'repeater' | 'slug' | 'color' | 'json';
interface FieldDefinition {
    id: string;
    label: string;
    type: FieldType;
    required?: boolean;
    defaultValue?: unknown;
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        options?: string[];
    };
    hint?: string;
}
interface ContentModel {
    id: string;
    label: string;
    icon?: string;
    fields: FieldDefinition[];
    seoDefaults?: {
        metaTitleTemplate: string;
        metaDescriptionField: string;
        ogImageField?: string;
    };
    slugRule: 'title' | 'date-title' | 'id' | 'custom';
    defaultTemplate?: string;
}

interface RuntimeStatus {
    status: 'online' | 'offline' | 'degraded';
    heartbeat: string;
    sdkVersion: string;
    runtimeVersion: string;
    compatibility: 'ok' | 'warn' | 'breaking';
}
interface ProjectRegistry {
    meta: {
        name: string;
        domain: string;
        framework: string;
        createdAt: number;
    };
    runtime: RuntimeStatus;
    routes: Record<string, RouteEntry>;
    layouts: Record<string, LayoutDefinition>;
    navigation: Record<string, NavMenu>;
    theme: ThemeTokens;
    contentModels: Record<string, ContentModel>;
    components: Record<string, {
        id: string;
        type: string;
        pageId: string;
        registeredAt: number;
    }>;
    editableRegions: Record<string, Record<string, EditableRegion>>;
    plugins: Record<string, {
        id: string;
        enabled: boolean;
        version?: string;
    }>;
}

interface PluginConfig {
    id: string;
    enabled: boolean;
    config: Record<string, unknown>;
}
interface PluginManifest {
    id: string;
    name: string;
    version: string;
    description?: string;
    author?: string;
    settingsFields?: Array<{
        id: string;
        label: string;
        type: 'text' | 'number' | 'boolean' | 'select';
        options?: string[];
        defaultValue?: unknown;
    }>;
}

interface PlatformVersions {
    sdk: string;
    runtime: string;
    dashboard: string;
}
interface VersionCompatibility {
    compatible: boolean;
    level: 'ok' | 'warn' | 'breaking';
    warnings: string[];
}

interface RCMSMessage<T = unknown> {
    rcms: true;
    version: 'v1';
    type: string;
    websiteId: string;
    payload: T;
    timestamp: number;
}

interface FieldUpdatePayload {
    regionId: string;
    fieldKey?: string;
    value: unknown;
}
interface RegionSelectedPayload {
    regionId: string;
    type: string;
    pageId: string;
}
interface OpenInspectorPayload {
    regionId: string;
}

type ThemeUpdatePayload = ThemeTokens;

type NavigationUpdatePayload = NavMenu[];

interface HeartbeatPayload {
    timestamp: number;
    status: 'online' | 'offline' | 'degraded';
}
interface PublishPagePayload {
    slug: string;
}

declare const EVENT_TYPES: {
    readonly 'enter-edit-mode': "rcms/v1/enter-edit-mode";
    readonly 'exit-edit-mode': "rcms/v1/exit-edit-mode";
    readonly 'field-update': "rcms/v1/field-update";
    readonly 'region-selected': "rcms/v1/region-selected";
    readonly 'open-inspector': "rcms/v1/open-inspector";
    readonly 'theme-update': "rcms/v1/theme-update";
    readonly 'navigation-update': "rcms/v1/navigation-update";
    readonly 'publish-page': "rcms/v1/publish-page";
    readonly heartbeat: "rcms/v1/heartbeat";
    readonly 'runtime-ready': "rcms/v1/runtime-ready";
    readonly 'regions-registered': "rcms/v1/regions-registered";
};
type EventType = typeof EVENT_TYPES[keyof typeof EVENT_TYPES];

declare const FIREBASE_ROOTS: {
    readonly registry: "registry";
    readonly content: "content";
    readonly pages: "pages";
    readonly websites: "websites";
};

declare const CURRENT_SDK_VERSION = "1.0.0";
declare const CURRENT_RUNTIME_VERSION = "1.0.0";
declare const CURRENT_DASHBOARD_VERSION = "1.0.0";

declare const paths: {
    registry: (id: string) => string;
    registryRuntime: (id: string) => string;
    registryRoutes: (id: string) => string;
    registryLayouts: (id: string) => string;
    registryNav: (id: string) => string;
    registryTheme: (id: string) => string;
    registryModels: (id: string) => string;
    registryComponents: (id: string) => string;
    registryRegions: (id: string, pageId: string) => string;
    registryPlugins: (id: string) => string;
    contentTheme: (id: string) => string;
    contentSEO: (id: string) => string;
    contentDraft: (id: string, pageId: string) => string;
    contentPublished: (id: string, pageId: string) => string;
    contentEntry: (id: string, model: string, entryId: string) => string;
    contentPlugin: (id: string, pluginId: string) => string;
    pages: (id: string) => string;
    page: (id: string, pageId: string) => string;
};
type PathBuilders = typeof paths;

interface FirebaseSchema {
    websites: Record<string, Website>;
    pages: Record<string, Record<string, Page>>;
    content: Record<string, {
        theme?: ThemeTokens;
        seo?: Record<string, unknown>;
        sync?: Record<string, unknown>;
        entries?: Record<string, Record<string, unknown>>;
    }>;
    registry: Record<string, ProjectRegistry>;
}

declare function validateRoute(route: unknown): route is RouteEntry;

declare function validateTheme(theme: unknown): theme is ThemeTokens;

declare function validateContentModel(model: unknown): model is ContentModel;

declare function validateRegistry(registry: unknown): registry is ProjectRegistry;

/**
 * Encodes a string key so it is safe to use as a key or path component in Firebase Realtime Database.
 * Replaces invalid characters (., #, $, /, [, ]) and escape character (~) with ~xx hex escape sequences.
 */
declare function encodeFirebaseKey(key: string): string;
/**
 * Decodes a Firebase Realtime Database key back to its original string representation.
 */
declare function decodeFirebaseKey(key: string): string;
/**
 * Recursively encodes keys in an object for Firebase RTDB storage.
 */
declare function encodeFirebaseObject<T>(obj: T): T;
/**
 * Recursively decodes keys in an object read from Firebase RTDB.
 */
declare function decodeFirebaseObject<T>(obj: T): T;

export { CURRENT_DASHBOARD_VERSION, CURRENT_RUNTIME_VERSION, CURRENT_SDK_VERSION, type ConnectionHealth, type ContentModel, EVENT_TYPES, type EditableRegion, type EditableType, type EventType, FIREBASE_ROOTS, type FieldDefinition, type FieldType, type FieldUpdatePayload, type FirebaseSchema, type HeartbeatPayload, type LayoutDefinition, type NavItem, type NavMenu, type NavigationUpdatePayload, type OpenInspectorPayload, type Page, type PageBlock, type PageLocale, type PageSEO, type PathBuilders, type PlatformVersions, type PluginConfig, type PluginManifest, type ProjectRegistry, type PublishPagePayload, type RCMSMessage, type RegionSelectedPayload, type RouteEntry, type RuntimeStatus, type SyncStatus, type ThemeTokens, type ThemeUpdatePayload, type VersionCompatibility, type Website, decodeFirebaseKey, decodeFirebaseObject, encodeFirebaseKey, encodeFirebaseObject, paths, validateContentModel, validateRegistry, validateRoute, validateTheme };
