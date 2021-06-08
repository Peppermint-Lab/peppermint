/// <reference types="react" />
import { Locale } from '.';
declare const LocaleContext: import("react").Context<(Partial<Locale> & {
    exist?: boolean | undefined;
}) | undefined>;
export default LocaleContext;
