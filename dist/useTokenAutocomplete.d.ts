export interface UseTokenAutocompleteOptions {
    options?: string[];
    defaultValues?: string[];
    threshold?: number;
    filterOptions?: boolean;
    simulateSelect?: boolean;
    limitToOptions?: boolean;
    parseCustom?: (value: string) => string;
    onInputChange?: (value: string) => void;
    onAdd?: (value: string) => void;
    onRemove?: (value: string, index: number) => void;
}
export interface UseTokenAutocompleteReturn {
    values: string[];
    inputValue: string;
    focused: boolean;
    selectedIndex: number;
    availableOptions: string[];
    showOptions: boolean;
    showInput: boolean;
    setInputValue: (value: string) => void;
    addValue: (value: string) => void;
    removeValue: (index: number) => void;
    focus: () => void;
    blur: () => void;
    handleKeyDown: (e: React.KeyboardEvent) => void;
    handleOptionMouseEnter: (value: string) => void;
    handleOptionSelect: (value: string) => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
    containerRef: React.RefObject<HTMLDivElement | null>;
}
export declare function useTokenAutocomplete({ options, defaultValues, threshold, filterOptions, simulateSelect, limitToOptions, parseCustom, onInputChange, onAdd, onRemove, }?: UseTokenAutocompleteOptions): UseTokenAutocompleteReturn;
//# sourceMappingURL=useTokenAutocomplete.d.ts.map