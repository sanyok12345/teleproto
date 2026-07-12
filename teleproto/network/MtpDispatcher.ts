import bigInt from "big-integer";

import { Api } from "../tl";
import { GZIPPacked, MessageContainer, RPCResult, TLMessage } from "../tl/core";
import { BinaryReader, Logger } from "../extensions";
import {
    BadMessageError,
    RPCMessageToError,
    TypeNotFoundError,
} from "../errors";
import { PendingState } from "../extensions/PendingState";
import { MTProtoState } from "./MTProtoState";
import { Dcenter } from "./Dcenter";
import { RequestState } from "./RequestState";
import MsgsAck = Api.MsgsAck;

export interface SenderActions {
    readonly log: Logger;
    /** Requests that were written to the wire and await an answer */
    readonly pendingState: PendingState;
    /** Recently sent acks, resendable on bad_server_salt */
    readonly lastAcks: RequestState[];
    readonly state: MTProtoState;
    readonly dcenter?: Dcenter;
    readonly isMainSender: boolean;
    /** Schedules an acknowledgment for a received message id */
    ack(msgId: bigInt.BigInteger): void;
    /** Appends a service reply to the outgoing queue */
    enqueue(state: RequestState): void;
    /** Puts states back at the head of the queue for resending */
    requeue(states: RequestState[]): void;
    /** The server told us our auth key is unusable */
    onBadAuthKey(shouldSkipForMain: boolean): void;
    /** The server started a new session re-init on the next request */
    markNeedsInitConnection(): void;
    /** Hands an update (or a synthetic gap marker) to the client */
    dispatchUpdate(update: Api.TypeUpdates): void;
}

/**
 * Routes every decrypted MTProto message to its protocol reaction
 * (https://core.telegram.org/mtproto/service_messages)
 */
export class MtpDispatcher {
    private readonly sender: SenderActions;
    private _lastSessionUniqueId?: string;
    private readonly handlers: Record<
        string,
        (message: TLMessage) => Promise<void> | void
    >;

    constructor(sender: SenderActions) {
        this.sender = sender;
        this.handlers = {
            [RPCResult.CONSTRUCTOR_ID.toString()]:
                this.handleRPCResult.bind(this),
            [MessageContainer.CONSTRUCTOR_ID.toString()]:
                this.handleContainer.bind(this),
            [GZIPPacked.CONSTRUCTOR_ID.toString()]:
                this.handleGzipPacked.bind(this),
            [Api.Pong.CONSTRUCTOR_ID.toString()]: this.handlePong.bind(this),
            [Api.BadServerSalt.CONSTRUCTOR_ID.toString()]:
                this.handleBadServerSalt.bind(this),
            [Api.BadMsgNotification.CONSTRUCTOR_ID.toString()]:
                this.handleBadNotification.bind(this),
            [Api.MsgDetailedInfo.CONSTRUCTOR_ID.toString()]:
                this.handleDetailedInfo.bind(this),
            [Api.MsgNewDetailedInfo.CONSTRUCTOR_ID.toString()]:
                this.handleNewDetailedInfo.bind(this),
            [Api.NewSessionCreated.CONSTRUCTOR_ID.toString()]:
                this.handleNewSessionCreated.bind(this),
            [Api.MsgsAck.CONSTRUCTOR_ID.toString()]: this.handleAck.bind(this),
            [Api.FutureSalts.CONSTRUCTOR_ID.toString()]:
                this.handleFutureSalts.bind(this),
            [Api.MsgsStateReq.CONSTRUCTOR_ID.toString()]:
                this.handleStateForgotten.bind(this),
            [Api.MsgResendReq.CONSTRUCTOR_ID.toString()]:
                this.handleStateForgotten.bind(this),
            [Api.MsgsAllInfo.CONSTRUCTOR_ID.toString()]:
                this.handleMsgAll.bind(this),
        };
    }

