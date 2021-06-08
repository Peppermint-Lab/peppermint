export declare function validProgress(progress: number | undefined): number;
export declare function getSuccessPercent({ success, successPercent, }: {
    success?: {
        progress?: number;
        percent?: number;
    };
    successPercent?: number;
}): number | undefined;
