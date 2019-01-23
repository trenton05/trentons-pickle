export declare type MappingValue = any | Promise<any> | ((...args: string[]) => any | Promise<any>);
export declare const mappings: {
    regex: RegExp;
    value: MappingValue;
    length: number;
    obj: any;
}[];
export declare function mapping(target: Object, key: string, descriptor?: PropertyDescriptor): void;
export declare function mapping(target?: RegExp): (target: any, key: string, descriptor?: PropertyDescriptor) => void;
export declare function mapping(target: RegExp | string, value: MappingValue): void;
export declare function mapping(target: any): Promise<any>;
export declare function mapping(target: any[]): Promise<any[]>;
