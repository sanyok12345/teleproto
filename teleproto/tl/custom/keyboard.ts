import type { BigInteger } from "big-integer";
import type { EntityLike } from "../../define";
import { returnBigInt } from "../../Helpers";
import { getInputUser } from "../../Utils";
import { Api } from "../api";
import { Button } from "./button";

/** Background colour of a button, mapping to the `bg_*` flags of the schema. */
export type ButtonColor = "primary" | "danger" | "success";

/** Shorthand for {@link Api.KeyboardButtonStyle}. */
export interface ButtonStyleOptions {
    /** Background colour. */
    color?: ButtonColor;
    /** Custom emoji shown on the button. */
    icon?: BigInteger | string | number;
}

/** A ready style, or the shorthand that builds one. */
export type ButtonStyleLike = Api.KeyboardButtonStyle | ButtonStyleOptions;

/** Accepted by every button method of both keyboards. */
export interface ButtonOptions {
    style?: ButtonStyleLike;
}

/** Options of {@link InlineKeyboard.callback}. */
export interface CallbackButtonOptions extends ButtonOptions {
    /** Ask the user for their 2FA password before the query is sent. */
    requiresPassword?: boolean;
}

/** Options of {@link InlineKeyboard.urlAuth}. */
export interface UrlAuthButtonOptions extends ButtonOptions {
    /** Bot that will receive the authorization; makes the button an input one. */
    bot?: EntityLike;
    /** Whether the bot may write to the user after the authorization. */
    writeAccess?: boolean;
    /** Text shown instead of the default when the message is forwarded. */
    fwdText?: string;
    /** Id echoed back in `messages.requestUrlAuth`, for non-input buttons. */
    buttonId?: number;
}

/** Options of {@link InlineKeyboard.switchInline}. */
export interface SwitchInlineButtonOptions extends ButtonOptions {
    /** Inline query inserted into the input field. */
    query?: string;
    /** Insert the query in the current chat instead of asking for one. */
    samePeer?: boolean;
    /** Chat types offered to the user when picking a chat. */
    peerTypes?: Api.TypeInlineQueryPeerType[];
}

/** Options of {@link ReplyKeyboard.requestPoll}. */
export interface RequestPollButtonOptions extends ButtonOptions {
    /** Force a quiz, or a regular poll when `false`; omit to let the user choose. */
    quiz?: boolean;
}

/** Options of {@link ReplyKeyboard.requestPeer}. */
export interface RequestPeerButtonOptions extends ButtonOptions {
    /** Id echoed back in the `messages.sendBotRequestedPeer` the user triggers. */
    buttonId: number;
    /** Which peers the user may pick. */
    peerType: Api.TypeRequestPeerType;
    /** How many peers may be picked, `1` by default. */
    max?: number;
    /** Ask the user to also share the peer's name. */
    nameRequested?: boolean;
    /** Ask the user to also share the peer's username. */
    usernameRequested?: boolean;
    /** Ask the user to also share the peer's photo. */
    photoRequested?: boolean;
}

/** Options of the keyboard shown in place of the input field. */
export interface ReplyKeyboardOptions {
    /** Resize the keyboard to fit its buttons. */
    resize?: boolean;
    /** Hide the keyboard after one use. */
    singleUse?: boolean;
    /** Show it only to the users mentioned or replied to by the message. */
    selective?: boolean;
    /** Keep it open instead of collapsing it to the input field. */
    persistent?: boolean;
    /** Focus the input field, as a force reply does. */
    forceReply?: boolean;
    /** Placeholder shown in the input field while the keyboard is open. */
    placeholder?: string;
}

/** Options of the keyboard attached to a message. */
export interface InlineKeyboardOptions {
    /** Focus the input field, as a force reply does. */
    forceReply?: boolean;
}

/** Options of {@link Keyboard.hide}. */
export interface HideKeyboardOptions {
    /** Hide it only for the users mentioned or replied to by the message. */
    selective?: boolean;
}

/** Options of {@link Keyboard.forceReply}. */
export interface ForceReplyOptions {
    /** Force a reply from one user only. */
    singleUse?: boolean;
    /** Ask only the users mentioned or replied to by the message. */
    selective?: boolean;
    /** Placeholder shown in the input field. */
    placeholder?: string;
}

function toStyle(style?: ButtonStyleLike): Api.KeyboardButtonStyle | undefined {
    if (!style) return undefined;
    if (style instanceof Api.KeyboardButtonStyle) return style;
    return new Api.KeyboardButtonStyle({
        bgPrimary: style.color === "primary" || undefined,
        bgDanger: style.color === "danger" || undefined,
        bgSuccess: style.color === "success" || undefined,
        icon: style.icon === undefined ? undefined : returnBigInt(style.icon),
    });
}

abstract class KeyboardBuilder<TButton> {
    protected readonly rows: TButton[][];

    protected constructor(rows: TButton[][] = []) {
        this.rows = rows.map((row) => [...row]);
    }

