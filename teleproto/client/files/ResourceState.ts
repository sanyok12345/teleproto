export class ResourceState {
    limit = 0;
    using = 0;
    used = 0;
    estimatedLimit = 0;

    constructor(readonly unitSize: number) {}

    get activeLimit() {
        return this.limit - this.used;
    }

    get unused() {
        return this.limit - this.using - this.used;
    }

    get estimatedExtra() {
        const wanted = Math.max(this.limit, this.estimatedLimit) - this.using - this.used;
        const rounded = Math.ceil(wanted / this.unitSize) * this.unitSize;
        return rounded + this.using + this.used - this.limit;
    }

    startUse(bytes: number) {
        this.using += bytes;
    }

    stopUse(bytes: number) {
        this.using -= bytes;
        this.used += bytes;
    }

    updateEstimatedLimit(extra: number): boolean {
        let estimated = this.used + this.using + extra - Math.min(this.using, extra);
        if (estimated < this.limit) {
            this.used += this.limit - estimated;
            estimated = this.limit;
        }
        if (estimated === this.estimatedLimit) return false;
        this.estimatedLimit = estimated;
        return true;
    }
}
