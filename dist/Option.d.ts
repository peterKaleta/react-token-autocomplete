import { ReactNode } from 'react';
export interface OptionProps {
    value: string;
    selected: boolean;
    onSelect: (value: string) => void;
    onMouseEnter: (value: string) => void;
    parseOption?: (value: string) => ReactNode;
    className?: string;
    selectedClassName?: string;
}
export declare function Option({ value, selected, onSelect, onMouseEnter, parseOption, className, selectedClassName, }: OptionProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Option.d.ts.map