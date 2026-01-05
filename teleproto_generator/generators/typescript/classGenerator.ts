import { CodeBuilder } from "../common/CodeBuilder";
import { TLObjectDef } from "../../parsers/types";
import { getTsType, getTypeRelativePath } from "./utils";

export interface FileOutput {
    path: string;
    content: string;
}

function writeSerializationCode(cb: CodeBuilder, type: string, variableName: string) {
    if (type.startsWith("Vector<")) {
        const inner = type.slice(7, -1);
        cb.write(`writer.writeVector(${variableName}, (item) => {`);
        cb.indent();
        writeSerializationCode(cb, inner, "item");
        cb.unindent();
        cb.write(`});`);
        return;
    }

    switch (type) {
        case "int":
            cb.write(`writer.writeInt(${variableName});`);
            break;
        case "long":
        case "int128":
        case "int256":
            cb.write(`writer.writeLargeInt(${variableName}, ${type === "long" ? 64 : type === "int128" ? 128 : 256});`);
            break;
        case "double":
            cb.write(`writer.writeDouble(${variableName});`);
            break;
        case "string":
            cb.write(`writer.tgWriteString(${variableName});`);
            break;
        case "bytes":
            cb.write(`writer.tgWriteBytes(${variableName});`);
            break;
        case "bool":
        case "Bool":
            cb.write(`writer.tgWriteBool(${variableName});`);
            break;
        case "true":
            // Nothing to write
            break;
        case "MessageIDLike":
            cb.write(`if (typeof ${variableName} === 'number') {`);
            cb.indent();
            cb.write(`writer.writeInt(${variableName});`);
            cb.unindent();
            cb.write(`} else {`);
            cb.indent();
            cb.write(`writer.writeInt((${variableName} as any).id);`);
            cb.unindent();
            cb.write(`}`);
            break;
        case "EntityLike":
            cb.write(`writer.write((${variableName} as any).getBytes());`);
            break;
        default:
            cb.write(`writer.write(${variableName}.getBytes());`);
            break;
    }
}

function writeDeserializationCode(cb: CodeBuilder, type: string, variableName: string) {
    if (type.startsWith("Vector<")) {
        const inner = type.slice(7, -1);
        cb.write(`const ${variableName} = reader.readVector((reader) => {`);
        cb.indent();
        writeDeserializationCode(cb, inner, "item");
        cb.write(`return item;`);
        cb.unindent();
        cb.write(`});`);
        return;
    }

    switch (type) {
        case "int":
        case "#":
        case "flags":
        case "":
            cb.write(`const ${variableName} = reader.readInt();`);
            break;
        case "long":
        case "int128":
        case "int256":
            cb.write(`const ${variableName} = reader.readLargeInt(${type === "long" ? 64 : type === "int128" ? 128 : 256});`);
            break;
        case "double":
            cb.write(`const ${variableName} = reader.readDouble();`);
            break;
        case "string":
            cb.write(`const ${variableName} = reader.tgReadString();`);
            break;
        case "bytes":
            cb.write(`const ${variableName} = reader.tgReadBytes();`);
            break;
        case "bool":
        case "Bool":
            cb.write(`const ${variableName} = reader.tgReadBool();`);
            break;
        case "true":
            cb.write(`const ${variableName} = true;`);
            break;
        default:
            cb.write(`const ${variableName} = reader.tgReadObject();`);
            break;
    }
}

