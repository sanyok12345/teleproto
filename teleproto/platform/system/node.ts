import os from "node:os";

export function deviceModel(): string {
    return os.type().toString();
}

export function systemVersion(): string {
    return os.release().toString();
}
