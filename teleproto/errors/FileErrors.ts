import type { Api } from "../tl";

export class MediaAbortError extends Error {
    constructor() {
        super("Media operation aborted");
        this.name = "MediaAbortError";
    }
}

export class CdnRedirectError extends Error {
    constructor(readonly redirect: Api.upload.FileCdnRedirect) {
        super("upload.fileCdnRedirect");
        this.name = "CdnRedirectError";
    }
}
