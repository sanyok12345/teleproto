import { CodeBuilder } from "../common/CodeBuilder";
import { TLObjectDef } from "../../parsers/types";
import { TLTypeInfo } from "../types";

export interface FileOutput {
    path: string;
    content: string;
}

export function generateTlIndex(namespaces: Set<string>, constructors: TLObjectDef[], types: TLTypeInfo[], functions: TLObjectDef[]): FileOutput {
    const cb = new CodeBuilder();
    
    cb.write(`import { patchAll } from "./patched";`);
    cb.write(`import { MTProtoRequest } from "./MTProtoRequest";`);
    cb.write("");
    cb.write(`patchAll();`);
    cb.write("");

    // Generate imports for all items to preserve types
    // 1. Constructors
    constructors.forEach(c => {
        const source = c.namespace ? `./types/${c.namespace}/index` : `./types`;
        const alias = c.namespace ? `_${c.namespace}_${c.name}` : `_${c.name}`;
        cb.write(`import { ${c.name} as ${alias} } from "${source}";`);
    });

    // 2. Unions
    types.forEach(t => {
        const source = t.namespace ? `./types/${t.namespace}/index` : `./types`;
        const alias = t.namespace ? `_${t.namespace}_Type${t.name}` : `_Type${t.name}`;
        cb.write(`import { Type${t.name} as ${alias} } from "${source}";`);
    });

    // 3. Functions
    functions.forEach(f => {
        const source = f.namespace ? `./functions/${f.namespace}/index` : `./functions`;
        const alias = f.namespace ? `_${f.namespace}_${f.name}` : `_${f.name}`;
        cb.write(`import { ${f.name} as ${alias} } from "${source}";`);
    });

    cb.write("");
    
    // Export Api namespace
    cb.write(`export namespace Api {`);
    cb.indent();
    cb.write(`export type int = number;`);
    cb.write(`export type double = number;`);
    cb.write(`export type long = bigint;`);
    cb.write(`export type int128 = bigint;`);
    cb.write(`export type int256 = bigint;`);
    cb.write(`export type Bool = boolean;`);
    cb.write(`export type Any = any;`);
    cb.write(`export type Type = any;`);
    cb.write(`export type AnyRequest = MTProtoRequest;`);
    cb.write(`export import functions = _functions;`);
    cb.write(`export import types = _types;`);
    
    // 1. Namespaces
    namespaces.forEach(ns => {
        cb.write(`export namespace ${ns} {`);
        cb.indent();
        
        // Constructors in namespace
        constructors.filter(c => c.namespace === ns).forEach(c => {
            cb.write(`export const ${c.name} = _${ns}_${c.name};`);
            cb.write(`export type ${c.name} = _${ns}_${c.name};`);
        });
        
        // Unions in namespace
        types.filter(t => t.namespace === ns).forEach(t => {
            cb.write(`export type Type${t.name} = _${ns}_Type${t.name};`);
        });
        
        // Functions in namespace
        functions.filter(f => f.namespace === ns).forEach(f => {
            cb.write(`export const ${f.name} = _${ns}_${f.name};`);
            cb.write(`export type ${f.name} = _${ns}_${f.name};`);
        });
        
        cb.unindent();
        cb.write(`}`);
    });

    // 2. Top-level Constructors
    const topLevelConstructors = constructors.filter(c => !c.namespace);
    topLevelConstructors.forEach(c => {
        cb.write(`export const ${c.name} = _${c.name};`);
        cb.write(`export type ${c.name} = _${c.name};`);
    });
    
    // 3. Top-level Unions
    const topLevelTypes = types.filter(t => !t.namespace);
    topLevelTypes.forEach(t => {
        cb.write(`export type Type${t.name} = _Type${t.name};`);
    });

    // 4. Top-level Functions
    const topLevelFunctions = functions.filter(f => !f.namespace);
    topLevelFunctions.forEach(f => {
        cb.write(`export const ${f.name} = _${f.name};`);
        cb.write(`export type ${f.name} = _${f.name};`);
    });

    cb.unindent();
    cb.write(`}`);
    cb.write("");
    
    // We don't need to export functions/types namespaces anymore as they are fully integrated into Api
    // But existing code might import them?
    // The original code exported them.
    cb.write(`import * as _functions from "./functions";`);
    cb.write(`import * as _types from "./types";`);
    cb.write(`export { _functions as functions, _types as types };`);
    cb.write(`export { serializeBytes, serializeDate } from "../Helpers";`);

    return { path: "api.ts", content: cb.toString() };
}
