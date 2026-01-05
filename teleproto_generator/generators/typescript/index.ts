import { GeneratorConfig } from "../types";
import { CodeBuilder } from "../common/CodeBuilder";
import { generateClassFile, FileOutput } from "./classGenerator";
import { generateUnionTypeFile } from "./unionTypeGenerator";
import { generateTlIndex } from "./indexGenerator";

export default function generateTypeScript(config: GeneratorConfig): FileOutput[] {
    const files: FileOutput[] = [];
    const { types, constructors, functions } = config;

    // Generate all classes
    [...constructors, ...functions].forEach(def => {
        files.push(generateClassFile(def));
    });

    // Generate union types
    types.forEach(typeInfo => {
        files.push(generateUnionTypeFile(typeInfo));
    });

    // Generate index files for namespaces
    const namespaces = new Set<string>();
    [...constructors, ...functions].forEach(def => {
        if (def.namespace) namespaces.add(def.namespace);
    });
    types.forEach(t => {
        if (t.namespace) namespaces.add(t.namespace);
    });

    // Generate index files for each namespace
    namespaces.forEach(ns => {
        // Functions index
        const functionsInNs = functions.filter(f => f.namespace === ns);
        if (functionsInNs.length > 0) {
            const cb = new CodeBuilder();
            functionsInNs.forEach(f => {
                cb.write(`export * from "./${f.name}";`);
            });
            files.push({ path: `functions/${ns}/index.ts`, content: cb.toString() });
        }

        // Types index
        const typesInNs = constructors.filter(c => c.namespace === ns);
        const unionTypesInNs = types.filter(t => t.namespace === ns);
        
        if (typesInNs.length > 0 || unionTypesInNs.length > 0) {
            const cb = new CodeBuilder();
            typesInNs.forEach(c => {
                cb.write(`export * from "./${c.name}";`);
            });
            unionTypesInNs.forEach(t => {
                cb.write(`export * from "./Type${t.name}";`);
            });
            files.push({ path: `types/${ns}/index.ts`, content: cb.toString() });
        }
    });

    // Generate top-level index files (functions/index.ts and types/index.ts)
    // These should export namespaces as objects and top-level items directly.
    
    // Functions Top Level
    const functionsTopLevel = functions.filter(f => !f.namespace);
    const cbFunc = new CodeBuilder();
    
    // Export namespaces
    namespaces.forEach(ns => {
        // Check if this namespace has functions
        const hasFunctions = functions.some(f => f.namespace === ns);
        if (hasFunctions) {
            cbFunc.write(`import * as ${ns} from "./${ns}/index";`);
            cbFunc.write(`export { ${ns} };`);
        }
    });
    
    // Export top-level functions
    functionsTopLevel.forEach(f => {
        cbFunc.write(`export * from "./${f.name}";`);
    });
    
    files.push({ path: `functions/index.ts`, content: cbFunc.toString() });

    // Types Top Level
    const typesTopLevel = constructors.filter(c => !c.namespace);
    const unionTypesTopLevel = types.filter(t => !t.namespace);
    const cbType = new CodeBuilder();

    // Export namespaces
    namespaces.forEach(ns => {
        // Check if this namespace has types
        const hasTypes = constructors.some(c => c.namespace === ns) || types.some(t => t.namespace === ns);
        if (hasTypes) {
            cbType.write(`import * as ${ns} from "./${ns}/index";`);
            cbType.write(`export { ${ns} };`);
        }
    });

    // Export top-level types
    typesTopLevel.forEach(c => {
        cbType.write(`export * from "./${c.name}";`);
    });
    unionTypesTopLevel.forEach(t => {
        cbType.write(`export * from "./Type${t.name}";`);
    });

    files.push({ path: `types/index.ts`, content: cbType.toString() });

    // Generate main api.ts
    files.push(generateTlIndex(namespaces, constructors, types, functions));

    // Generate index.ts redirect
    const cbIndex = new CodeBuilder();
    cbIndex.write(`export * from "./api";`);
    files.push({ path: "index.ts", content: cbIndex.toString() });

    return files;
}
