import { RcFile, UploadFile } from './interface';
export declare function file2Obj(file: RcFile): UploadFile;
/** Upload fileList. Replace file if exist or just push into it. */
export declare function updateFileList(file: UploadFile<any>, fileList: UploadFile<any>[]): UploadFile<any>[];
export declare function getFileItem(file: RcFile, fileList: UploadFile[]): UploadFile<any>;
export declare function removeFileItem(file: UploadFile, fileList: UploadFile[]): UploadFile<any>[] | null;
export declare const isImageUrl: (file: UploadFile) => boolean;
export declare function previewImage(file: File | Blob): Promise<string>;
