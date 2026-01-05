import { ArgConfig } from "./ArgConfig";

export interface TLObjectDef {
    name: string;
    constructorId: number;
    argsConfig: Record<string, ArgConfig>;
    subclassOfId: number;
    result: string;
    isFunction: boolean;
    namespace?: string;
}
