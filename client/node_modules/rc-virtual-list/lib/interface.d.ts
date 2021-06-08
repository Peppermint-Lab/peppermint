/// <reference types="react" />
export declare type RenderFunc<T> = (item: T, index: number, props: {
    style?: React.CSSProperties;
}) => React.ReactNode;
export interface SharedConfig<T> {
    getKey: (item: T) => React.Key;
}
export declare type GetKey<T> = (item: T) => React.Key;
