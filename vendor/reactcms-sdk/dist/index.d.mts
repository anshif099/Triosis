import * as React from 'react';
import React__default from 'react';
import { Page, ThemeTokens, PageSEO, NavMenu, EditableType, PluginManifest, RCMSMessage } from '@anshif.rainhopes/shared';
import { FirebaseApp } from 'firebase/app';
import { Database } from 'firebase/database';

interface CMSProviderProps {
    websiteId: string;
    apiKey: string;
    environment?: 'development' | 'production' | 'staging';
    children: React__default.ReactNode;
}
declare function CMSProvider({ websiteId, apiKey, environment, children, }: CMSProviderProps): React__default.JSX.Element;

declare function CMSThemeProvider({ children }: {
    children: React__default.ReactNode;
}): React__default.JSX.Element;

declare function CMSSEOProvider({ children }: {
    children: React__default.ReactNode;
}): React__default.JSX.Element;

interface CMSContextType {
    websiteId: string;
    apiKey: string;
    environment: string;
    editMode: boolean;
    isConnected: boolean;
    setEditMode: (mode: boolean) => void;
}
declare const CMSContext: React.Context<CMSContextType | null>;

declare function useCMS(): CMSContextType;

interface PageContextType {
    currentPage: Page | null;
    locale: string;
    setLocale: (locale: string) => void;
}
declare const PageContext: React.Context<PageContextType | null>;

declare function usePage(): PageContextType;

interface ThemeContextType {
    theme: ThemeTokens | null;
    setTheme: (theme: ThemeTokens) => void;
}
declare const ThemeContext: React.Context<ThemeContextType | null>;

declare function useTheme(): ThemeContextType;

interface SEOContextType {
    seo: PageSEO | null;
    setSEO: (seo: PageSEO) => void;
}
declare const SEOContext: React.Context<SEOContextType | null>;

declare function useSEO(): SEOContextType;

interface NavigationContextType {
    menus: Record<string, NavMenu>;
    setMenus: (menus: Record<string, NavMenu>) => void;
}
declare const NavigationContext: React.Context<NavigationContextType | null>;

declare function useNavigation(): NavigationContextType;

declare function useEditable<T>(regionId: string, defaultValue: T, type: EditableType, label: string): [T, (value: T) => void];

declare function useLivePreview<T = Record<string, unknown>>(pageIdOverride?: string): {
    editMode: boolean;
    values: Record<string, T>;
    updateRegion: (regionId: string, value: T) => void;
};

interface UsePluginsResult {
    plugins: PluginManifest[];
    invoke: (pluginId: string, method: string, args: unknown[]) => Promise<unknown>;
}
declare function usePlugins(): UsePluginsResult;

interface EditableRegistryContextType {
    registerRegion: (pageId: string, regionId: string, type: EditableType, label: string, defaultValue?: unknown) => void;
    unregisterRegion: (pageId: string, regionId: string) => void;
}
declare const EditableRegistryContext: React.Context<EditableRegistryContextType | null>;

type MessageListener = (message: RCMSMessage) => void;
declare class MessageBus {
    private static get listeners();
    private static get regionValuesStore();
    private static isListening;
    static start(websiteId: string): void;
    static setStoredRegionValue(pageId: string, regionId: string, value: unknown): void;
    static getStoredRegionValue(pageId: string, regionId: string): unknown | undefined;
    static dispatchLocal(message: RCMSMessage): void;
    static send<T>(type: string, websiteId: string, payload: T): void;
    static subscribe(listener: MessageListener): () => void;
    static isValidRCMSMessage(data: unknown): data is RCMSMessage;
}

declare const postMessageBridge: {
    enterEditMode(cb: () => void): () => void;
    exitEditMode(cb: () => void): () => void;
    onFieldUpdate(cb: (regionId: string, fieldKey: string | undefined, value: unknown) => void): () => void;
};

declare function setupFirebaseBridge(apiKey: string, websiteId: string, pageId: string): () => void;

declare function getFirebaseApp(apiKey?: string): FirebaseApp;
declare function getFirebaseDatabase(apiKey?: string): Database;

