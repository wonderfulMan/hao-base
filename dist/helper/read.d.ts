import { EntryReturn } from 'hao-base';
export declare function getAssignDir(assign: string): Array<string> | void;
export declare function hasDirExist(assign: string, exist: string): boolean;
export declare function readMutilDirByAssignDir(assign: string, exist: string): EntryReturn;
export declare function readSingleDirByAssignDir(assign: string): EntryReturn;
