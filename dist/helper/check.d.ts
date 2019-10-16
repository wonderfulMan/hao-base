import { BaseConfig } from 'hao-base';
import { COLORS } from '../const';
export declare function checkOptions(config: BaseConfig): Promise<string | void>;
export declare function isPlainObject(obj: any): boolean;
export declare function getObjectSize(obj: any): number;
export declare function errorMessageExit(message: string[] | string, color?: COLORS): undefined;
