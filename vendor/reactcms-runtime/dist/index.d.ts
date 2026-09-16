import * as React from 'react';
import React__default from 'react';
import { ThemeTokens, NavItem } from '@anshif.rainhopes/shared';
import { PageComponentTree } from '@anshif.rainhopes/reactcms-renderer';

interface RuntimeProviderProps {
    websiteId: string;
    apiKey: string;
    routes: any[];
    theme?: ThemeTokens | null;
    pageTrees?: Record<string, PageComponentTree>;
    preserveApplicationPage?: boolean;
    children: React__default.ReactNode;
}
/**
 * Registers the connected application and renders a published ReactCMS page
 * through the native runtime renderer. The application children remain the
 * fallback for routes that do not yet have a published component tree.
 */
declare function RuntimeProvider({ websiteId, apiKey, routes, theme, pageTrees, preserveApplicationPage, children, }: RuntimeProviderProps): React__default.JSX.Element;

interface CMSLayoutProps {
    id: string;
    label: string;
    component: React__default.ComponentType<any>;
    isDefault?: boolean;
    slots?: string[];
}
declare function CMSLayout({ id, label, component, isDefault, slots, }: CMSLayoutProps): null;

interface CMSNavigationProps {
    id: string;
    label: string;
    items: NavItem[];
}
declare function CMSNavigation({ id, label, items }: CMSNavigationProps): null;

interface RouteRegistryProps {
    websiteId: string;
    apiKey: string;
}
declare function RouteRegistry({ websiteId, apiKey }: RouteRegistryProps): React.JSX.Element | null;

interface BuilderSectionsProps {
    websiteId: string;
    apiKey: string;
    pageId?: string;
    fallback?: React__default.ReactNode;
    layout?: React__default.ComponentType<any> | null;
    preserveApplicationPage?: boolean;
}
declare function BuilderSections({ websiteId, apiKey, pageId: pageIdOverride, fallback, layout: Layout, preserveApplicationPage, }: BuilderSectionsProps): React__default.JSX.Element;

export { BuilderSections, CMSLayout, CMSNavigation, RouteRegistry, RuntimeProvider };
