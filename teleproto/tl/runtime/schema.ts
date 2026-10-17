export const FIELD_VECTOR = 1;
export const FIELD_FLAG = 2;
export const FIELD_BARE = 4;
export const FIELD_FLAGS_INDICATOR = 8;
export const FIELD_VECTOR_ID = 16;

export type CompactField = [name: number, type: number, bits: number, flagField?: number, flagBit?: number];

export type CompactDefinition = [
    fullName: number,
    constructorId: number,
    subclassOfId: number,
    result: number,
    isFunction: 0 | 1,
    fields?: CompactField[],
];

export interface CompactSchema {
    layer: number;
    strings: string[];
    definitions: CompactDefinition[];
}

export interface FieldDef {
    name: string;
    type: string | null;
    isVector: boolean;
    isFlag: boolean;
    bare: boolean;
    isFlagsIndicator: boolean;
    useVectorId: boolean;
    flagField: number;
    flagBit: number;
}

export interface ClassDef {
    name: string;
    namespace?: string;
    fullName: string;
    constructorId: number;
    subclassOfId: number;
    result: string;
    isFunction: boolean;
    fields: FieldDef[];
}

export function definitionName(schema: CompactSchema, index: number): string {
    return schema.strings[schema.definitions[index][0]];
}

export function decodeDefinition(schema: CompactSchema, index: number): ClassDef {
    const [fullNameIndex, constructorId, subclassOfId, result, isFunction, fields = []] = schema.definitions[index];
    const fullName = schema.strings[fullNameIndex];
    const dot = fullName.indexOf(".");
    return {
        name: dot < 0 ? fullName : fullName.slice(dot + 1),
        namespace: dot < 0 ? undefined : fullName.slice(0, dot),
        fullName,
        constructorId,
        subclassOfId,
        result: schema.strings[result],
        isFunction: isFunction === 1,
        fields: fields.map(([name, type, bits, flagField = -1, flagBit = -1]) => ({
            name: schema.strings[name],
            type: type < 0 ? null : schema.strings[type],
            isVector: (bits & FIELD_VECTOR) !== 0,
            isFlag: (bits & FIELD_FLAG) !== 0,
            bare: (bits & FIELD_BARE) !== 0,
            isFlagsIndicator: (bits & FIELD_FLAGS_INDICATOR) !== 0,
            useVectorId: (bits & FIELD_VECTOR_ID) !== 0,
            flagField,
            flagBit,
        })),
    };
}
