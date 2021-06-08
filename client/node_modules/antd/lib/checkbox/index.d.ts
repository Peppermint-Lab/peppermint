import * as React from 'react';
import { CheckboxProps } from './Checkbox';
import Group from './Group';
export { CheckboxProps, CheckboxChangeEvent } from './Checkbox';
export { CheckboxGroupProps, CheckboxOptionType } from './Group';
interface CompoundedComponent extends React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>> {
    Group: typeof Group;
    __ANT_CHECKBOX: boolean;
}
declare const Checkbox: CompoundedComponent;
export default Checkbox;
