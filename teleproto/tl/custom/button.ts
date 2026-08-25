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

    static _isInline(button: ButtonLike): button is Api.KeyboardInlineButton {
        return button instanceof Api.KeyboardInlineButton;
    }

    static inline(text: string, data?: Buffer, style?: Api.KeyboardButtonStyle) {
        if (!data) {
            data = Buffer.from(text, "utf-8");
        }
        if (data.length > 64) {
            throw new Error("Too many bytes for the data");
        }
        return new Api.KeyboardInlineButton({
            text: text,
            type: new Api.InlineButtonTypeCallback({
                data: data,
            }),
            style: style,
        });
    }

    static switchInline(text: string, query = "", samePeer = false, style?: Api.KeyboardButtonStyle) {
        return new Api.KeyboardInlineButton({
            text,
            type: new Api.InlineButtonTypeSwitchInline({
                query,
                samePeer,
            }),
            style,
        });
    }

    static url(text: string, url?: string, style?: Api.KeyboardButtonStyle) {
        return new Api.KeyboardInlineButton({
            text: text,
            type: new Api.InlineButtonTypeUrl({
                url: url || text,
            }),
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
        return new Api.KeyboardInlineButton({
            text,
            type: new Api.InputInlineButtonTypeUrlAuth({
                url: url || text,
                bot: getInputUser(bot || new Api.InputUserSelf()),
                requestWriteAccess: writeAccess,
                fwdText: fwdText,
            }),
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
            new Api.KeyboardButton({
                text,
                type: new Api.ButtonTypeDefault(),
            }),
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
            new Api.KeyboardButton({
                text,
                type: new Api.ButtonTypeRequestGeoLocation(),
            }),
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
            new Api.KeyboardButton({
                text,
                type: new Api.ButtonTypeRequestPhone(),
            }),
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
            new Api.KeyboardButton({
                text,
                type: new Api.ButtonTypeRequestPoll({}),
            }),
            resize,
            singleUse,
            selective
        );
    }

    static webView(text: string, url: string, style?: Api.KeyboardButtonStyle) {
        return new Api.KeyboardInlineButton({
            text,
            type: new Api.InlineButtonTypeWebView({
                url,
            }),
            style,
        });
    }

    static simpleWebView(text: string, url: string, style?: Api.KeyboardButtonStyle) {
        return new Api.KeyboardButton({
            text,
            type: new Api.ButtonTypeSimpleWebView({
                url,
            }),
            style,
        });
    }

    static copy(text: string, copyText: string, style?: Api.KeyboardButtonStyle) {
        return new Api.KeyboardInlineButton({
            text,
            type: new Api.InlineButtonTypeCopy({
                copyText,
            }),
            style,
        });
    }

    static game(text: string, style?: Api.KeyboardButtonStyle) {
        return new Api.KeyboardInlineButton({
            text,
            type: new Api.InlineButtonTypeGame(),
            style,
        });
    }

    static buy(text: string, style?: Api.KeyboardButtonStyle) {
        return new Api.KeyboardInlineButton({
            text,
            type: new Api.InlineButtonTypeBuy(),
            style,
        });
    }

    static disabled(text: string, style?: Api.KeyboardButtonStyle) {
        return new Api.KeyboardInlineButton({
            text,
            type: new Api.InlineButtonTypeDisabled(),
            style,
        });
    }

    static userProfile(text: string, user: EntityLike, style?: Api.KeyboardButtonStyle) {
        return new Api.KeyboardInlineButton({
            text,
            type: new Api.InputInlineButtonTypeUserProfile({
                userId: getInputUser(user),
            }),
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
        return new Api.KeyboardButton({
            text,
            type: new Api.InputButtonTypeRequestPeer({
                buttonId,
                peerType,
                maxQuantity: maxCount || 1,
            }),
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