interface DraftPageRegionValues {
    [regionId: string]: unknown;
}
declare const editableSync: {
    /** Write a single region value to the draft path */
    saveDraftRegion(apiKey: string, websiteId: string, pageId: string, regionId: string, value: unknown): Promise<void>;
    /** One-time fetch of draft region values for a page */
    getDraftRegions(apiKey: string, websiteId: string, pageId: string): Promise<DraftPageRegionValues>;
    /** One-time fetch of published region values for a page (used on live site initial hydration) */
    getPublishedRegions(apiKey: string, websiteId: string, pageId: string): Promise<DraftPageRegionValues>;
    /** Subscribe to real-time draft region changes (used in preview/edit mode) */
    subscribeToDraftRegions(apiKey: string, websiteId: string, pageId: string, callback: (values: DraftPageRegionValues) => void): () => void;
    /** Subscribe to published region value changes (used on live site for real-time publish updates) */
    subscribeToPublishedRegions(apiKey: string, websiteId: string, pageId: string, callback: (values: DraftPageRegionValues) => void): () => void;
};

interface EditableTextProps {
    regionId: string;
    defaultValue: any;
    label?: string;
    as?: React__default.ElementType;
    className?: string;
    style?: React__default.CSSProperties;
}
declare function EditableText({ regionId, defaultValue, label, as: Component, className, style, }: EditableTextProps): React__default.JSX.Element;

interface ImageValue {
    src: string;
    alt?: string;
}
interface EditableImageProps {
    regionId: string;
    defaultValue: ImageValue | string;
    label?: string;
    className?: string;
    style?: React__default.CSSProperties;
    alt?: string;
}
declare function EditableImage({ regionId, defaultValue, label, className, style, alt, }: EditableImageProps): React__default.JSX.Element;

interface ButtonValue {
    text: string;
    href?: string;
    variant?: string;
}
interface EditableButtonProps {
    regionId: string;
    defaultValue: ButtonValue | string;
    label?: string;
    className?: string;
    style?: React__default.CSSProperties;
    onClick?: (e: React__default.MouseEvent) => void;
    as?: React__default.ElementType;
}
declare function EditableButton({ regionId, defaultValue, label, className, style, onClick, as: Component, }: EditableButtonProps): React__default.JSX.Element;

interface EditableSectionProps {
    regionId: string;
    defaultValue?: Record<string, unknown>;
    label?: string;
    className?: string;
    style?: React__default.CSSProperties;
    children?: React__default.ReactNode;
    as?: React__default.ElementType;
}
declare function EditableSection({ regionId, defaultValue, label, className, style, children, as: Component, }: EditableSectionProps): React__default.JSX.Element;

interface EditableRichTextProps {
    regionId: string;
    defaultValue: string;
    label?: string;
    className?: string;
    style?: React__default.CSSProperties;
    as?: React__default.ElementType;
}
declare function EditableRichText({ regionId, defaultValue, label, className, style, as: Component, }: EditableRichTextProps): React__default.JSX.Element;

interface EditableRepeaterProps<T> {
    regionId: string;
    defaultValue: T[];
    label?: string;
    className?: string;
    style?: React__default.CSSProperties;
    children: (items: T[]) => React__default.ReactNode;
}
declare function EditableRepeater<T = unknown>({ regionId, defaultValue, label, className, style, children, }: EditableRepeaterProps<T>): React__default.JSX.Element;

interface VideoValue {
    url: string;
    title?: string;
}
interface EditableVideoProps {
    regionId: string;
    defaultValue: VideoValue | string;
    label?: string;
    className?: string;
    style?: React__default.CSSProperties;
}
declare function EditableVideo({ regionId, defaultValue, label, className, style, }: EditableVideoProps): React__default.JSX.Element;

interface ElementComputedStyle {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    align?: string;
}
declare function getElementComputedStyle(el: HTMLElement | null): ElementComputedStyle;

export { CMSContext, CMSProvider, CMSSEOProvider, CMSThemeProvider, EditableButton, EditableImage, EditableRegistryContext, EditableRepeater, EditableRichText, EditableSection, EditableText, EditableVideo, MessageBus, NavigationContext, PageContext, SEOContext, ThemeContext, editableSync, getElementComputedStyle, getFirebaseApp, getFirebaseDatabase, postMessageBridge, setupFirebaseBridge, useCMS, useEditable, useLivePreview, useNavigation, usePage, usePlugins, useSEO, useTheme };