    async process(message: TLMessage): Promise<void> {
        this.sender.ack(message.msgId);

        message.obj = await message.obj;
        this.sender.log.debug(
            `[MSG] Processing msgId=${message.msgId} type=${message.obj.className} constructorId=${message.obj.CONSTRUCTOR_ID}`
        );
        const handler =
            this.handlers[message.obj.CONSTRUCTOR_ID.toString()] ??
            this.handleUpdate.bind(this);
        await handler(message);
    }

    private popStates(msgId: bigInt.BigInteger): RequestState[] {
        const state = this.sender.pendingState.getAndDelete(msgId);
        if (state) {
            return [state];
        }

        const toPop: bigInt.BigInteger[] = [];
        for (const pending of this.sender.pendingState.values()) {
            if (pending.containerId?.equals(msgId)) {
                toPop.push(pending.msgId!);
            }
        }
        if (toPop.length) {
            const popped: RequestState[] = [];
            for (const x of toPop) {
                const state = this.sender.pendingState.getAndDelete(x);
                if (state) popped.push(state);
            }
            return popped;
        }

        for (const ack of this.sender.lastAcks) {
            if (ack.msgId?.equals(msgId)) {
                return [ack];
            }
        }

        return [];
    }

    private handleRPCResult(message: TLMessage) {
        const result = message.obj;
        const state = this.sender.pendingState.getAndDelete(result.reqMsgId);
        this.sender.log.debug(
            `Handling RPC result for message ${result.reqMsgId}`
        );

        if (!state) {
            try {
                const reader = new BinaryReader(result.body);
                if (!(reader.tgReadObject() instanceof Api.upload.File)) {
                    throw new TypeNotFoundError(0, Buffer.alloc(0));
                }
            } catch (e) {
                if (e instanceof TypeNotFoundError) {
                    this.sender.log.info(
                        `Received response without parent request: ${result.body}`
                    );
                    return;
                }
                throw e;
            }
            return;
        }

        if (result.error) {
            // eslint-disable-next-line new-cap
            const error = RPCMessageToError(result.error, state.request);
            this.sender.ack(state.msgId!);
            state.reject(error);
            if (
                error.errorMessage === "AUTH_KEY_UNREGISTERED" ||
                error.errorMessage === "SESSION_REVOKED"
            ) {
                this.sender.onBadAuthKey(true);
            }
        } else {
            try {
                const reader = new BinaryReader(result.body);
                const read = state.request.readResult(reader);
                this.sender.log.debug(`Handling RPC result ${read?.className}`);
                state.resolve(read);
            } catch (err) {
                state.reject(err);
                this.sender.log.error(
                    `Failed to read result for ${state.request.className}`,
                    err as Error
                );
            }
        }
    }

    private async handleContainer(message: TLMessage) {
        this.sender.log.debug(
            `[CONTAINER] msgId=${message.msgId} contains ${message.obj.messages.length} messages`
        );
        for (const innerMessage of message.obj.messages) {
            await this.process(innerMessage);
        }
    }

    private async handleGzipPacked(message: TLMessage) {
        this.sender.log.debug("Handling gzipped data");
        const reader = new BinaryReader(message.obj.data);
        message.obj = reader.tgReadObject();
        await this.process(message);
    }

    private handleUpdate(message: TLMessage) {
        if (message.obj.SUBCLASS_OF_ID !== 0x8af52aac) { // updates
            this.sender.log.warn(
                `Note: ${message.obj.className} is not an update, not dispatching it`
            );
            return;
        }
        this.sender.log.debug(
            `[UPDATE] msgId=${message.msgId} type=${message.obj.className}` +
            (message.obj.updates
                ? ` innerUpdates=${message.obj.updates.length}:[${message.obj.updates
                    .map((u: any) => u.className)
                    .join(",")}]`
                : "")
        );
        this.sender.dispatchUpdate(message.obj);
    }

