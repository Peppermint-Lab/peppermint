import * as React from 'react';
import Input, { InputProps } from './Input';
export interface SearchProps extends InputProps {
    inputPrefixCls?: string;
    onSearch?: (value: string, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => void;
    enterButton?: React.ReactNode;
    loading?: boolean;
}
declare const Search: React.ForwardRefExoticComponent<SearchProps & React.RefAttributes<Input>>;
export default Search;
