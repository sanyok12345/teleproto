import type { ButtonLike, EntityLike } from "../../define";
import { Api } from "../api";
import { getInputUser } from "../../Utils";
import type { BigInteger } from "big-integer";

export class Button {
    public button: ButtonLike;
    public resize: boolean | undefined;
    public selective: boolean | undefined;
    public singleUse: boolean | undefined;

    constructor(
        button: Api.TypeKeyboardButton,
        resize?: boolean,
        singleUse?: boolean,
        selective?: boolean
    ) {
        this.button = button;
        this.resize = resize;
        this.singleUse = singleUse;
        this.selective = selective;
    }

    static _isInline(button: ButtonLike) {
        return (
            button instanceof Api.KeyboardButtonCallback ||
            button instanceof Api.KeyboardButtonSwitchInline ||
            button instanceof Api.KeyboardButtonUrl ||
            button instanceof Api.KeyboardButtonUrlAuth ||
            button instanceof Api.InputKeyboardButtonUrlAuth ||
            button instanceof Api.KeyboardButtonWebView ||
            button instanceof Api.KeyboardButtonSimpleWebView ||
            button instanceof Api.KeyboardButtonCopy ||
            button instanceof Api.KeyboardButtonGame ||
            button instanceof Api.KeyboardButtonBuy ||
            button instanceof Api.InputKeyboardButtonUserProfile ||
            button instanceof Api.InputKeyboardButtonRequestPeer
        );
    }

    static inline(text: string, data?: Buffer, style?: Api.KeyboardButtonStyle) {
        if (!data) {
            data = Buffer.from(text, "utf-8");
        }
        if (data.length > 64) {
            throw new Error("Too many bytes for the data");
        }
        return new Api.KeyboardButtonCallback({
            text: text,
            data: data,
            style: style,
        });
    }

    static switchInline(text: string, query = "", samePeer = false, style?: Api.KeyboardButtonStyle) {
        return new Api.KeyboardButtonSwitchInline({
            text,
            query,
            samePeer,
            style,
        });
    }

    static url(text: string, url?: string, style?: Api.KeyboardButtonStyle) {
        return new Api.KeyboardButtonUrl({
            text: text,
            url: url || text,
            style,
        });
    }

    static auth(
        text: string,
        url?: string,
        bot?: EntityLike,
        writeAccess?: boolean,
        fwdText?: string,
        style?: Api.KeyboardButtonStyle
    ) {
        return new Api.InputKeyboardButtonUrlAuth({
            text,
            url: url || text,
            bot: getInputUser(bot || new Api.InputUserSelf()),
            requestWriteAccess: writeAccess,
            fwdText: fwdText,
            style,
        });
    }

    static text(
        text: string,
        resize?: boolean,
        singleUse?: boolean,
        selective?: boolean
    ) {
        return new this(
            new Api.KeyboardButton({ text }),
            resize,
            singleUse,
            selective
        );
    }

    static requestLocation(
        text: string,
        resize?: boolean,
        singleUse?: boolean,
        selective?: boolean
    ) {
        return new this(
            new Api.KeyboardButtonRequestGeoLocation({ text }),
            resize,
            singleUse,
            selective
        );
    }

    static requestPhone(
        text: string,
        resize?: boolean,
        singleUse?: boolean,
        selective?: boolean
    ) {
        return new this(
            new Api.KeyboardButtonRequestPhone({ text }),
            resize,
            singleUse,
            selective
        );
    }

    static requestPoll(
        text: string,
        resize?: boolean,
        singleUse?: boolean,
        selective?: boolean
    ) {
        return new this(
            new Api.KeyboardButtonRequestPoll({ text }),
            resize,
            singleUse,
            selective
        );
    }

    static webView(text: string, url: string, style?: Api.KeyboardButtonStyle) {
        return new Api.KeyboardButtonWebView({
            text,
            url,
            style,
        });
    }

    static simpleWebView(text: string, url: string, style?: Api.KeyboardButtonStyle) {
        return new Api.KeyboardButtonSimpleWebView({
            text,
            url,
            style,
        });
    }

    static copy(text: string, copyText: string, style?: Api.KeyboardButtonStyle) {
        return new Api.KeyboardButtonCopy({
            text,
            copyText,
            style,
        });
    }

    static game(text: string, style?: Api.KeyboardButtonStyle) {
        return new Api.KeyboardButtonGame({
            text,
            style,
        });
    }

    static buy(text: string, style?: Api.KeyboardButtonStyle) {
        return new Api.KeyboardButtonBuy({
            text,
            style,
        });
    }

    static userProfile(text: string, user: EntityLike, style?: Api.KeyboardButtonStyle) {
        return new Api.InputKeyboardButtonUserProfile({
            text,
            userId: getInputUser(user),
            style,
        });
    }

    static requestPeer(
        text: string,
        buttonId: number,
        peerType: Api.TypeRequestPeerType,
        maxCount?: number,
        style?: Api.KeyboardButtonStyle
    ) {
        return new Api.InputKeyboardButtonRequestPeer({
            text,
            buttonId,
            peerType,
            maxQuantity: maxCount || 1,
            style,
        });
    }

    static style: StyleFunction = Object.assign(
        (opts?: {
            bgPrimary?: boolean;
            bgDanger?: boolean;
            bgSuccess?: boolean;
            icon?: BigInteger;
        }): Api.KeyboardButtonStyle => {
            return new Api.KeyboardButtonStyle(opts || {});
        },
        {
            primary: () => new Api.KeyboardButtonStyle({ bgPrimary: true }),
            danger: () => new Api.KeyboardButtonStyle({ bgDanger: true }),
            success: () => new Api.KeyboardButtonStyle({ bgSuccess: true }),
        }
    );

    static clear() {
        return new Api.ReplyKeyboardHide({});
    }

    static forceReply() {
        return new Api.ReplyKeyboardForceReply({});
    }
}

interface StyleFunction {
    (opts?: {
        bgPrimary?: boolean;
        bgDanger?: boolean;
        bgSuccess?: boolean;
        icon?: BigInteger;
    }): Api.KeyboardButtonStyle;
    primary(): Api.KeyboardButtonStyle;
    danger(): Api.KeyboardButtonStyle;
    success(): Api.KeyboardButtonStyle;
}
