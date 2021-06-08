import { InternalNamePath } from './interface';
export declare function toArray<T>(candidate?: T | T[] | false): T[];
export declare function getFieldId(namePath: InternalNamePath, formName?: string): string | undefined;
