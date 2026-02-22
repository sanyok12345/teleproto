export const LAYER = 222;

import { Api } from "../api";

const tlobjects: Record<number, any> = {};

for (const tl of Object.values(Api as any)) {
    if ("CONSTRUCTOR_ID" in (tl as any)) {
        tlobjects[(tl as any).CONSTRUCTOR_ID] = tl;
    } else {
        for (const sub of Object.values(tl as any)) {
            tlobjects[(sub as any).CONSTRUCTOR_ID] = sub;
        }
    }
}

export { tlobjects };
