import * as React from 'react';
import { InternalNamePath } from '../interface';
export default function useItemRef(): (name: InternalNamePath, children: any) => React.Ref<any> | undefined;