    private handlePong(message: TLMessage) {
        const pong = message.obj;
        this.sender.log.debug(`Handling pong for message ${pong.msgId}`);
        const state = this.sender.pendingState.get(pong.msgId.toString());
        this.sender.pendingState.delete(pong.msgId.toString());
        if (state) {
            state.resolve(pong);
        }
    }

    private handleBadServerSalt(message: TLMessage) {
        const badSalt = message.obj;
        this.sender.log.debug(
            `Handling bad salt for message ${badSalt.badMsgId}`
        );
        this.sender.state.salt = badSalt.newServerSalt;
        this.sender.dcenter?.updateSalt(badSalt.newServerSalt);
        const states = this.popStates(badSalt.badMsgId);
        this.sender.requeue(states);
        this.sender.log.debug(`${states.length} message(s) will be resent`);
    }

    private handleBadNotification(message: TLMessage) {
        const badMsg = message.obj;
        const states = this.popStates(badMsg.badMsgId);
        this.sender.log.debug(`Handling bad msg ${JSON.stringify(badMsg)}`);
        if ([16, 17].includes(badMsg.errorCode)) {
            const to = this.sender.state.updateTimeOffset(
                bigInt(message.msgId)
            );
            this.sender.log.info(
                `System clock is wrong, set time offset to ${to}s`
            );
        } else if (badMsg.errorCode === 32) {
            this.sender.state._sequence += 64;
        } else if (badMsg.errorCode === 33) {
            this.sender.state._sequence -= 16;
        } else {
            for (const state of states) {
                if (state.request instanceof MsgsAck) continue;
                state.reject(
                    new BadMessageError(state.request, badMsg.errorCode)
                );
            }
            return;
        }
        this.sender.requeue(states);
        this.sender.log.debug(
            `${states.length} messages will be resent due to bad msg`
        );
    }

    private handleDetailedInfo(message: TLMessage) {
        const msgId = message.obj.answerMsgId;
        this.sender.log.debug(`Handling detailed info for message ${msgId}`);
        this.sender.ack(msgId);
    }

    private handleNewDetailedInfo(message: TLMessage) {
        const msgId = message.obj.answerMsgId;
        this.sender.log.debug(
            `Handling new detailed info for message ${msgId}`
        );
        this.sender.ack(msgId);
    }

    private handleNewSessionCreated(message: TLMessage) {
        this.sender.log.debug("Handling new session created");
        this.sender.state.salt = message.obj.serverSalt;
        this.sender.dcenter?.updateSalt(message.obj.serverSalt);
        const uniqueId = String(message.obj.uniqueId);
        if (this._lastSessionUniqueId === undefined) {
            this._lastSessionUniqueId = uniqueId;
            return;
        }
        if (uniqueId === this._lastSessionUniqueId) {
            return;
        }
        this._lastSessionUniqueId = uniqueId;
        this.sender.markNeedsInitConnection();
        if (this.sender.isMainSender) {
            this.sender.dispatchUpdate(new Api.UpdatesTooLong());
        }
    }

    private handleAck(message: TLMessage) {
        if (message.obj.msgIds) {
            for (const msgId of message.obj.msgIds) {
                const state = this.sender.pendingState.get(msgId);
                if (state) {
                    state.acknowledged = true;
                }
            }
        }
    }

    private handleFutureSalts(message: TLMessage) {
        this.sender.log.debug(
            `Handling future salts for message ${message.msgId}`
        );
        const state = this.sender.pendingState.getAndDelete(message.msgId);
        if (state) {
            state.resolve(message.obj);
        }
    }

    private handleStateForgotten(message: TLMessage) {
        this.sender.enqueue(
            new RequestState(
                new Api.MsgsStateInfo({
                    reqMsgId: message.msgId,
                    info: String.fromCharCode(1).repeat(
                        message.obj.msgIds.length
                    ),
                })
            )
        );
    }

    private handleMsgAll(_message: TLMessage) { }
}
