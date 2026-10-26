export interface KeyValueStorage {
    open(directory: string): Storage;
}