export function generateClassFile(def: TLObjectDef): FileOutput {
    const cb = new CodeBuilder();
    const { name, namespace, argsConfig, constructorId, subclassOfId, isFunction, result } = def;
    
    const className = name;
    const dir = isFunction ? "functions" : "types";
    const nsDir = namespace ? `${namespace}/` : "";
    const filePath = `${dir}/${nsDir}${className}.ts`;
    
    const depth = namespace ? 2 : 1;
    const importPrefix = "../".repeat(depth);
    
    // Collect imports
    const imports = new Map<string, string>(); // name -> path
    
    const addImport = (type: string) => {
        const relPath = getTypeRelativePath(type);
        if (relPath) {
            const typeName = getTsType(type).replace(/\[\]/g, "");
            
            let path = "";
            if (isFunction) {
                path = `${importPrefix}types/${relPath}`;
            } else {
                if (depth === 2) {
                    path = `../${relPath}`;
                } else {
                    path = `./${relPath}`;
                }
            }
            
            imports.set(typeName, path);
        }
    };

    for (const argName in argsConfig) {
        addImport(argsConfig[argName].type);
    }
    if (isFunction) {
        addImport(result);
    }

    cb.write(`import { BinaryReader } from "${importPrefix}../extensions/BinaryReader";`);
    cb.write(`import { BinaryWriter } from "${importPrefix}../extensions/BinaryWriter";`);
    if (isFunction) {
            cb.write(`import { MTProtoRequest } from "${importPrefix}MTProtoRequest";`);
    } else {
            cb.write(`import { TLObject } from "${importPrefix}../extensions/TLObject";`);
    }
    
    imports.forEach((path, name) => {
        cb.write(`import { ${name} } from "${path}";`);
    });
    
    cb.write("");

    const parentClass = isFunction ? "MTProtoRequest" : "TLObject";
    
    if (className === "Config") {
        console.log("Generating Config");
        console.log("ArgsConfig:", JSON.stringify(argsConfig));
    }

    cb.block(`export class ${className} extends ${parentClass} {`, () => {
        cb.write(`static CONSTRUCTOR_ID = ${constructorId};`);
        cb.write(`static SUBCLASS_OF_ID = ${subclassOfId};`);
        cb.write(`static className = "${namespace ? namespace + '.' : ''}${name}";`);
        cb.write(`static classType = "${isFunction ? 'request' : 'constructor'}";`);
        cb.write("");
        
        // Fields
        for (const argName in argsConfig) {
            const arg = argsConfig[argName];
            let type = getTsType(arg.type);
            if (arg.isVector) {
                type += "[]";
            }
            const isOptional = arg.isFlag || (arg.type === 'flags' || arg.type === '#') || arg.flagName || arg.isOptionalTS;
            const optional = isOptional ? "?" : "!";
            cb.write(`${argName}${optional}: ${type};`);
        }
        cb.write("");

        // Constructor
        cb.block(`constructor(args: { ${Object.keys(argsConfig).map(k => {
            const arg = argsConfig[k];
            let type = getTsType(arg.type);
            if (arg.isVector) {
                type += "[]";
            }
            return `${k}?: ${type}`;
        }).join(", ")} } = {}) {`, () => {
            cb.write("super();");
            for (const argName in argsConfig) {
                const arg = argsConfig[argName];
                const isOptional = arg.isFlag || (arg.type === 'flags' || arg.type === '#') || arg.flagName || arg.isOptionalTS;
                cb.write(`this.${argName} = args.${argName}${isOptional ? "" : "!"};`);
            }
        });
        cb.write("");

        // getBytes
        cb.block("getBytes(): Buffer {", () => {
            cb.write("const writer = new BinaryWriter(Buffer.alloc(0));");
            cb.write(`writer.writeInt(${constructorId}, false);`);
            
            // Handle flags
            const flagArgs = Object.values(argsConfig).filter(a => a.type === "#" || a.type === "flags" || a.type === "");
            for (const flagArg of flagArgs) {
                // Find the name of this flag arg
                const flagArgName = Object.keys(argsConfig).find(k => argsConfig[k] === flagArg);
                if (!flagArgName) continue;

                cb.write(`let ${flagArgName} = 0;`);
                // Find args that use this flag
                const dependentArgs = Object.keys(argsConfig).filter(k => argsConfig[k].flagName === flagArgName);
                for (const depName of dependentArgs) {
                    const dep = argsConfig[depName];
                    if (dep.type === "true") {
                        cb.write(`if (this.${depName}) { ${flagArgName} |= 1 << ${dep.flagIndex}; }`);
                    } else {
                        cb.write(`if (this.${depName} !== undefined && this.${depName} !== null) { ${flagArgName} |= 1 << ${dep.flagIndex}; }`);
                    }
                }
                cb.write(`writer.writeInt(${flagArgName}, false);`);
            }

            for (const argName in argsConfig) {
                const arg = argsConfig[argName];
                if (arg.type === "#" || arg.type === "flags" || arg.type === "") continue; // Already handled

                let type = arg.type;
                if (arg.isVector) {
                    type = `Vector<${type}>`;
                }

                const isConditional = !!arg.flagName;
                if (isConditional) {
                    cb.write(`if (this.${argName} !== undefined && this.${argName} !== null) {`);
                    cb.indent();
                    writeSerializationCode(cb, type, "this." + argName);
                    cb.unindent();
                    cb.write("}");
                } else {
                    writeSerializationCode(cb, type, "this." + argName + (arg.isOptionalTS ? "!" : ""));
                }
            }

            cb.write("return writer.getValue();");
        });
        cb.write("");

        // readResult (only for functions)
        if (isFunction) {
            cb.block("readResult(reader: BinaryReader): " + getTsType(result) + " {", () => {
                writeDeserializationCode(cb, result, "result");
                cb.write("return result;");
            });
            cb.write("");
        }

        // resolve (only for functions)
        if (isFunction) {
            cb.block("async resolve(client: any, utils: any): Promise<void> {", () => {
                cb.write("// TODO: Implement resolve");
            });
            cb.write("");
        }

        // fromReader
        cb.block("static fromReader(reader: BinaryReader): " + className + " {", () => {
            cb.write("const args: any = {};");
            
            for (const argName in argsConfig) {
                const arg = argsConfig[argName];
                
                let type = arg.type;
                if (arg.isVector) {
                    type = `Vector<${type}>`;
                }

                if (arg.flagName) {
                    cb.write(`if (args.${arg.flagName} & (1 << ${arg.flagIndex})) {`);
                    cb.indent();
                    writeDeserializationCode(cb, type, `_${argName}`);
                    cb.write(`args.${argName} = _${argName};`);
                    cb.unindent();
                    cb.write("} else {");
                    cb.indent();
                    if (arg.type === "true") {
                        cb.write(`args.${argName} = false;`);
                    } else {
                        cb.write(`args.${argName} = undefined;`);
                    }
                    cb.unindent();
                    cb.write("}");
                } else {
                    writeDeserializationCode(cb, type, `_${argName}`);
                    cb.write(`args.${argName} = _${argName};`);
                }
            }
            
            cb.write(`return new ${className}(args);`);
        });
    });

    return { path: filePath, content: cb.toString() };
}
