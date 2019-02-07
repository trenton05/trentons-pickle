export default class InputSteps {
    clickStep(all: boolean, eltMatch: string): Promise<void>;
    enterTextStep(clearText: string, clickText: string, textMatch: string, eltMatch: string): Promise<void>;
}
export declare function enterText(field: string, text: string, shouldClear: boolean, shouldClick: boolean): Promise<any>;
export declare function click(field: string): Promise<any>;
export declare function clickAll(field: string): Promise<any>;