    /** Starts a new row; empty rows are dropped when the keyboard is built. */
    row(): this {
        this.rows.push([]);
        return this;
    }

    /** Appends ready buttons to the current row. */
    add(...buttons: TButton[]): this {
        this.current().push(...buttons);
        return this;
    }

    /** Reflows every button into rows of at most `count` buttons. */
    columns(count: number): this {
        if (count < 1) throw new Error("A keyboard row needs at least one button");
        const flat = this.rows.flat();
        this.rows.length = 0;
        for (let i = 0; i < flat.length; i += count) {
            this.rows.push(flat.slice(i, i + count));
        }
        return this;
    }

    /** How many buttons the keyboard holds. */
    get size(): number {
        return this.rows.reduce((total, row) => total + row.length, 0);
    }

    protected current(): TButton[] {
        if (!this.rows.length) this.rows.push([]);
        return this.rows[this.rows.length - 1]!;
    }

    protected filled(): TButton[][] {
        return this.rows.filter((row) => row.length > 0);
    }
}

/**
 * Keyboard attached to a message, built either from a grid or by chaining.
 *
 * @example
 * ```ts
 * const keyboard = new InlineKeyboard()
 *     .callback("Yes", "yes", { style: { color: "success" } })
 *     .callback("No", "no", { style: { color: "danger" } })
 *     .row()
 *     .url("Open", "https://t.me/durov");
 *
 * await client.sendMessage(chat, { message: "Well?", buttons: keyboard });
 * ```
 * @category Messages
 */
export class InlineKeyboard extends KeyboardBuilder<Api.TypeKeyboardInlineButton> {
    private options: InlineKeyboardOptions;

    constructor(
        rows: (Api.TypeKeyboardInlineButton | Button)[][] = [],
        options: InlineKeyboardOptions = {},
    ) {
        super(
            rows.map((row) =>
                row.map((button) => {
                    const raw = button instanceof Button ? button.button : button;
                    if (!(raw instanceof Api.KeyboardInlineButton)) {
                        throw new Error("An inline keyboard takes inline buttons only");
                    }
                    return raw;
                }),
            ),
        );
        this.options = options;
    }

    /** Sends `data` back as a callback query when pressed. */
    callback(text: string, data: Buffer | string, options: CallbackButtonOptions = {}): this {
        const payload = typeof data === "string" ? Buffer.from(data, "utf-8") : data;
        if (payload.length > 64) {
            throw new Error("Callback data must not exceed 64 bytes");
        }
        return this.push(
            text,
            new Api.InlineButtonTypeCallback({
                data: payload,
                requiresPassword: options.requiresPassword,
            }),
            options,
        );
    }

    /** Opens a link. */
    url(text: string, url: string, options: ButtonOptions = {}): this {
        return this.push(text, new Api.InlineButtonTypeUrl({ url }), options);
    }

    /** Logs the user into a website, optionally letting a bot write to them. */
    urlAuth(text: string, url: string, options: UrlAuthButtonOptions = {}): this {
        const type =
            options.bot !== undefined || options.writeAccess !== undefined
                ? new Api.InputInlineButtonTypeUrlAuth({
                    url,
                    bot: getInputUser(options.bot ?? new Api.InputUserSelf()),
                    requestWriteAccess: options.writeAccess,
                    fwdText: options.fwdText,
                })
                : new Api.InlineButtonTypeUrlAuth({
                    url,
                    fwdText: options.fwdText,
                    buttonId: options.buttonId ?? 0,
                });
        return this.push(text, type, options);
    }

    /** Opens a web app. */
    webApp(text: string, url: string, options: ButtonOptions = {}): this {
        return this.push(text, new Api.InlineButtonTypeWebView({ url }), options);
    }

    /** Asks the user for a chat and starts an inline query there. */
    switchInline(text: string, options: SwitchInlineButtonOptions = {}): this {
        return this.push(
            text,
            new Api.InlineButtonTypeSwitchInline({
                query: options.query ?? "",
                samePeer: options.samePeer,
                peerTypes: options.peerTypes,
            }),
            options,
        );
    }

    /** Opens a user's profile. */
    userProfile(text: string, user: EntityLike, options: ButtonOptions = {}): this {
        return this.push(
            text,
            new Api.InputInlineButtonTypeUserProfile({ userId: getInputUser(user) }),
            options,
        );
    }

    /** Copies text to the clipboard. */
    copy(text: string, copyText: string, options: ButtonOptions = {}): this {
        return this.push(text, new Api.InlineButtonTypeCopy({ copyText }), options);
    }

    /** Starts the game attached to the message. */
    game(text: string, options: ButtonOptions = {}): this {
        return this.push(text, new Api.InlineButtonTypeGame(), options);
    }

    /** Pays the invoice attached to the message. */
    buy(text: string, options: ButtonOptions = {}): this {
        return this.push(text, new Api.InlineButtonTypeBuy(), options);
    }

