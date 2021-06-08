import * as React from 'react';
import Dragger from './Dragger';
import { UploadProps } from './interface';
export { UploadProps };
interface CompoundedComponent extends React.ForwardRefExoticComponent<React.PropsWithChildren<UploadProps> & React.RefAttributes<any>> {
    Dragger: typeof Dragger;
    LIST_IGNORE: string;
}
declare const Upload: CompoundedComponent;
export default Upload;
