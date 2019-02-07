export default class CssSteps {
    static elementIndex(index: string, elementMatch: string): Promise<any>;
    static elementInIndex(index: string, cssMatch: string, elementMatch: string): Promise<any>;
    static elementWithTextIndex(index: string, elementMatch: string, textMatch: string): Promise<any>;
    static cssIndex(indexMatch: string, elementMatch: string): Promise<any>;
    static cssTextIndex(indexMatch: string, textMatch: string, elementMatch: string): Promise<any>;
    static cssWithTextIndex(cssMatch: string, textMatch: string): Promise<any>;
    static cssWithValueIndex(cssMatch: string, valueMatch: string): Promise<any>;
}
