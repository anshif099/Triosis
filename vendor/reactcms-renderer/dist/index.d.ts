import React, { CSSProperties, ReactNode } from 'react';

type ResponsiveMode = 'desktop' | 'laptop' | 'tablet' | 'mobile' | 'custom';
type RendererMode = 'edit' | 'preview' | 'runtime';
type DropPosition = 'before' | 'inside' | 'after';
interface ResponsiveStyles {
    base?: CSSProperties;
    desktop?: CSSProperties;
    laptop?: CSSProperties;
    tablet?: CSSProperties;
    mobile?: CSSProperties;
}
interface ComponentNode {
    id: string;
    type: string;
    label?: string;
    props?: Record<string, any>;
    styles?: ResponsiveStyles;
    children?: ComponentNode[];
    hidden?: boolean;
    locked?: boolean;
    metadata?: {
        regionId?: string;
        global?: boolean;
        reusable?: boolean;
        symbolId?: string;
        accessibility?: Record<string, any>;
        seo?: Record<string, any>;
        bindings?: Record<string, any>;
        animation?: Record<string, any>;
        [key: string]: any;
    };
}
interface PageComponentTree {
    id: string;
    type: 'page';
    version: 2;
    title?: string;
    locale?: string;
    children: ComponentNode[];
    styles?: ResponsiveStyles;
    metadata?: Record<string, any>;
}
interface RendererMutation {
    nodeId: string;
    path: Array<string | number>;
    value: unknown;
}
interface RendererComponentProps {
    node: ComponentNode;
    locale: string;
    responsiveMode: ResponsiveMode;
    mode: RendererMode;
    children?: ReactNode;
    mutate: (path: Array<string | number>, value: unknown) => void;
}
type RegisteredRendererComponent = (props: RendererComponentProps) => ReactNode;
interface RuntimeRendererProps {
    tree: PageComponentTree;
    locale?: string;
    responsiveMode?: ResponsiveMode;
    mode?: RendererMode;
    theme?: {
        colors?: Record<string, string>;
        typography?: Record<string, string>;
        buttons?: Record<string, string>;
        branding?: Record<string, string>;
        [key: string]: any;
    } | null;
    selectedIds?: string[];
    hoveredId?: string | null;
    registry?: ComponentRegistry;
    onSelect?: (nodeId: string, additive?: boolean) => void;
    onHover?: (nodeId: string | null) => void;
    onMutation?: (mutation: RendererMutation) => void;
    onMove?: (nodeId: string, targetId: string, position: DropPosition) => void;
    onInsert?: (componentType: string, targetId: string, position: DropPosition) => void;
    onCommand?: (command: string, nodeId: string) => void;
}
interface ComponentRegistry {
    register(type: string, component: RegisteredRendererComponent): void;
    unregister(type: string): void;
    get(type: string): RegisteredRendererComponent | undefined;
    has(type: string): boolean;
    entries(): Array<[string, RegisteredRendererComponent]>;
}

declare function RuntimeRenderer({ tree, locale, responsiveMode, mode, theme, ...callbacks }: RuntimeRendererProps): React.JSX.Element;
declare class RuntimeRendererEngine {
    renderPage(tree: RuntimeRendererProps['tree'], options?: Omit<RuntimeRendererProps, 'tree'>): React.JSX.Element;
    renderTree(tree: RuntimeRendererProps['tree'], options?: Omit<RuntimeRendererProps, 'tree'>): React.JSX.Element;
    renderComponent(node: ComponentNode, options?: Omit<RuntimeRendererProps, 'tree'>): React.JSX.Element;
    renderRegion(node: ComponentNode, options?: Omit<RuntimeRendererProps, 'tree'>): React.JSX.Element;
    updateRegion(tree: RuntimeRendererProps['tree'], nodeId: string, path: Array<string | number>, value: unknown): {
        children: ComponentNode[];
        id: string;
        type: "page";
        version: 2;
        title?: string;
        locale?: string;
        styles?: ResponsiveStyles;
        metadata?: Record<string, any>;
    };
    rerender(tree: RuntimeRendererProps['tree']): {
        children: ComponentNode[];
        id: string;
        type: "page";
        version: 2;
        title?: string;
        locale?: string;
        styles?: ResponsiveStyles;
        metadata?: Record<string, any>;
    };
}

declare const RUNTIME_ADDITIONS_REGION = "__rcms_runtime_additions__";
declare function createRuntimeAdditionsTree(pageId?: string, locale?: string): PageComponentTree;
declare function blockToComponentNode(block: Record<string, any>): ComponentNode;
declare function blocksToPageTree(blocks?: Array<Record<string, any>>, options?: {
    id?: string;
    title?: string;
    locale?: string;
}): PageComponentTree;
declare function componentNodeToBlock(node: ComponentNode): Record<string, any>;
declare function pageTreeToBlocks(tree: PageComponentTree): Array<Record<string, any>>;
declare function regionsToPageTree(regions: Record<string, any>, options?: {
    id?: string;
    title?: string;
    locale?: string;
}): PageComponentTree;
declare function isPageComponentTree(value: unknown): value is PageComponentTree;

declare class RuntimeComponentRegistry implements ComponentRegistry {
    private components;
    register(type: string, component: RegisteredRendererComponent): void;
    unregister(type: string): void;
    get(type: string): RegisteredRendererComponent | undefined;
    has(type: string): boolean;
    entries(): [string, RegisteredRendererComponent][];
}
declare const defaultComponentRegistry: RuntimeComponentRegistry;

export { type ComponentNode, type ComponentRegistry, type DropPosition, type PageComponentTree, RUNTIME_ADDITIONS_REGION, type RegisteredRendererComponent, type RendererComponentProps, type RendererMode, type RendererMutation, type ResponsiveMode, type ResponsiveStyles, RuntimeComponentRegistry, RuntimeRenderer, RuntimeRendererEngine, type RuntimeRendererProps, blockToComponentNode, blocksToPageTree, componentNodeToBlock, createRuntimeAdditionsTree, defaultComponentRegistry, isPageComponentTree, pageTreeToBlocks, regionsToPageTree };
