import { TablePaginationConfig } from '../interface';
export declare const DEFAULT_PAGE_SIZE = 10;
export declare function getPaginationParam(pagination: TablePaginationConfig | boolean | undefined, mergedPagination: TablePaginationConfig): any;
export default function usePagination(total: number, pagination: TablePaginationConfig | false | undefined, onChange: (current: number, pageSize: number) => void): [TablePaginationConfig, () => void];
