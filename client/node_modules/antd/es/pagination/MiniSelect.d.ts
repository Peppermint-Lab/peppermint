import * as React from 'react';
import Select from '../select';
interface MiniSelectInterface extends React.FC<any> {
    Option: typeof Select.Option;
}
declare const MiniSelect: MiniSelectInterface;
export default MiniSelect;
