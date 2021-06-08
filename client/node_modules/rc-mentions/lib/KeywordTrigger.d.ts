import * as React from 'react';
import { OptionProps } from './Option';
import { Placement, Direction } from './Mentions';
interface KeywordTriggerProps {
    loading?: boolean;
    options: OptionProps[];
    prefixCls?: string;
    placement?: Placement;
    direction?: Direction;
    visible?: boolean;
    transitionName?: string;
    children?: React.ReactElement;
    getPopupContainer?: () => HTMLElement;
}
declare class KeywordTrigger extends React.Component<KeywordTriggerProps, {}> {
    getDropdownPrefix: () => string;
    getDropdownElement: () => JSX.Element;
    getDropDownPlacement: () => string;
    render(): JSX.Element;
}
export default KeywordTrigger;
