import { ReactNode } from 'react';
export interface TokenProps {
    value: string;
    onRemove: () => void;
    parseToken?: (value: string) => ReactNode;
    className?: string;
    removeClassName?: string;
    fullWidth?: boolean;
}
export declare function Token({ value, onRemove, parseToken, className, removeClassName, }: TokenProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Token.d.ts.map