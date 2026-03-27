import { ReactNode } from 'react';
export interface TokenAutocompleteProps {
    options?: string[];
    defaultValues?: string[];
    placeholder?: string;
    threshold?: number;
    processing?: boolean;
    autoFocus?: boolean;
    filterOptions?: boolean;
    simulateSelect?: boolean;
    limitToOptions?: boolean;
    parseOption?: (option: string) => ReactNode;
    parseToken?: (token: string) => ReactNode;
    parseCustom?: (value: string) => string;
    onInputChange?: (value: string) => void;
    onAdd?: (value: string) => void;
    onRemove?: (value: string, index: number) => void;
    className?: string;
    inputClassName?: string;
    tokenClassName?: string;
    tokenRemoveClassName?: string;
    optionsClassName?: string;
    optionClassName?: string;
    optionSelectedClassName?: string;
    placeholderClassName?: string;
    processingClassName?: string;
}
export declare function TokenAutocomplete({ options, defaultValues, placeholder, threshold, processing, autoFocus, filterOptions, simulateSelect, limitToOptions, parseOption, parseToken, parseCustom, onInputChange, onAdd, onRemove, className, inputClassName, tokenClassName, tokenRemoveClassName, optionsClassName, optionClassName, optionSelectedClassName, placeholderClassName, processingClassName, }: TokenAutocompleteProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TokenAutocomplete.d.ts.map