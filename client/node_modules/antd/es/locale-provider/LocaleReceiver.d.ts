import * as React from 'react';
import { Locale } from '.';
export interface LocaleReceiverProps {
    componentName?: string;
    defaultLocale?: object | Function;
    children: (locale: object, localeCode?: string, fullLocale?: object) => React.ReactNode;
}
interface LocaleInterface {
    [key: string]: any;
}
export interface LocaleReceiverContext {
    antLocale?: LocaleInterface;
}
export default class LocaleReceiver extends React.Component<LocaleReceiverProps> {
    static defaultProps: {
        componentName: string;
    };
    static contextType: React.Context<(Partial<Locale> & {
        exist?: boolean | undefined;
    }) | undefined>;
    getLocale(): any;
    getLocaleCode(): any;
    render(): React.ReactNode;
}
declare type LocaleComponent = keyof Locale;
export declare function useLocaleReceiver<T extends LocaleComponent>(componentName: T, defaultLocale?: Locale[T] | Function): [Locale[T]];
export {};
