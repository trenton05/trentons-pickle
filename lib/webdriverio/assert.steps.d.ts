export default class InputSteps {
    value(eltMatch: string, textMatch: string): Promise<void>;
    text(eltMatch: string, textMatch: string): Promise<void>;
    exactText(eltMatch: string, textMatch: string): Promise<void>;
    visible(eltMatch: string): Promise<void>;
    enabled(eltMatch: string): Promise<void>;
    disabled(eltMatch: string): Promise<void>;
    hidden(eltMatch: string): Promise<void>;
    present(eltMatch: string): Promise<void>;
    notPresent(eltMatch: string): Promise<void>;
    before(eltMatch1: string, eltMatch2: string): Promise<void>;
}
