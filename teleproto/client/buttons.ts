import { Api } from "../tl";
import type { ButtonLike } from "../define";
import { Button } from "../tl/custom/button";
import { InlineKeyboard, ReplyKeyboard } from "../tl/custom/keyboard";
import { MessageButton } from "../tl/custom/messageButton";
import { isArrayLike, unionId } from "../Helpers";

// ButtonMethods
/**
 * Converts a flexible button input into a Telegram {@link Api.TypeReplyMarkup}.
 *
 * Accepts a single button, a row of buttons, a grid (array of rows), or an existing
 * `ReplyMarkup` object. Automatically detects whether buttons are inline or normal
 * and wraps them in the appropriate markup type.
 *
 * @param buttons - The button(s) to convert. Can be a {@link ButtonLike}, an array, or a 2D array.
 * @param inlineOnly - If `true`, forces inline-only mode (throws if normal buttons are found).
 * @returns The constructed reply markup, or `undefined` if no buttons were provided.
 * @hidden
 */
export function buildReplyMarkup(
    buttons:
        | Api.TypeReplyMarkup
        | undefined
        | ButtonLike
        | ButtonLike[]
        | ButtonLike[][],
    inlineOnly: boolean = false
): Api.TypeReplyMarkup | undefined {
    if (buttons == undefined) {
        return undefined;
    }
    if (buttons instanceof InlineKeyboard || buttons instanceof ReplyKeyboard) {
        const markup = buttons.build();
        if (inlineOnly && markup instanceof Api.ReplyKeyboardMarkup) {
            throw new Error("You cannot use non-inline buttons here");
        }
        return markup;
    }
    if ("SUBCLASS_OF_ID" in buttons) {
        if (buttons.SUBCLASS_OF_ID == unionId("ReplyMarkup")) {
            return buttons as Api.TypeReplyMarkup;
        }
    }
    if (!isArrayLike(buttons)) {
        buttons = [[buttons as ButtonLike]];
    } else if (!buttons || !isArrayLike(buttons[0])) {
        // @ts-ignore
        buttons = [buttons];
    }
    let isInline = false;
    let isNormal = false;
    let resize: boolean | undefined;
    let singleUse: boolean | undefined;
    let selective: boolean | undefined;

    const rows: ButtonLike[][] = [];
    // @ts-ignore
    for (const row of buttons) {
        const current = [];
        for (let button of row) {
            if (button instanceof Button) {
                if (button.resize != undefined) {
                    resize = button.resize;
                }
                if (button.singleUse != undefined) {
                    singleUse = button.singleUse;
                }
                if (button.selective != undefined) {
                    selective = button.selective;
                }
                button = button.button;
            } else if (button instanceof MessageButton) {
                button = button.button;
            }
            if (Button._isInline(button)) {
                isInline = true;
                current.push(button);
            } else if (button instanceof Api.KeyboardButton) {
                isNormal = true;
                current.push(button);
            }
        }
        if (current.length) {
            rows.push(current);
        }
    }
    if (inlineOnly && isNormal) {
        throw new Error("You cannot use non-inline buttons here");
    } else if (isInline && isNormal) {
        throw new Error("You cannot mix inline with normal buttons");
    } else if (isInline) {
        return new Api.ReplyInlineMarkup({
            rows: rows.map(
                (buttons) =>
                    new Api.KeyboardInlineButtonRow({
                        buttons: buttons as Api.TypeKeyboardInlineButton[],
                    })
            ),
        });
    }
    return new Api.ReplyKeyboardMarkup({
        rows: rows.map(
            (buttons) =>
                new Api.KeyboardButtonRow({
                    buttons: buttons as Api.TypeKeyboardButton[],
                })
        ),
        resize: resize,
        singleUse: singleUse,
        selective: selective,
    });
}
