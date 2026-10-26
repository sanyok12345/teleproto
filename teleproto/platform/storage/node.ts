import { LocalStorage } from "node-localstorage";

export function open(directory: string): Storage {
    return new LocalStorage(directory);
}
