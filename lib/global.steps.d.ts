export default class GlobalSteps {
    static randomMapping(type: string): Promise<string>;
    navigate(pageMatch: string): Promise<void>;
    contains(pageMatch: string): Promise<void>;
    loaded(pageMatch: string): Promise<void>;
    randomString(type: string, name: string): void;
    assignText(type: string, name: string): Promise<void>;
    assignValue(type: string, name: string): Promise<void>;
    reloadPage(): Promise<void>;
}
