import * as React from 'react';
import React__default from 'react';
import { ThemeTokens, NavItem } from '@anshif.rainhopes/shared';

interface RuntimeProviderProps {
    websiteId: string;
    apiKey: string;
    routes: any[];
    theme?: ThemeTokens | null;
    children: React__default.ReactNode;
}
declare function RuntimeProvider({ websiteId, apiKey, routes, theme, children, }: RuntimeProviderProps): React__default.JSX.Element;

interface CMSLayoutProps {
    id: string;
    label: string;
    component: React__default.ComponentType<any>;
    isDefault?: boolean;
    slots?: string[];
}
declare function CMSLayout({ id, label, isDefault, slots, }: CMSLayoutProps): null;

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

export { CMSLayout, CMSNavigation, RouteRegistry, RuntimeProvider };
