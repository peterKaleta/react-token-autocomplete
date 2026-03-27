import { ReactNode } from 'react';
export interface OptionsProps {
    options: string[];
    selectedIndex: number;
    onSelect: (value: string) => void;
    onMouseEnter: (value: string) => void;
    parseOption?: (value: string) => ReactNode;
    className?: string;
    optionClassName?: string;
    optionSelectedClassName?: string;
}
export declare function Options({ options, selectedIndex, onSelect, onMouseEnter, parseOption, className, optionClassName, optionSelectedClassName, }: OptionsProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=Options.d.ts.map