    /** Shown greyed out and does nothing when pressed. */
    disabled(text: string, options: ButtonOptions = {}): this {
        return this.push(text, new Api.InlineButtonTypeDisabled(), options);
    }

    /** Focuses the input field when the message arrives. */
    forceReply(forceReply = true): this {
        this.options = { ...this.options, forceReply };
        return this;
    }

    /** Builds the markup sent to Telegram. */
    build(): Api.ReplyInlineMarkup {
        return new Api.ReplyInlineMarkup({
            rows: this.filled().map(
                (buttons) => new Api.KeyboardInlineButtonRow({ buttons }),
            ),
            forceReply: this.options.forceReply,
        });
    }

    private push(
        text: string,
        type: Api.TypeInlineButtonType,
        options: ButtonOptions,
    ): this {
        return this.add(
            new Api.KeyboardInlineButton({
                text,
                type,
                style: toStyle(options.style),
            }),
        );
    }
}

/**
 * Keyboard shown in place of the input field, built either from a grid or by
 * chaining.
 *
 * @example
 * ```ts
 * const keyboard = new ReplyKeyboard([], { resize: true, placeholder: "Pick one" })
 *     .text("Hi")
 *     .requestPhone("Share phone");
 *
 * await client.sendMessage(chat, { message: "Menu", buttons: keyboard });
 * ```
 * @category Messages
 */
export class ReplyKeyboard extends KeyboardBuilder<Api.TypeKeyboardButton> {
    private options: ReplyKeyboardOptions;

    constructor(
        rows: (Api.TypeKeyboardButton | Button)[][] = [],
        options: ReplyKeyboardOptions = {},
    ) {
        super(
            rows.map((row) =>
                row.map((button) => {
                    const raw = button instanceof Button ? button.button : button;
                    if (!(raw instanceof Api.KeyboardButton)) {
                        throw new Error("A reply keyboard takes plain buttons only");
                    }
                    return raw;
                }),
            ),
        );
        this.options = options;
    }

    /** Sends its own text as a message. */
    text(text: string, options: ButtonOptions = {}): this {
        return this.push(text, new Api.ButtonTypeDefault(), options);
    }

    /** Asks the user to share their phone number. */
    requestPhone(text: string, options: ButtonOptions = {}): this {
        return this.push(text, new Api.ButtonTypeRequestPhone(), options);
    }

    /** Asks the user to share their location. */
    requestLocation(text: string, options: ButtonOptions = {}): this {
        return this.push(text, new Api.ButtonTypeRequestGeoLocation(), options);
    }

    /** Opens the poll composer. */
    requestPoll(text: string, options: RequestPollButtonOptions = {}): this {
        return this.push(
            text,
            new Api.ButtonTypeRequestPoll({ quiz: options.quiz }),
            options,
        );
    }

    /** Asks the user to pick a chat, user or channel. */
    requestPeer(text: string, options: RequestPeerButtonOptions): this {
        return this.push(
            text,
            new Api.InputButtonTypeRequestPeer({
                buttonId: options.buttonId,
                peerType: options.peerType,
                maxQuantity: options.max ?? 1,
                nameRequested: options.nameRequested,
                usernameRequested: options.usernameRequested,
                photoRequested: options.photoRequested,
            }),
            options,
        );
    }

    /** Opens a web app. */
    webApp(text: string, url: string, options: ButtonOptions = {}): this {
        return this.push(text, new Api.ButtonTypeSimpleWebView({ url }), options);
    }

    /** Changes the keyboard's own options. */
    set(options: ReplyKeyboardOptions): this {
        this.options = { ...this.options, ...options };
        return this;
    }

    /** Builds the markup sent to Telegram. */
    build(): Api.ReplyKeyboardMarkup {
        return new Api.ReplyKeyboardMarkup({
            rows: this.filled().map(
                (buttons) => new Api.KeyboardButtonRow({ buttons }),
            ),
            resize: this.options.resize,
            singleUse: this.options.singleUse,
            selective: this.options.selective,
            persistent: this.options.persistent,
            forceReply: this.options.forceReply,
            placeholder: this.options.placeholder,
        });
    }

    private push(
        text: string,
        type: Api.TypeButtonType,
        options: ButtonOptions,
    ): this {
        return this.add(
            new Api.KeyboardButton({
                text,
                type,
                style: toStyle(options.style),
            }),
        );
    }
}

/** The markups that carry no buttons. */
export const Keyboard = {
    /** Removes the keyboard shown in place of the input field. */
    hide(options: HideKeyboardOptions = {}): Api.ReplyKeyboardHide {
        return new Api.ReplyKeyboardHide({ selective: options.selective });
    },
    /** Focuses the input field, asking the user to reply. */
    forceReply(options: ForceReplyOptions = {}): Api.ReplyKeyboardForceReply {
        return new Api.ReplyKeyboardForceReply({
            singleUse: options.singleUse,
            selective: options.selective,
            placeholder: options.placeholder,
        });
    },
};
