import { TLObjectDef } from "../../parsers/types";
import { TLTypeInfo } from "./TLTypeInfo";

export interface GeneratorConfig {
    types: TLTypeInfo[];
    constructors: TLObjectDef[];
    functions: TLObjectDef[];
}
