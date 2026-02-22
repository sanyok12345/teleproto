import { Api } from "../../api";
import { CustomMessage } from "../../custom/message";
import { tlobjects } from "../registry";

function getGetter(obj: any, prop: string) {
    while (obj) {
        const getter = Object.getOwnPropertyDescriptor(obj, prop);
        if (getter && getter.get) {
            return getter.get;
        }
        obj = Object.getPrototypeOf(obj);
    }
}

function getSetter(obj: any, prop: string) {
    while (obj) {
        const setter = Object.getOwnPropertyDescriptor(obj, prop);
        if (setter && setter.set) {
            return setter.set;
        }
        obj = Object.getPrototypeOf(obj);
    }
}

function getInstanceMethods(obj: any) {
    const keys = {
        methods: new Set<string>(),
        setters: new Set<string>(),
        getters: new Set<string>(),
    };
    let topObject = obj;

    const mapAllMethods = (property: string) => {
        const getter = getGetter(topObject, property);
        const setter = getSetter(topObject, property);
        if (getter) {
            keys.getters.add(property);
        } else if (setter) {
            keys.setters.add(property);
        } else if (property !== "constructor") {
            keys.methods.add(property);
        }
    };

    do {
        Object.getOwnPropertyNames(obj).map(mapAllMethods);
        obj = Object.getPrototypeOf(obj);
    } while (obj && Object.getPrototypeOf(obj));

    return keys;
}

function patchClass(clazz: Function) {
    const { getters, setters, methods } = getInstanceMethods(CustomMessage.prototype);
    for (const getter of getters) {
        Object.defineProperty(clazz.prototype, getter, {
            get: getGetter(CustomMessage.prototype, getter),
        });
    }
    for (const setter of setters) {
        Object.defineProperty(clazz.prototype, setter, {
            set: getSetter(CustomMessage.prototype, setter),
        });
    }
    for (const method of methods) {
        (clazz.prototype as any)[method] = (CustomMessage.prototype as any)[method];
    }
}

export function patchAll() {
    patchClass((Api as any).Message);
    patchClass((Api as any).MessageService);
    patchClass((Api as any).MessageEmpty);

    for (const constructorId of [
        0xb6d915d7,
        0x90dddc11,
        0x8f31b327,
        0xe8fd8014,
        0xbe9c2a5d,
    ]) {
        if (tlobjects[constructorId]) {
            patchClass(tlobjects[constructorId]);
        }
    }
}
