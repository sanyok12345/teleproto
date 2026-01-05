import { CodeBuilder } from "../common/CodeBuilder";
import { TLTypeInfo } from "../types";

export interface FileOutput {
    path: string;
    content: string;
}

export function generateUnionTypeFile(typeInfo: TLTypeInfo): FileOutput {
    const cb = new CodeBuilder();
    const { name, namespace, constructors } = typeInfo;
    const typeName = `Type${name}`;
    const nsDir = namespace ? `${namespace}/` : "";
    const filePath = `types/${nsDir}${typeName}.ts`;
    
    // Imports
    const imports = new Set<string>();
    const typeRefs: string[] = [];
    
    constructors.forEach(ctor => {
        // ctor is "namespace.Name" or "Name"
        let ctorName = ctor;
        let ctorNs = undefined;
        
        if (ctor.includes('.')) {
            const parts = ctor.split('.');
            ctorNs = parts[0];
            ctorName = parts[1];
        }
        
        // Logic for import path:
        // Current file is in `types/${namespace || ""}`
        // Target file is in `types/${ctorNs || ""}`
        
        let importPath = "";
        
        if (namespace === ctorNs) {
            // Same directory
            importPath = `./${ctorName}`;
        } else {
            // Different directory
            if (namespace) {
                // We are in a subdirectory (e.g. types/auth)
                if (ctorNs) {
                    // Target is in another subdirectory (e.g. types/users)
                    importPath = `../${ctorNs}/${ctorName}`;
                } else {
                    // Target is in top level (e.g. types/)
                    importPath = `../${ctorName}`;
                }
            } else {
                // We are in top level (types/)
                if (ctorNs) {
                    // Target is in subdirectory (e.g. types/auth)
                    importPath = `./${ctorNs}/${ctorName}`;
                } else {
                    // Target is in top level (types/)
                    importPath = `./${ctorName}`;
                }
            }
        }
        
        cb.write(`import { ${ctorName} } from "${importPath}";`);
        typeRefs.push(ctorName);
    });
    
    cb.write("");
    
    if (typeRefs.length > 0) {
        cb.write(`export type ${typeName} = ${typeRefs.join(" | ")};`);
    } else {
        cb.write(`export type ${typeName} = any;`);
    }
    
    return { path: filePath, content: cb.toString() };
}
