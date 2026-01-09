import { NewMessage, NewMessageEvent, NewMessageInterface } from "./NewMessage";
import { Api } from "../tl";
import bigInt from "big-integer";

/**
 * Occurs whenever a message is edited.
 *
 * @remarks
 * On channels, `message.out` will be `true` if YOU sent the message originally,
 * **not if you edited it**! This can be dangerous if you run outgoing
 * commands on edits.
 *
 * Some examples:
 * - You send a message "A", `out` is `true`.
 * - You edit "A" to "B", `out` is `true`.
 * - Someone else edits "B" to "C", `out` is `true` (**be careful!**).
 * - Someone sends "X", `out` is `false`.
 * - Someone edits "X" to "Y", `out` is `false`.
 * - You edit "Y" to "Z", `out` is `false`.
 *
 * Since there are useful cases where you need the right `out` value,
 * the library cannot do anything automatically. Consider using
 * `fromUsers` to filter by the editor.
 *
 * @example
 * ```ts
 * client.addEventHandler((event: MessageEditedEvent) => {
 *     console.log(`Message ${event.message.id} was edited`);
 *     console.log(`New text: ${event.message.text}`);
 *     if (event.message.editDate) {
 *         console.log(`Edited at: ${event.message.editDate}`);
 *     }
 * }, new MessageEdited({}));
 * ```
 */
export class MessageEdited extends NewMessage {
    constructor(params: NewMessageInterface = {}) {
        super(params);
    }

    build(
        update: Api.TypeUpdate | Api.TypeUpdates,
        callback: undefined,
        selfId: bigInt.BigInteger
    ): MessageEditedEvent | undefined {
        if (
            update instanceof Api.UpdateEditMessage ||
            update instanceof Api.UpdateEditChannelMessage
        ) {
            if (!(update.message instanceof Api.Message)) {
                return undefined;
            }
            const event = new MessageEditedEvent(update.message, update);
            this.addAttributes(event);
            return event;
        }
        return undefined;
    }
}

/**
 * Represents a message edited event.
 * Has all the same properties and methods as NewMessageEvent.
 */
export class MessageEditedEvent extends NewMessageEvent {
    _eventName = "MessageEdited";
}
