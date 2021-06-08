import * as React from 'react';
import { OptionProps } from './Option';
export interface MentionsContextProps {
    notFoundContent: React.ReactNode;
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    selectOption: (option: OptionProps) => void;
    onFocus: React.FocusEventHandler<HTMLElement>;
    onBlur: React.FocusEventHandler<HTMLElement>;
}
export declare const MentionsContextProvider: React.Provider<MentionsContextProps>;
export declare const MentionsContextConsumer: React.Consumer<MentionsContextProps>;
