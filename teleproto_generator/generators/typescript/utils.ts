export function mapType(type: string): string | null {
    switch (type) {
        case "true":
        case "bool":
        case "Bool":
            return "boolean";
        case "":
        case "#":
        case "flags":
            return "number";
        case "EntityLike":
        case "MessageIDLike":
            return type;
        case "long":
        case "int128":
        case "int256":
            return "bigint";
        case "int":
        case "double":
            return "number";
        case "string":
            return "string";
        case "bytes":
            return "Buffer";
        case "Object":
        case "!X":
        case "X":
            return "any";
        default:
            return null;
    }
}

export function getTsType(type: string): string {
    // console.log("getTsType", type);
    if (type.startsWith("Vector<")) {
        const inner = type.slice(7, -1);
        return `${getTsType(inner)}[]`;
    }
    
    const mapped = mapType(type);
    if (mapped) return mapped;

    if (type.includes(".")) {
        const [ns, name] = type.split(".");
        return `Type${name}`;
    }
    
    return `Type${type}`;
}

export function getTypeRelativePath(type: string): string | null {
    if (type.startsWith("Vector<")) {
        return getTypeRelativePath(type.slice(7, -1));
    }
    
    if (type === "EntityLike" || type === "MessageIDLike") {
        return "../../define";
    }

    if (mapType(type)) return null;

    if (type.includes(".")) {
        const [ns, name] = type.split(".");
        return `${ns}/Type${name}`;
    }
    
    return `Type${type}`;
}
