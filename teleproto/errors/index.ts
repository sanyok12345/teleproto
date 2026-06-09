/**
 * Converts a Telegram's RPC Error to a Python error.
 * @param rpcError the RPCError instance
 * @param request the request that caused this error
 * @constructor the RPCError as a Python exception that represents this error
 */
import { Api } from "../tl";

import { RPCError } from "./RPCBaseErrors";
import { rpcErrorsDict, rpcErrorsRe, baseErrors } from "./RPCErrorList";

export function RPCMessageToError(
    rpcError: Api.RpcError,
    request: Api.AnyRequest
) {
    const message = rpcError.errorMessage;

    let error: RPCError;
    const ExactCls = rpcErrorsDict.get(message);
    if (ExactCls) {
        error = new ExactCls({ request });
    } else {
        let matched = false;
        for (const [msgRegex, Cls] of rpcErrorsRe) {
            const m = message.match(msgRegex);
            if (m) {
                const capture = m.length >= 2 ? parseInt(m[1]) : null;
                error = new Cls({ request, capture });
                matched = true;
                break;
            }
        }
        if (!matched) {
            const BaseCls =
                baseErrors.get(Math.abs(rpcError.errorCode)) || RPCError;
            error = new BaseCls(message, request, rpcError.errorCode);
        }
    }

    error!.errorMessage = message;
    return error!;
}

export * from "./Common";
export * from "./RPCBaseErrors";
export * from "./RPCErrorList";
