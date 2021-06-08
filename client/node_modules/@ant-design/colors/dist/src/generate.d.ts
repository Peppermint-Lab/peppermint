interface Opts {
    theme?: 'dark' | 'default';
    backgroundColor?: string;
}
export default function generate(color: string, opts?: Opts): string[];
export {};
