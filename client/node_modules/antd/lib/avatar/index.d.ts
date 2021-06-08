import * as React from 'react';
import { AvatarProps } from './avatar';
import Group from './group';
export { AvatarProps } from './avatar';
export { GroupProps } from './group';
interface CompoundedComponent extends React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLElement>> {
    Group: typeof Group;
}
declare const Avatar: CompoundedComponent;
export { Group };
export default Avatar;
