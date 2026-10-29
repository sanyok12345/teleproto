export function open(_directory: string): Storage {
    const storage = (globalThis as { localStorage?: Storage }).localStorage;
    if (!storage) throw new Error("localStorage is not available in this environment: use MemorySession or StringSession");
    return storage;
}
