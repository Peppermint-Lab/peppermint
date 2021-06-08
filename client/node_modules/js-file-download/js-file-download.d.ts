declare module 'js-file-download' {
    export default function fileDownload(
        data: string | ArrayBuffer | ArrayBufferView | Blob,
        filename: string,
        mime?: string,
        bom?: string
    ): void;
}
