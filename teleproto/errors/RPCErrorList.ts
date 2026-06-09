/* eslint-disable */
import {
    RPCError,
    InvalidDCError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    AuthKeyError,
    FloodError,
    FrozenError,
    ServerError,
    TimedOutError,
} from "./RPCBaseErrors";

export interface ErrorArgs {
    request: any;
    capture?: number | null;
}

/** Your IP address is associated to DC %d, please re-send the query to that DC. */
export class NetworkMigrateError extends InvalidDCError {
    public newDc: number;

    constructor(args: ErrorArgs) {
        const newDc = Number(args.capture || 0);
        const message = "Your IP address is associated to DC " + newDc + ", please re-send the query to that DC." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.newDc = newDc;
    }
}

/** Your phone number is associated to DC %d, please re-send the query to that DC. */
export class PhoneMigrateError extends InvalidDCError {
    public newDc: number;

    constructor(args: ErrorArgs) {
        const newDc = Number(args.capture || 0);
        const message = "Your phone number is associated to DC " + newDc + ", please re-send the query to that DC." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.newDc = newDc;
    }
}

/** Channel statistics for the specified channel are stored on DC %d, please re-send the query to that DC. */
export class StatsMigrateError extends InvalidDCError {
    public newDc: number;

    constructor(args: ErrorArgs) {
        const newDc = Number(args.capture || 0);
        const message = "Channel statistics for the specified channel are stored on DC " + newDc + ", please re-send the query to that DC." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.newDc = newDc;
    }
}

/** Your account is associated to DC %d, please re-send the query to that DC. */
export class UserMigrateError extends InvalidDCError {
    public newDc: number;

    constructor(args: ErrorArgs) {
        const newDc = Number(args.capture || 0);
        const message = "Your account is associated to DC " + newDc + ", please re-send the query to that DC." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.newDc = newDc;
    }
}

/** About string too long. */
export class AboutTooLongError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "About string too long." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ABOUT_TOO_LONG";
    }
}

/** Access token expired. */
export class AccessTokenExpiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Access token expired." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ACCESS_TOKEN_EXPIRED";
    }
}

/** Access token invalid. */
export class AccessTokenInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Access token invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ACCESS_TOKEN_INVALID";
    }
}

/** The ad has expired (too old or not found). */
export class AdExpiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The ad has expired (too old or not found)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "AD_EXPIRED";
    }
}

/** The specified geopoint address is invalid. */
export class AddressInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified geopoint address is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ADDRESS_INVALID";
    }
}

/** The specified admin ID is invalid. */
export class AdminIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified admin ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ADMIN_ID_INVALID";
    }
}

/** An admin rank cannot contain emojis. */
export class AdminRankEmojiNotAllowedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "An admin rank cannot contain emojis." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ADMIN_RANK_EMOJI_NOT_ALLOWED";
    }
}

/** The specified admin rank is invalid. */
export class AdminRankInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified admin rank is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ADMIN_RANK_INVALID";
    }
}

/** The chatAdminRights constructor passed in keyboardButtonRequestPeer.peer_type.user_admin_rights has no rights set (i.e. flags is 0). */
export class AdminRightsEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The chatAdminRights constructor passed in keyboardButtonRequestPeer.peer_type.user_admin_rights has no rights set (i.e. flags is 0)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ADMIN_RIGHTS_EMPTY";
    }
}

/** There are too many admins. */
export class AdminsTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "There are too many admins." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ADMINS_TOO_MUCH";
    }
}

/** You have uploaded too many profile photos, delete some before retrying. */
export class AlbumPhotosTooManyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You have uploaded too many profile photos, delete some before retrying." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ALBUM_PHOTOS_TOO_MANY";
    }
}

/** API ID invalid. */
export class ApiIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "API ID invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "API_ID_INVALID";
    }
}

/** This API id was published somewhere, you can't use it now. */
export class ApiIdPublishedFloodError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "This API id was published somewhere, you can't use it now." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "API_ID_PUBLISHED_FLOOD";
    }
}

/** The title of the article is empty. */
export class ArticleTitleEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The title of the article is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ARTICLE_TITLE_EMPTY";
    }
}

/** The remote URL specified in the content field is empty. */
export class AudioContentUrlEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The remote URL specified in the content field is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "AUDIO_CONTENT_URL_EMPTY";
    }
}

/** An empty audio title was provided. */
export class AudioTitleEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "An empty audio title was provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "AUDIO_TITLE_EMPTY";
    }
}

/** The provided authorization is invalid. */
export class AuthBytesInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided authorization is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "AUTH_BYTES_INVALID";
    }
}

/** The specified auth token was already accepted. */
export class AuthTokenAlreadyAcceptedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified auth token was already accepted." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "AUTH_TOKEN_ALREADY_ACCEPTED";
    }
}

/** An error occurred while importing the auth token. */
export class AuthTokenExceptionError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "An error occurred while importing the auth token." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "AUTH_TOKEN_EXCEPTION";
    }
}

/** The authorization token has expired. */
export class AuthTokenExpiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The authorization token has expired." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "AUTH_TOKEN_EXPIRED";
    }
}

/** The specified auth token is invalid. */
export class AuthTokenInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified auth token is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "AUTH_TOKEN_INVALID";
    }
}

/** The specified auth token is invalid. */
export class AuthTokenInvalidxError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified auth token is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "AUTH_TOKEN_INVALIDX";
    }
}

/** The autoarchive setting is not available at this time: please check the value of the [autoarchive_setting_available field in client config &raquo;](https://core.telegram.org/api/config#client-configuration) before calling this method. */
export class AutoarchiveNotAvailableError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The autoarchive setting is not available at this time: please check the value of the [autoarchive_setting_available field in client config &raquo;](https://core.telegram.org/api/config#client-configuration) before calling this method." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "AUTOARCHIVE_NOT_AVAILABLE";
    }
}

/** The transaction cannot be completed because the current [Telegram Stars balance](https://core.telegram.org/api/stars) is too low. */
export class BalanceTooLowError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The transaction cannot be completed because the current [Telegram Stars balance](https://core.telegram.org/api/stars) is too low." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BALANCE_TOO_LOW";
    }
}

/** The specified card number is invalid. */
export class BankCardNumberInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified card number is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BANK_CARD_NUMBER_INVALID";
    }
}

/** You provided some invalid flags in the banned rights. */
export class BannedRightsInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You provided some invalid flags in the banned rights." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BANNED_RIGHTS_INVALID";
    }
}

/** An invalid age was specified, must be between 0 and 150 years. */
export class BirthdayInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "An invalid age was specified, must be between 0 and 150 years." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BIRTHDAY_INVALID";
    }
}

/** You're already [boosting](https://core.telegram.org/api/boost) the specified channel. */
export class BoostNotModifiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You're already [boosting](https://core.telegram.org/api/boost) the specified channel." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOOST_NOT_MODIFIED";
    }
}

/** The specified `boost_peer` is invalid. */
export class BoostPeerInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified `boost_peer` is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOOST_PEER_INVALID";
    }
}

/** No boost slots were specified. */
export class BoostsEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "No boost slots were specified." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOOSTS_EMPTY";
    }
}

/** The specified channel must first be [boosted by its users](https://core.telegram.org/api/boost) in order to perform this action. */
export class BoostsRequiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified channel must first be [boosted by its users](https://core.telegram.org/api/boost) in order to perform this action." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOOSTS_REQUIRED";
    }
}

/** The connected business bot was already disabled for the specified peer. */
export class BotAlreadyDisabledError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The connected business bot was already disabled for the specified peer." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_ALREADY_DISABLED";
    }
}

/** The bot_id passed in the inputBotAppShortName constructor is invalid. */
export class BotAppBotInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The bot_id passed in the inputBotAppShortName constructor is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_APP_BOT_INVALID";
    }
}

/** The specified bot app is invalid. */
export class BotAppInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified bot app is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_APP_INVALID";
    }
}

/** The specified bot app short name is invalid. */
export class BotAppShortnameInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified bot app short name is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_APP_SHORTNAME_INVALID";
    }
}

/** The specified bot is not a business bot (the [user](https://core.telegram.org/constructor/user).`bot_business` flag is not set). */
export class BotBusinessMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified bot is not a business bot (the [user](https://core.telegram.org/constructor/user).`bot_business` flag is not set)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_BUSINESS_MISSING";
    }
}

/** Bots can't edit admin privileges. */
export class BotChannelsNaError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Bots can't edit admin privileges." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_CHANNELS_NA";
    }
}

/** The specified command description is invalid. */
export class BotCommandDescriptionInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified command description is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_COMMAND_DESCRIPTION_INVALID";
    }
}

/** The specified command is invalid. */
export class BotCommandInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified command is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_COMMAND_INVALID";
    }
}

/** Bot domain invalid. */
export class BotDomainInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Bot domain invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_DOMAIN_INVALID";
    }
}

/** The fallback flag can't be set for bots. */
export class BotFallbackUnsupportedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The fallback flag can't be set for bots." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_FALLBACK_UNSUPPORTED";
    }
}

/** Games can't be sent to channels. */
export class BotGamesDisabledError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Games can't be sent to channels." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_GAMES_DISABLED";
    }
}

/** This bot can't be added to groups. */
export class BotGroupsBlockedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "This bot can't be added to groups." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_GROUPS_BLOCKED";
    }
}

/** This bot can't be used in inline mode. */
export class BotInlineDisabledError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "This bot can't be used in inline mode." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_INLINE_DISABLED";
    }
}

/** This is not a valid bot. */
export class BotInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "This is not a valid bot." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_INVALID";
    }
}

/** The specified invoice is invalid. */
export class BotInvoiceInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified invoice is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_INVOICE_INVALID";
    }
}

/** No [business bot](https://core.telegram.org/api/business#connected-bots) is connected to the currently logged in user. */
export class BotNotConnectedYetError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "No [business bot](https://core.telegram.org/api/business#connected-bots) is connected to the currently logged in user." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_NOT_CONNECTED_YET";
    }
}

/** Bots can't pin messages in PM just for themselves. */
export class BotOnesideNotAvailError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Bots can't pin messages in PM just for themselves." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_ONESIDE_NOT_AVAIL";
    }
}

/** Please enable bot payments in botfather before calling this method. */
export class BotPaymentsDisabledError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Please enable bot payments in botfather before calling this method." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_PAYMENTS_DISABLED";
    }
}

/** A timeout occurred while fetching data from the bot. */
export class BotResponseTimeoutError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "A timeout occurred while fetching data from the bot." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_RESPONSE_TIMEOUT";
    }
}

/** The score wasn't modified. */
export class BotScoreNotModifiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The score wasn't modified." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_SCORE_NOT_MODIFIED";
    }
}

/** A webview cannot be opened in the specified conditions: emitted for example if `from_bot_menu` or `url` are set and `peer` is not the chat with the bot. */
export class BotWebviewDisabledError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "A webview cannot be opened in the specified conditions: emitted for example if `from_bot_menu` or `url` are set and `peer` is not the chat with the bot." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_WEBVIEW_DISABLED";
    }
}

/** There are too many bots in this chat/channel. */
export class BotsTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "There are too many bots in this chat/channel." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOTS_TOO_MUCH";
    }
}

/** Broadcast ID invalid. */
export class BroadcastIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Broadcast ID invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BROADCAST_ID_INVALID";
    }
}

/** You can't forward polls with public voters. */
export class BroadcastPublicVotersForbiddenError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can't forward polls with public voters." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BROADCAST_PUBLIC_VOTERS_FORBIDDEN";
    }
}

/** This method can only be called on a channel, please use stats.getMegagroupStats for supergroups. */
export class BroadcastRequiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "This method can only be called on a channel, please use stats.getMegagroupStats for supergroups." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BROADCAST_REQUIRED";
    }
}

/** The `connection_id` passed to the wrapping [invokeWithBusinessConnection](https://core.telegram.org/api/business) call is invalid. */
export class BusinessConnectionInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The `connection_id` passed to the wrapping [invokeWithBusinessConnection](https://core.telegram.org/api/business) call is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BUSINESS_CONNECTION_INVALID";
    }
}

/** This method was invoked over a business connection using [invokeWithBusinessConnection](https://core.telegram.org/api/business#connected-bots), but either (1) we're a user, and users cannot invoke methods over a business connection; (2) we're a bot, but business mode was disabled in @botfather or (3); we're a bot, but this method cannot be invoked over a business connection. */
export class BusinessConnectionNotAllowedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "This method was invoked over a business connection using [invokeWithBusinessConnection](https://core.telegram.org/api/business#connected-bots), but either (1) we're a user, and users cannot invoke methods over a business connection; (2) we're a bot, but business mode was disabled in @botfather or (3); we're a bot, but this method cannot be invoked over a business connection." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BUSINESS_CONNECTION_NOT_ALLOWED";
    }
}

/** Messages can't be set to the specified peer through the current [business connection](https://core.telegram.org/api/business#connected-bots). */
export class BusinessPeerInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Messages can't be set to the specified peer through the current [business connection](https://core.telegram.org/api/business#connected-bots)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BUSINESS_PEER_INVALID";
    }
}

/** You cannot send a message to a user through a [business connection](https://core.telegram.org/api/business#connected-bots) if the user hasn't recently contacted us. */
export class BusinessPeerUsageMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You cannot send a message to a user through a [business connection](https://core.telegram.org/api/business#connected-bots) if the user hasn't recently contacted us." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BUSINESS_PEER_USAGE_MISSING";
    }
}

/** You didn't set any flag in inputBusinessBotRecipients, thus the bot cannot work with *any* peer. */
export class BusinessRecipientsEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You didn't set any flag in inputBusinessBotRecipients, thus the bot cannot work with *any* peer." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BUSINESS_RECIPIENTS_EMPTY";
    }
}

/** No work hours were specified. */
export class BusinessWorkHoursEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "No work hours were specified." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BUSINESS_WORK_HOURS_EMPTY";
    }
}

/** The specified work hours are invalid, see [here &raquo;](https://core.telegram.org/api/business#opening-hours) for the exact requirements. */
export class BusinessWorkHoursPeriodInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified work hours are invalid, see [here &raquo;](https://core.telegram.org/api/business#opening-hours) for the exact requirements." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BUSINESS_WORK_HOURS_PERIOD_INVALID";
    }
}

/** The specified [keyboardButtonCopy](https://core.telegram.org/constructor/keyboardButtonCopy).`copy_text` is invalid. */
export class ButtonCopyTextInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified [keyboardButtonCopy](https://core.telegram.org/constructor/keyboardButtonCopy).`copy_text` is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BUTTON_COPY_TEXT_INVALID";
    }
}

/** The data of one or more of the buttons you provided is invalid. */
export class ButtonDataInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The data of one or more of the buttons you provided is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BUTTON_DATA_INVALID";
    }
}

/** The specified button ID is invalid. */
export class ButtonIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified button ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BUTTON_ID_INVALID";
    }
}

/** The specified button is invalid. */
export class ButtonInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified button is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BUTTON_INVALID";
    }
}

/** The position of one of the keyboard buttons is invalid (i.e. a Game or Pay button not in the first position, and so on...). */
export class ButtonPosInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The position of one of the keyboard buttons is invalid (i.e. a Game or Pay button not in the first position, and so on...)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BUTTON_POS_INVALID";
    }
}

/** The specified button text is invalid. */
export class ButtonTextInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified button text is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BUTTON_TEXT_INVALID";
    }
}

/** The type of one or more of the buttons you provided is invalid. */
export class ButtonTypeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The type of one or more of the buttons you provided is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BUTTON_TYPE_INVALID";
    }
}

/** Button URL invalid. */
export class ButtonUrlInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Button URL invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BUTTON_URL_INVALID";
    }
}

/** The `user_id` passed to inputKeyboardButtonUserProfile is invalid! */
export class ButtonUserInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The `user_id` passed to inputKeyboardButtonUserProfile is invalid!" + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BUTTON_USER_INVALID";
    }
}

/** The privacy setting of the user specified in a [inputKeyboardButtonUserProfile](https://core.telegram.org/constructor/inputKeyboardButtonUserProfile) button do not allow creating such a button. */
export class ButtonUserPrivacyRestrictedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The privacy setting of the user specified in a [inputKeyboardButtonUserProfile](https://core.telegram.org/constructor/inputKeyboardButtonUserProfile) button do not allow creating such a button." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BUTTON_USER_PRIVACY_RESTRICTED";
    }
}

/** The call was already accepted. */
export class CallAlreadyAcceptedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The call was already accepted." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CALL_ALREADY_ACCEPTED";
    }
}

/** The call was already declined. */
export class CallAlreadyDeclinedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The call was already declined." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CALL_ALREADY_DECLINED";
    }
}

/** The call failed because the user is already making another call. */
export class CallOccupyFailedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The call failed because the user is already making another call." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CALL_OCCUPY_FAILED";
    }
}

/** The provided call peer object is invalid. */
export class CallPeerInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided call peer object is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CALL_PEER_INVALID";
    }
}

/** Call protocol flags invalid. */
export class CallProtocolFlagsInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Call protocol flags invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CALL_PROTOCOL_FLAGS_INVALID";
    }
}

/** The specified protocol layer version range is invalid. */
export class CallProtocolLayerInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified protocol layer version range is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CALL_PROTOCOL_LAYER_INVALID";
    }
}

/** You can't call this method in a CDN DC. */
export class CdnMethodInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can't call this method in a CDN DC." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CDN_METHOD_INVALID";
    }
}

/** This supergroup is not a forum. */
export class ChannelForumMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "This supergroup is not a forum." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHANNEL_FORUM_MISSING";
    }
}

/** The specified supergroup ID is invalid. */
export class ChannelIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified supergroup ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHANNEL_ID_INVALID";
    }
}

/** The provided channel is invalid. */
export class ChannelInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided channel is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHANNEL_INVALID";
    }
}

/** [Monoforums](https://core.telegram.org/api/channel#monoforums) do not support this feature. */
export class ChannelMonoforumUnsupportedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "[Monoforums](https://core.telegram.org/api/channel#monoforums) do not support this feature." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHANNEL_MONOFORUM_UNSUPPORTED";
    }
}

/** The current user is not in the channel. */
export class ChannelParicipantMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The current user is not in the channel." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHANNEL_PARICIPANT_MISSING";
    }
}

/** You haven't joined this channel/supergroup. */
export class ChannelPrivateError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You haven't joined this channel/supergroup." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHANNEL_PRIVATE";
    }
}

/** This channel has too many participants (>1000) to be deleted. */
export class ChannelTooBigError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "This channel has too many participants (>1000) to be deleted." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHANNEL_TOO_BIG";
    }
}

/** Channel is too large to be deleted; this error is issued when trying to delete channels with more than 1000 members (subject to change). */
export class ChannelTooLargeError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Channel is too large to be deleted; this error is issued when trying to delete channels with more than 1000 members (subject to change)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHANNEL_TOO_LARGE";
    }
}

/** The user has reached the limit of public geogroups. */
export class ChannelsAdminLocatedTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The user has reached the limit of public geogroups." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHANNELS_ADMIN_LOCATED_TOO_MUCH";
    }
}

/** You're admin of too many public channels, make some channels private to change the username of this channel. */
export class ChannelsAdminPublicTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You're admin of too many public channels, make some channels private to change the username of this channel." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHANNELS_ADMIN_PUBLIC_TOO_MUCH";
    }
}

/** You have joined too many channels/supergroups. */
export class ChannelsTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You have joined too many channels/supergroups." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHANNELS_TOO_MUCH";
    }
}

/** The transaction was already refunded. */
export class ChargeAlreadyRefundedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The transaction was already refunded." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHARGE_ALREADY_REFUNDED";
    }
}

/** The specified charge_id is empty. */
export class ChargeIdEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified charge_id is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHARGE_ID_EMPTY";
    }
}

/** The specified charge_id is invalid. */
export class ChargeIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified charge_id is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHARGE_ID_INVALID";
    }
}

/** About text has not changed. */
export class ChatAboutNotModifiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "About text has not changed." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_ABOUT_NOT_MODIFIED";
    }
}

/** Chat about too long. */
export class ChatAboutTooLongError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Chat about too long." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_ABOUT_TOO_LONG";
    }
}

/** You must be an admin in this chat to do this. */
export class ChatAdminRequiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You must be an admin in this chat to do this." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_ADMIN_REQUIRED";
    }
}

/** You can't enable forum topics in a discussion group linked to a channel. */
export class ChatDiscussionUnallowedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can't enable forum topics in a discussion group linked to a channel." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_DISCUSSION_UNALLOWED";
    }
}

/** You can't forward messages from a protected chat. */
export class ChatForwardsRestrictedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can't forward messages from a protected chat." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_FORWARDS_RESTRICTED";
    }
}

/** The provided chat ID is empty. */
export class ChatIdEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided chat ID is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_ID_EMPTY";
    }
}

/** The provided chat id is invalid. */
export class ChatIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided chat id is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_ID_INVALID";
    }
}

/** Invalid chat. */
export class ChatInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid chat." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_INVALID";
    }
}

/** You can't set an expiration date on permanent invite links. */
export class ChatInvitePermanentError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can't set an expiration date on permanent invite links." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_INVITE_PERMANENT";
    }
}

/** The chat is public, you can't hide the history to new users. */
export class ChatLinkExistsError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The chat is public, you can't hide the history to new users." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_LINK_EXISTS";
    }
}

/** Could not add participants. */
export class ChatMemberAddFailedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Could not add participants." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_MEMBER_ADD_FAILED";
    }
}

/** No changes were made to chat information because the new information you passed is identical to the current information. */
export class ChatNotModifiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "No changes were made to chat information because the new information you passed is identical to the current information." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_NOT_MODIFIED";
    }
}

/** You can only enable join requests in public groups. */
export class ChatPublicRequiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can only enable join requests in public groups." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_PUBLIC_REQUIRED";
    }
}

/** You can't send messages in this chat, you were restricted. */
export class ChatRestrictedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can't send messages in this chat, you were restricted." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_RESTRICTED";
    }
}

/** `min_date` and `max_date` are not available for using with non-user peers. */
export class ChatRevokeDateUnsupportedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "`min_date` and `max_date` are not available for using with non-user peers." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_REVOKE_DATE_UNSUPPORTED";
    }
}

/** You can't send inline messages in this group. */
export class ChatSendInlineForbiddenError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can't send inline messages in this group." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_SEND_INLINE_FORBIDDEN";
    }
}

/** No chat title provided. */
export class ChatTitleEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "No chat title provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_TITLE_EMPTY";
    }
}

/** This method is not available for groups with more than `chat_read_mark_size_threshold` members, [see client configuration &raquo;](https://core.telegram.org/api/config#client-configuration). */
export class ChatTooBigError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "This method is not available for groups with more than `chat_read_mark_size_threshold` members, [see client configuration &raquo;](https://core.telegram.org/api/config#client-configuration)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_TOO_BIG";
    }
}

/** The specified slug is empty. */
export class ChatlinkSlugEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified slug is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHATLINK_SLUG_EMPTY";
    }
}

/** The specified [business chat link](https://core.telegram.org/api/business#business-chat-links) has expired. */
export class ChatlinkSlugExpiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified [business chat link](https://core.telegram.org/api/business#business-chat-links) has expired." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHATLINK_SLUG_EXPIRED";
    }
}

/** Too many [business chat links](https://core.telegram.org/api/business#business-chat-links) were created, please delete some older links. */
export class ChatlinksTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Too many [business chat links](https://core.telegram.org/api/business#business-chat-links) were created, please delete some older links." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHATLINKS_TOO_MUCH";
    }
}

/** The specified `exclude_peers` are invalid. */
export class ChatlistExcludeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified `exclude_peers` are invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHATLIST_EXCLUDE_INVALID";
    }
}

/** You have created too many folder links, hitting the `chatlist_invites_limit_default`/`chatlist_invites_limit_premium` [limits &raquo;](https://core.telegram.org/api/config#chatlist-invites-limit-default). */
export class ChatlistsTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You have created too many folder links, hitting the `chatlist_invites_limit_default`/`chatlist_invites_limit_premium` [limits &raquo;](https://core.telegram.org/api/config#chatlist-invites-limit-default)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHATLISTS_TOO_MUCH";
    }
}

/** The provided code is empty. */
export class CodeEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided code is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CODE_EMPTY";
    }
}

/** Code hash invalid. */
export class CodeHashInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Code hash invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CODE_HASH_INVALID";
    }
}

/** Code invalid. */
export class CodeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Code invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CODE_INVALID";
    }
}

/** The specified collectible is invalid. */
export class CollectibleInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified collectible is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "COLLECTIBLE_INVALID";
    }
}

/** The specified collectible could not be found. */
export class CollectibleNotFoundError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified collectible could not be found." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "COLLECTIBLE_NOT_FOUND";
    }
}

/** The specified color palette ID was invalid. */
export class ColorInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified color palette ID was invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "COLOR_INVALID";
    }
}

/** The provided API id is invalid. */
export class ConnectionApiIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided API id is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CONNECTION_API_ID_INVALID";
    }
}

/** App version is empty. */
export class ConnectionAppVersionEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "App version is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CONNECTION_APP_VERSION_EMPTY";
    }
}

/** The specified connection ID is invalid. */
export class ConnectionIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified connection ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CONNECTION_ID_INVALID";
    }
}

/** Layer invalid. */
export class ConnectionLayerInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Layer invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CONNECTION_LAYER_INVALID";
    }
}

/** Contact to add is missing. */
export class ContactAddMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Contact to add is missing." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CONTACT_ADD_MISSING";
    }
}

/** The provided contact ID is invalid. */
export class ContactIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided contact ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CONTACT_ID_INVALID";
    }
}

/** The specified user is not a contact. */
export class ContactMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified user is not a contact." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CONTACT_MISSING";
    }
}

/** Contact name empty. */
export class ContactNameEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Contact name empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CONTACT_NAME_EMPTY";
    }
}

/** Missing contact request. */
export class ContactReqMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Missing contact request." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CONTACT_REQ_MISSING";
    }
}

/** An error occurred while creating the call. */
export class CreateCallFailedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "An error occurred while creating the call." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CREATE_CALL_FAILED";
    }
}

/** The total amount of all prices is invalid. */
export class CurrencyTotalAmountInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The total amount of all prices is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CURRENCY_TOTAL_AMOUNT_INVALID";
    }
}

/** Too many custom reactions were specified. */
export class CustomReactionsTooManyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Too many custom reactions were specified." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CUSTOM_REACTIONS_TOO_MANY";
    }
}

/** The size of the specified secureValueErrorData.data_hash is invalid. */
export class DataHashSizeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The size of the specified secureValueErrorData.data_hash is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "DATA_HASH_SIZE_INVALID";
    }
}

/** Encrypted data invalid. */
export class DataInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Encrypted data invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "DATA_INVALID";
    }
}

/** The provided JSON data is invalid. */
export class DataJsonInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided JSON data is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "DATA_JSON_INVALID";
    }
}

/** Data too long. */
export class DataTooLongError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Data too long." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "DATA_TOO_LONG";
    }
}

/** Date empty. */
export class DateEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Date empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "DATE_EMPTY";
    }
}

/** The provided DC ID is invalid. */
export class DcIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided DC ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "DC_ID_INVALID";
    }
}

/** g_a invalid. */
export class DhGAInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "g_a invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "DH_G_A_INVALID";
    }
}

/** The specified document is invalid. */
export class DocumentInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified document is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "DOCUMENT_INVALID";
    }
}

/** The specified effect ID is invalid. */
export class EffectIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified effect ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EFFECT_ID_INVALID";
    }
}

/** Email hash expired. */
export class EmailHashExpiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Email hash expired." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EMAIL_HASH_EXPIRED";
    }
}

/** The specified email is invalid. */
export class EmailInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified email is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EMAIL_INVALID";
    }
}

/** The specified email cannot be used to complete the operation. */
export class EmailNotAllowedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified email cannot be used to complete the operation." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EMAIL_NOT_ALLOWED";
    }
}

/** In order to change the login email with emailVerifyPurposeLoginChange, an existing login email must already be set using emailVerifyPurposeLoginSetup. */
export class EmailNotSetupError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "In order to change the login email with emailVerifyPurposeLoginChange, an existing login email must already be set using emailVerifyPurposeLoginSetup." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EMAIL_NOT_SETUP";
    }
}

/** The provided email isn't confirmed, %d is the length of the verification code that was just sent to the email: use [account.verifyEmail](https://core.telegram.org/method/account.verifyEmail) to enter the received verification code and enable the recovery email. */
export class EmailUnconfirmedError extends BadRequestError {
    public codeLength: number;

    constructor(args: ErrorArgs) {
        const codeLength = Number(args.capture || 0);
        const message = "The provided email isn't confirmed, " + codeLength + " is the length of the verification code that was just sent to the email: use [account.verifyEmail](https://core.telegram.org/method/account.verifyEmail) to enter the received verification code and enable the recovery email." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.codeLength = codeLength;
    }
}

/** The verification email has expired. */
export class EmailVerifyExpiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The verification email has expired." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EMAIL_VERIFY_EXPIRED";
    }
}

/** The specified theme emoji is valid. */
export class EmojiInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified theme emoji is valid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EMOJI_INVALID";
    }
}

/** The specified `video_emoji_markup` was invalid. */
export class EmojiMarkupInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified `video_emoji_markup` was invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EMOJI_MARKUP_INVALID";
    }
}

/** The theme wasn't changed. */
export class EmojiNotModifiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The theme wasn't changed." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EMOJI_NOT_MODIFIED";
    }
}

/** The emoji is empty. */
export class EmoticonEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The emoji is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EMOTICON_EMPTY";
    }
}

/** The specified emoji is invalid. */
export class EmoticonInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified emoji is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EMOTICON_INVALID";
    }
}

/** inputStickerSetDice.emoji cannot be empty. */
export class EmoticonStickerpackMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "inputStickerSetDice.emoji cannot be empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EMOTICON_STICKERPACK_MISSING";
    }
}

/** Encrypted message invalid. */
export class EncryptedMessageInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Encrypted message invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ENCRYPTED_MESSAGE_INVALID";
    }
}

/** Secret chat already accepted. */
export class EncryptionAlreadyAcceptedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Secret chat already accepted." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ENCRYPTION_ALREADY_ACCEPTED";
    }
}

/** The secret chat was already declined. */
export class EncryptionAlreadyDeclinedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The secret chat was already declined." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ENCRYPTION_ALREADY_DECLINED";
    }
}

/** The secret chat was declined. */
export class EncryptionDeclinedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The secret chat was declined." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ENCRYPTION_DECLINED";
    }
}

/** The provided secret chat ID is invalid. */
export class EncryptionIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided secret chat ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ENCRYPTION_ID_INVALID";
    }
}

/** You provided too many styled message entities. */
export class EntitiesTooLongError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You provided too many styled message entities." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ENTITIES_TOO_LONG";
    }
}

/** A specified [entity offset or length](https://core.telegram.org/api/entities#entity-length) is invalid, see [here &raquo;](https://core.telegram.org/api/entities#entity-length) for info on how to properly compute the entity offset/length. */
export class EntityBoundsInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "A specified [entity offset or length](https://core.telegram.org/api/entities#entity-length) is invalid, see [here &raquo;](https://core.telegram.org/api/entities#entity-length) for info on how to properly compute the entity offset/length." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ENTITY_BOUNDS_INVALID";
    }
}

/** You mentioned an invalid user. */
export class EntityMentionUserInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You mentioned an invalid user." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ENTITY_MENTION_USER_INVALID";
    }
}

/** The provided error message is empty. */
export class ErrorTextEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided error message is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ERROR_TEXT_EMPTY";
    }
}

/** The specified expiration date is invalid. */
export class ExpireDateInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified expiration date is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EXPIRE_DATE_INVALID";
    }
}

/** The specified `expires_at` timestamp is invalid. */
export class ExpiresAtInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified `expires_at` timestamp is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EXPIRES_AT_INVALID";
    }
}

/** Provided card is invalid. */
export class ExportCardInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Provided card is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EXPORT_CARD_INVALID";
    }
}

/** The specified `stars_amount` of the passed [inputMediaPaidMedia](https://core.telegram.org/constructor/inputMediaPaidMedia) is invalid. */
export class ExtendedMediaAmountInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified `stars_amount` of the passed [inputMediaPaidMedia](https://core.telegram.org/constructor/inputMediaPaidMedia) is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EXTENDED_MEDIA_AMOUNT_INVALID";
    }
}

/** The specified paid media is invalid. */
export class ExtendedMediaInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified paid media is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EXTENDED_MEDIA_INVALID";
    }
}

/** External URL invalid. */
export class ExternalUrlInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "External URL invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EXTERNAL_URL_INVALID";
    }
}

/** File content-type is invalid. */
export class FileContentTypeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "File content-type is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILE_CONTENT_TYPE_INVALID";
    }
}

/** An empty file was provided. */
export class FileEmtpyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "An empty file was provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILE_EMTPY";
    }
}

/** The provided file id is invalid. */
export class FileIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided file id is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILE_ID_INVALID";
    }
}

/** The provided file part is empty. */
export class FilePartEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided file part is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILE_PART_EMPTY";
    }
}

/** The file part number is invalid. */
export class FilePartInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The file part number is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILE_PART_INVALID";
    }
}

/** The length of a file part is invalid. */
export class FilePartLengthInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The length of a file part is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILE_PART_LENGTH_INVALID";
    }
}

/** Provided file part size has changed. */
export class FilePartSizeChangedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Provided file part size has changed." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILE_PART_SIZE_CHANGED";
    }
}

/** The provided file part size is invalid. */
export class FilePartSizeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided file part size is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILE_PART_SIZE_INVALID";
    }
}

/** The uploaded file part is too big. */
export class FilePartTooBigError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The uploaded file part is too big." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILE_PART_TOO_BIG";
    }
}

/** The size of the uploaded file part is too small, please see the documentation for the allowed sizes. */
export class FilePartTooSmallError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The size of the uploaded file part is too small, please see the documentation for the allowed sizes." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILE_PART_TOO_SMALL";
    }
}

/** The number of file parts is invalid. */
export class FilePartsInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The number of file parts is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILE_PARTS_INVALID";
    }
}

/** The file reference of the media file at index %d in the passed media array expired, it [must be refreshed as specified in the documentation](https://core.telegram.org/api/file-references). . */
export class FileReferenceExpiredError extends BadRequestError {
    public value: number;

    constructor(args: ErrorArgs) {
        const value = Number(args.capture || 0);
        const message = "The file reference of the media file at index " + value + " in the passed media array expired, it [must be refreshed as specified in the documentation](https://core.telegram.org/api/file-references). ." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.value = value;
    }
}

/** The [file reference](https://core.telegram.org/api/file-references) of the media file at index %d in the passed media array is invalid. */
export class FileReferenceInvalidError extends BadRequestError {
    public value: number;

    constructor(args: ErrorArgs) {
        const value = Number(args.capture || 0);
        const message = "The [file reference](https://core.telegram.org/api/file-references) of the media file at index " + value + " in the passed media array is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.value = value;
    }
}

/** An empty [file reference](https://core.telegram.org/api/file-references) was specified. */
export class FileReferenceEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "An empty [file reference](https://core.telegram.org/api/file-references) was specified." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILE_REFERENCE_EMPTY";
    }
}

/** An empty file title was specified. */
export class FileTitleEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "An empty file title was specified." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILE_TITLE_EMPTY";
    }
}

/** The master DC did not accept the `file_token` (e.g., the token has expired). Continue downloading the file from the master DC using upload.getFile. */
export class FileTokenInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The master DC did not accept the `file_token` (e.g., the token has expired). Continue downloading the file from the master DC using upload.getFile." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILE_TOKEN_INVALID";
    }
}

/** The specified filter ID is invalid. */
export class FilterIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified filter ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILTER_ID_INVALID";
    }
}

/** The include_peers vector of the filter is empty. */
export class FilterIncludeEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The include_peers vector of the filter is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILTER_INCLUDE_EMPTY";
    }
}

/** The specified filter cannot be used in this context. */
export class FilterNotSupportedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified filter cannot be used in this context." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILTER_NOT_SUPPORTED";
    }
}

/** The title field of the filter is empty. */
export class FilterTitleEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The title field of the filter is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILTER_TITLE_EMPTY";
    }
}

/** The first name is invalid. */
export class FirstnameInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The first name is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FIRSTNAME_INVALID";
    }
}

/** An empty folder ID was specified. */
export class FolderIdEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "An empty folder ID was specified." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FOLDER_ID_EMPTY";
    }
}

/** Invalid folder ID. */
export class FolderIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid folder ID." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FOLDER_ID_INVALID";
    }
}

/** The form was generated more than 10 minutes ago and has expired, please re-generate it using [payments.getPaymentForm](https://core.telegram.org/method/payments.getPaymentForm) and pass the new `form_id`. */
export class FormExpiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The form was generated more than 10 minutes ago and has expired, please re-generate it using [payments.getPaymentForm](https://core.telegram.org/method/payments.getPaymentForm) and pass the new `form_id`." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FORM_EXPIRED";
    }
}

/** The specified form ID is empty. */
export class FormIdEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified form ID is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FORM_ID_EMPTY";
    }
}

/** The same payment form was already submitted.  . */
export class FormSubmitDuplicateError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The same payment form was already submitted.  ." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FORM_SUBMIT_DUPLICATE";
    }
}

/** Please update your client. */
export class FormUnsupportedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Please update your client." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FORM_UNSUPPORTED";
    }
}

/** You can't execute the specified action because the group is a [forum](https://core.telegram.org/api/forum), disable forum functionality to continue. */
export class ForumEnabledError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can't execute the specified action because the group is a [forum](https://core.telegram.org/api/forum), disable forum functionality to continue." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FORUM_ENABLED";
    }
}

/** You were just elected admin, you can't add or modify other admins yet. */
export class FreshChangeAdminsForbiddenError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You were just elected admin, you can't add or modify other admins yet." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FRESH_CHANGE_ADMINS_FORBIDDEN";
    }
}

/** Bots can't use fromMessage min constructors. */
export class FromMessageBotDisabledError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Bots can't use fromMessage min constructors." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FROM_MESSAGE_BOT_DISABLED";
    }
}

/** The specified from_id is invalid. */
export class FromPeerInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified from_id is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FROM_PEER_INVALID";
    }
}

/** The current account is [frozen](https://core.telegram.org/api/auth#frozen-accounts), and cannot access the specified peer. */
export class FrozenParticipantError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The current account is [frozen](https://core.telegram.org/api/auth#frozen-accounts), and cannot access the specified peer." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FROZEN_PARTICIPANT_MISSING";
    }
}

/** Bots can't send another bot's game. */
export class GameBotInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Bots can't send another bot's game." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GAME_BOT_INVALID";
    }
}

/** You can't modify the icon of the "General" topic. */
export class GeneralModifyIconForbiddenError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can't modify the icon of the \"General\" topic." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GENERAL_MODIFY_ICON_FORBIDDEN";
    }
}

/** Invalid geoposition provided. */
export class GeoPointInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid geoposition provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GEO_POINT_INVALID";
    }
}

/** GIF content-type invalid. */
export class GifContentTypeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "GIF content-type invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GIF_CONTENT_TYPE_INVALID";
    }
}

/** The provided GIF ID is invalid. */
export class GifIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided GIF ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GIF_ID_INVALID";
    }
}

/** The value passed in invoice.inputInvoicePremiumGiftStars.months is invalid. */
export class GiftMonthsInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The value passed in invoice.inputInvoicePremiumGiftStars.months is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GIFT_MONTHS_INVALID";
    }
}

/** The specified gift slug has expired. */
export class GiftSlugExpiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified gift slug has expired." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GIFT_SLUG_EXPIRED";
    }
}

/** The specified slug is invalid. */
export class GiftSlugInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified slug is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GIFT_SLUG_INVALID";
    }
}

/** The specified amount of stars is invalid. */
export class GiftStarsInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified amount of stars is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GIFT_STARS_INVALID";
    }
}

/** This graph has expired, please obtain a new graph token. */
export class GraphExpiredReloadError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "This graph has expired, please obtain a new graph token." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GRAPH_EXPIRED_RELOAD";
    }
}

/** Invalid graph token provided, please reload the stats and provide the updated token. */
export class GraphInvalidReloadError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid graph token provided, please reload the stats and provide the updated token." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GRAPH_INVALID_RELOAD";
    }
}

/** The graph is outdated, please get a new async token using stats.getBroadcastStats. */
export class GraphOutdatedReloadError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The graph is outdated, please get a new async token using stats.getBroadcastStats." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GRAPH_OUTDATED_RELOAD";
    }
}

/** The group call was already discarded. */
export class GroupcallAlreadyDiscardedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The group call was already discarded." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GROUPCALL_ALREADY_DISCARDED";
    }
}

/** The group call has already ended. */
export class GroupcallForbiddenError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The group call has already ended." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GROUPCALL_FORBIDDEN";
    }
}

/** The specified group call is invalid. */
export class GroupcallInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified group call is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GROUPCALL_INVALID";
    }
}

/** You haven't joined this group call. */
export class GroupcallJoinMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You haven't joined this group call." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GROUPCALL_JOIN_MISSING";
    }
}

/** Group call settings weren't modified. */
export class GroupcallNotModifiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Group call settings weren't modified." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GROUPCALL_NOT_MODIFIED";
    }
}

/** The app needs to retry joining the group call with a new SSRC value. */
export class GroupcallSsrcDuplicateMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The app needs to retry joining the group call with a new SSRC value." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GROUPCALL_SSRC_DUPLICATE_MUCH";
    }
}

/** Invalid grouped media. */
export class GroupedMediaInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid grouped media." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GROUPED_MEDIA_INVALID";
    }
}

/** The provided hash is invalid. */
export class HashInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided hash is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "HASH_INVALID";
    }
}

/** The size of the specified secureValueError.hash is invalid. */
export class HashSizeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The size of the specified secureValueError.hash is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "HASH_SIZE_INVALID";
    }
}

/** The specified hashtag is invalid. */
export class HashtagInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified hashtag is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "HASHTAG_INVALID";
    }
}

/** The join request was missing or was already handled. */
export class HideRequesterMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The join request was missing or was already handled." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "HIDE_REQUESTER_MISSING";
    }
}

/** The passed prepared inline message ID has expired. */
export class IdExpiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The passed prepared inline message ID has expired." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ID_EXPIRED";
    }
}

/** The passed ID is invalid. */
export class IdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The passed ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ID_INVALID";
    }
}

/** Failure while processing image. */
export class ImageProcessFailedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Failure while processing image." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "IMAGE_PROCESS_FAILED";
    }
}

/** The specified chat export file is invalid. */
export class ImportFileInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified chat export file is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "IMPORT_FILE_INVALID";
    }
}

/** The date specified in the import file is invalid. */
export class ImportFormatDateInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The date specified in the import file is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "IMPORT_FORMAT_DATE_INVALID";
    }
}

/** The specified chat export file was exported from an unsupported chat app. */
export class ImportFormatUnrecognizedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified chat export file was exported from an unsupported chat app." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "IMPORT_FORMAT_UNRECOGNIZED";
    }
}

/** The specified import ID is invalid. */
export class ImportIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified import ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "IMPORT_ID_INVALID";
    }
}

/** The specified token is invalid. */
export class ImportTokenInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified token is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "IMPORT_TOKEN_INVALID";
    }
}

/** The inline query expired. */
export class InlineResultExpiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The inline query expired." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INLINE_RESULT_EXPIRED";
    }
}

/** The specified folder is invalid. */
export class InputChatlistInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified folder is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INPUT_CHATLIST_INVALID";
    }
}

/** The specified [InputFile](https://core.telegram.org/type/InputFile) is invalid. */
export class InputFileInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified [InputFile](https://core.telegram.org/type/InputFile) is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INPUT_FILE_INVALID";
    }
}

/** The specified filter is invalid. */
export class InputFilterInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified filter is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INPUT_FILTER_INVALID";
    }
}

/** The specified peer array is empty. */
export class InputPeersEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified peer array is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INPUT_PEERS_EMPTY";
    }
}

/** The specified payment purpose is invalid. */
export class InputPurposeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified payment purpose is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INPUT_PURPOSE_INVALID";
    }
}

/** The specified text is empty. */
export class InputTextEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified text is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INPUT_TEXT_EMPTY";
    }
}

/** The specified text is too long. */
export class InputTextTooLongError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified text is too long." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INPUT_TEXT_TOO_LONG";
    }
}

/** The specified user was deleted. */
export class InputUserDeactivatedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified user was deleted." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INPUT_USER_DEACTIVATED";
    }
}

/** If the user has anonymously joined a group call as a channel, they can't invite other users to the group call because that would cause deanonymization, because the invite would be sent using the original user ID, not the anonymized channel ID. */
export class InviteForbiddenWithJoinasError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "If the user has anonymously joined a group call as a channel, they can't invite other users to the group call because that would cause deanonymization, because the invite would be sent using the original user ID, not the anonymized channel ID." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INVITE_FORBIDDEN_WITH_JOINAS";
    }
}

/** The invite hash is empty. */
export class InviteHashEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The invite hash is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INVITE_HASH_EMPTY";
    }
}

/** The invite link has expired. */
export class InviteHashExpiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The invite link has expired." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INVITE_HASH_EXPIRED";
    }
}

/** The invite hash is invalid. */
export class InviteHashInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The invite hash is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INVITE_HASH_INVALID";
    }
}

/** You have successfully requested to join this chat or channel. */
export class InviteRequestSentError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You have successfully requested to join this chat or channel." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INVITE_REQUEST_SENT";
    }
}

/** The specified invite link was already revoked or is invalid. */
export class InviteRevokedMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified invite link was already revoked or is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INVITE_REVOKED_MISSING";
    }
}

/** The specified invite slug is empty. */
export class InviteSlugEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified invite slug is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INVITE_SLUG_EMPTY";
    }
}

/** The specified chat folder link has expired. */
export class InviteSlugExpiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified chat folder link has expired." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INVITE_SLUG_EXPIRED";
    }
}

/** The specified invitation slug is invalid. */
export class InviteSlugInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified invitation slug is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INVITE_SLUG_INVALID";
    }
}

/** The maximum number of per-folder invites specified by the `chatlist_invites_limit_default`/`chatlist_invites_limit_premium` [client configuration parameters &raquo;](https://core.telegram.org/api/config#chatlist-invites-limit-default) was reached. */
export class InvitesTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The maximum number of per-folder invites specified by the `chatlist_invites_limit_default`/`chatlist_invites_limit_premium` [client configuration parameters &raquo;](https://core.telegram.org/api/config#chatlist-invites-limit-default) was reached." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INVITES_TOO_MUCH";
    }
}

/** The specified invoice is invalid. */
export class InvoiceInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified invoice is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INVOICE_INVALID";
    }
}

/** The specified invoice payload is invalid. */
export class InvoicePayloadInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified invoice payload is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INVOICE_PAYLOAD_INVALID";
    }
}

/** The specified peer cannot be used to join a group call. */
export class JoinAsPeerInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified peer cannot be used to join a group call." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "JOIN_AS_PEER_INVALID";
    }
}

/** The specified language code is invalid. */
export class LangCodeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified language code is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "LANG_CODE_INVALID";
    }
}

/** The specified language code is not supported. */
export class LangCodeNotSupportedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified language code is not supported." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "LANG_CODE_NOT_SUPPORTED";
    }
}

/** The provided language pack is invalid. */
export class LangPackInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided language pack is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "LANG_PACK_INVALID";
    }
}

/** The specified lang_code is invalid. */
export class LanguageInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified lang_code is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "LANGUAGE_INVALID";
    }
}

/** The last name is invalid. */
export class LastnameInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The last name is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "LASTNAME_INVALID";
    }
}

/** The provided limit is invalid. */
export class LimitInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided limit is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "LIMIT_INVALID";
    }
}

/** Discussion link not modified. */
export class LinkNotModifiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Discussion link not modified." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "LINK_NOT_MODIFIED";
    }
}

/** The provided location is invalid. */
export class LocationInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided location is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "LOCATION_INVALID";
    }
}

/** The specified maximum date is invalid. */
export class MaxDateInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified maximum date is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MAX_DATE_INVALID";
    }
}

/** The provided max ID is invalid. */
export class MaxIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided max ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MAX_ID_INVALID";
    }
}

/** The specified max_qts is invalid. */
export class MaxQtsInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified max_qts is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MAX_QTS_INVALID";
    }
}

/** The MD5 checksums do not match. */
export class Md5ChecksumInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The MD5 checksums do not match." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MD5_CHECKSUM_INVALID";
    }
}

/** You already paid for the specified media. */
export class MediaAlreadyPaidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You already paid for the specified media." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MEDIA_ALREADY_PAID";
    }
}

/** The caption is too long. */
export class MediaCaptionTooLongError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The caption is too long." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MEDIA_CAPTION_TOO_LONG";
    }
}

/** The provided media object is invalid. */
export class MediaEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided media object is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MEDIA_EMPTY";
    }
}

/** The specified media file is invalid. */
export class MediaFileInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified media file is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MEDIA_FILE_INVALID";
    }
}

/** You tried to send media of different types in an album. */
export class MediaGroupedInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You tried to send media of different types in an album." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MEDIA_GROUPED_INVALID";
    }
}

/** Media invalid. */
export class MediaInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Media invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MEDIA_INVALID";
    }
}

/** The new media is invalid. */
export class MediaNewInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The new media is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MEDIA_NEW_INVALID";
    }
}

/** Previous media invalid. */
export class MediaPrevInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Previous media invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MEDIA_PREV_INVALID";
    }
}

/** The specified media TTL is invalid. */
export class MediaTtlInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified media TTL is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MEDIA_TTL_INVALID";
    }
}

/** The specified media type cannot be used in stories. */
export class MediaTypeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified media type cannot be used in stories." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MEDIA_TYPE_INVALID";
    }
}

/** A non-story video cannot be repubblished as a story (emitted when trying to resend a non-story video as a story using inputDocument). */
export class MediaVideoStoryMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "A non-story video cannot be repubblished as a story (emitted when trying to resend a non-story video as a story using inputDocument)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MEDIA_VIDEO_STORY_MISSING";
    }
}

/** This method can only be invoked on a geogroup. */
export class MegagroupGeoRequiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "This method can only be invoked on a geogroup." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MEGAGROUP_GEO_REQUIRED";
    }
}

/** Invalid supergroup ID. */
export class MegagroupIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid supergroup ID." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MEGAGROUP_ID_INVALID";
    }
}

/** Group with hidden history for new members can't be set as discussion groups. */
export class MegagroupPrehistoryHiddenError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Group with hidden history for new members can't be set as discussion groups." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MEGAGROUP_PREHISTORY_HIDDEN";
    }
}

/** You can only use this method on a supergroup. */
export class MegagroupRequiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can only use this method on a supergroup." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MEGAGROUP_REQUIRED";
    }
}

/** You can't edit this message anymore, too much time has passed since its creation. */
export class MessageEditTimeExpiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can't edit this message anymore, too much time has passed since its creation." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MESSAGE_EDIT_TIME_EXPIRED";
    }
}

/** The provided message is empty. */
export class MessageEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided message is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MESSAGE_EMPTY";
    }
}

/** The provided message id is invalid. */
export class MessageIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided message id is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MESSAGE_ID_INVALID";
    }
}

/** No message ids were provided. */
export class MessageIdsEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "No message ids were provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MESSAGE_IDS_EMPTY";
    }
}

/** The provided message data is identical to the previous message data, the message wasn't modified. */
export class MessageNotModifiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided message data is identical to the previous message data, the message wasn't modified." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MESSAGE_NOT_MODIFIED";
    }
}

/** The specified message wasn't read yet. */
export class MessageNotReadYetError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified message wasn't read yet." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MESSAGE_NOT_READ_YET";
    }
}

/** Poll closed. */
export class MessagePollClosedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Poll closed." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MESSAGE_POLL_CLOSED";
    }
}

/** The provided message is too long. */
export class MessageTooLongError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided message is too long." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MESSAGE_TOO_LONG";
    }
}

/** The message is too old, the requested information is not available. */
export class MessageTooOldError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The message is too old, the requested information is not available." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MESSAGE_TOO_OLD";
    }
}

/** The specified method is invalid. */
export class MethodInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified method is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "METHOD_INVALID";
    }
}

/** The specified minimum date is invalid. */
export class MinDateInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified minimum date is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MIN_DATE_INVALID";
    }
}

/** The number of months specified in inputInvoicePremiumGiftStars.months is invalid. */
export class MonthInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The number of months specified in inputInvoicePremiumGiftStars.months is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MONTH_INVALID";
    }
}

/** Invalid message ID provided. */
export class MsgIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid message ID provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MSG_ID_INVALID";
    }
}

/** [`chat_read_mark_expire_period` seconds](https://core.telegram.org/api/config#chat-read-mark-expire-period) have passed since the message was sent, read receipts were deleted. */
export class MsgTooOldError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "[`chat_read_mark_expire_period` seconds](https://core.telegram.org/api/config#chat-read-mark-expire-period) have passed since the message was sent, read receipts were deleted." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MSG_TOO_OLD";
    }
}

/** The specified message is not a voice message. */
export class MsgVoiceMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified message is not a voice message." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MSG_VOICE_MISSING";
    }
}

/** A waiting call returned an error. */
export class MsgWaitError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "A waiting call returned an error." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MSG_WAIT_FAILED";
    }
}

/** Too many media files for album. */
export class MultiMediaTooLongError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Too many media files for album." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MULTI_MEDIA_TOO_LONG";
    }
}

/** The new salt is invalid. */
export class NewSaltInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The new salt is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "NEW_SALT_INVALID";
    }
}

/** No password is set on the current account, and no new password was specified in `new_settings`. */
export class NewSettingsEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "No password is set on the current account, and no new password was specified in `new_settings`." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "NEW_SETTINGS_EMPTY";
    }
}

/** The new password settings are invalid. */
export class NewSettingsInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The new password settings are invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "NEW_SETTINGS_INVALID";
    }
}

/** The specified offset is longer than 64 bytes. */
export class NextOffsetInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified offset is longer than 64 bytes." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "NEXT_OFFSET_INVALID";
    }
}

/** The upgrade/transfer of the specified gift was already paid for or is free. */
export class NoPaymentNeededError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The upgrade/transfer of the specified gift was already paid for or is free." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "NO_PAYMENT_NEEDED";
    }
}

/** Only the "General" topic with `id=1` can be hidden. */
export class NogeneralHideForbiddenError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Only the \"General\" topic with `id=1` can be hidden." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "NOGENERAL_HIDE_FORBIDDEN";
    }
}

/** The current user is not eligible to join the Peer-to-Peer Login Program. */
export class NotEligibleError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The current user is not eligible to join the Peer-to-Peer Login Program." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "NOT_ELIGIBLE";
    }
}

/** The current user hasn't joined the Peer-to-Peer Login Program. */
export class NotJoinedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The current user hasn't joined the Peer-to-Peer Login Program." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "NOT_JOINED";
    }
}

/** The provided offset is invalid. */
export class OffsetInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided offset is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "OFFSET_INVALID";
    }
}

/** The provided offset peer is invalid. */
export class OffsetPeerIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided offset peer is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "OFFSET_PEER_ID_INVALID";
    }
}

/** Invalid option selected. */
export class OptionInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid option selected." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "OPTION_INVALID";
    }
}

/** Too many options provided. */
export class OptionsTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Too many options provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "OPTIONS_TOO_MUCH";
    }
}

/** The specified username order is invalid. */
export class OrderInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified username order is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ORDER_INVALID";
    }
}

/** Short pack name invalid. */
export class PackShortNameInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Short pack name invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PACK_SHORT_NAME_INVALID";
    }
}

/** A stickerpack with this name already exists. */
export class PackShortNameOccupiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "A stickerpack with this name already exists." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PACK_SHORT_NAME_OCCUPIED";
    }
}

/** The stickerpack title is invalid. */
export class PackTitleInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The stickerpack title is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PACK_TITLE_INVALID";
    }
}

/** The masks and emojis flags are mutually exclusive. */
export class PackTypeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The masks and emojis flags are mutually exclusive." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PACK_TYPE_INVALID";
    }
}

/** The specified `parent_peer` is invalid. */
export class ParentPeerInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified `parent_peer` is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PARENT_PEER_INVALID";
    }
}

/** The specified participant ID is invalid. */
export class ParticipantIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified participant ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PARTICIPANT_ID_INVALID";
    }
}

/** Trying to enable a presentation, when the user hasn't joined the Video Chat with [phone.joinGroupCall](https://core.telegram.org/method/phone.joinGroupCall). */
export class ParticipantJoinMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Trying to enable a presentation, when the user hasn't joined the Video Chat with [phone.joinGroupCall](https://core.telegram.org/method/phone.joinGroupCall)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PARTICIPANT_JOIN_MISSING";
    }
}

/** The other participant does not use an up to date telegram client with support for calls. */
export class ParticipantVersionOutdatedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The other participant does not use an up to date telegram client with support for calls." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PARTICIPANT_VERSION_OUTDATED";
    }
}

/** Not enough participants. */
export class ParticipantsTooFewError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Not enough participants." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PARTICIPANTS_TOO_FEW";
    }
}

/** The provided password is empty. */
export class PasswordEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided password is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PASSWORD_EMPTY";
    }
}

/** The provided password hash is invalid. */
export class PasswordHashInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided password hash is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PASSWORD_HASH_INVALID";
    }
}

/** You must [enable 2FA](https://core.telegram.org/api/srp) before executing this operation. */
export class PasswordMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You must [enable 2FA](https://core.telegram.org/api/srp) before executing this operation." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PASSWORD_MISSING";
    }
}

/** The recovery code has expired. */
export class PasswordRecoveryExpiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The recovery code has expired." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PASSWORD_RECOVERY_EXPIRED";
    }
}

/** No email was set, can't recover password via email. */
export class PasswordRecoveryNaError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "No email was set, can't recover password via email." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PASSWORD_RECOVERY_NA";
    }
}

/** A [2FA password](https://core.telegram.org/api/srp) must be configured to use Telegram Passport. */
export class PasswordRequiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "A [2FA password](https://core.telegram.org/api/srp) must be configured to use Telegram Passport." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PASSWORD_REQUIRED";
    }
}

/** The password was modified less than 24 hours ago, try again in %d seconds. */
export class PasswordTooFreshError extends BadRequestError {
    public value: number;

    constructor(args: ErrorArgs) {
        const value = Number(args.capture || 0);
        const message = "The password was modified less than 24 hours ago, try again in " + value + " seconds." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.value = value;
    }
}

/** The specified payment credentials are invalid. */
export class PaymentCredentialsInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified payment credentials are invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PAYMENT_CREDENTIALS_INVALID";
    }
}

/** The specified payment provider is invalid. */
export class PaymentProviderInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified payment provider is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PAYMENT_PROVIDER_INVALID";
    }
}

/** Payment is required for this action, see [here &raquo;](https://core.telegram.org/api/gifts) for more info. */
export class PaymentRequiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Payment is required for this action, see [here &raquo;](https://core.telegram.org/api/gifts) for more info." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PAYMENT_REQUIRED";
    }
}

/** You can't pin an empty chat with a user. */
export class PeerHistoryEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can't pin an empty chat with a user." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PEER_HISTORY_EMPTY";
    }
}

/** The provided peer id is invalid. */
export class PeerIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided peer id is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PEER_ID_INVALID";
    }
}

/** The provided peer ID is not supported. */
export class PeerIdNotSupportedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided peer ID is not supported." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PEER_ID_NOT_SUPPORTED";
    }
}

/** The passed [keyboardButtonSwitchInline](https://core.telegram.org/constructor/keyboardButtonSwitchInline).`peer_types` field is invalid. */
export class PeerTypesInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The passed [keyboardButtonSwitchInline](https://core.telegram.org/constructor/keyboardButtonSwitchInline).`peer_types` field is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PEER_TYPES_INVALID";
    }
}

/** The specified list of peers is empty. */
export class PeersListEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified list of peers is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PEERS_LIST_EMPTY";
    }
}

/** Persistent timestamp empty. */
export class PersistentTimestampEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Persistent timestamp empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PERSISTENT_TIMESTAMP_EMPTY";
    }
}

/** Persistent timestamp invalid. */
export class PersistentTimestampInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Persistent timestamp invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PERSISTENT_TIMESTAMP_INVALID";
    }
}

/** phone_code is missing. */
export class PhoneCodeEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "phone_code is missing." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHONE_CODE_EMPTY";
    }
}

/** The phone code you provided has expired. */
export class PhoneCodeExpiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The phone code you provided has expired." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHONE_CODE_EXPIRED";
    }
}

/** phone_code_hash is missing. */
export class PhoneCodeHashEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "phone_code_hash is missing." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHONE_CODE_HASH_EMPTY";
    }
}

/** The provided phone code is invalid. */
export class PhoneCodeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided phone code is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHONE_CODE_INVALID";
    }
}

/** An invalid or expired `phone_code_hash` was provided. */
export class PhoneHashExpiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "An invalid or expired `phone_code_hash` was provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHONE_HASH_EXPIRED";
    }
}

/** No user is associated to the specified phone number. */
export class PhoneNotOccupiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "No user is associated to the specified phone number." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHONE_NOT_OCCUPIED";
    }
}

/** You can't sign up using this app. */
export class PhoneNumberAppSignupForbiddenError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can't sign up using this app." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHONE_NUMBER_APP_SIGNUP_FORBIDDEN";
    }
}

/** The provided phone number is banned from telegram. */
export class PhoneNumberBannedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided phone number is banned from telegram." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHONE_NUMBER_BANNED";
    }
}

/** You asked for the code too many times. */
export class PhoneNumberFloodError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You asked for the code too many times." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHONE_NUMBER_FLOOD";
    }
}

/** The phone number is invalid. */
export class PhoneNumberInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The phone number is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHONE_NUMBER_INVALID";
    }
}

/** The phone number is already in use. */
export class PhoneNumberOccupiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The phone number is already in use." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHONE_NUMBER_OCCUPIED";
    }
}

/** The phone number is not yet being used. */
export class PhoneNumberUnoccupiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The phone number is not yet being used." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHONE_NUMBER_UNOCCUPIED";
    }
}

/** This phone is password protected. */
export class PhonePasswordProtectedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "This phone is password protected." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHONE_PASSWORD_PROTECTED";
    }
}

/** Photo mime-type invalid. */
export class PhotoContentTypeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Photo mime-type invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHOTO_CONTENT_TYPE_INVALID";
    }
}

/** Photo URL invalid. */
export class PhotoContentUrlEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Photo URL invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHOTO_CONTENT_URL_EMPTY";
    }
}

/** Photo crop file missing. */
export class PhotoCropFileMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Photo crop file missing." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHOTO_CROP_FILE_MISSING";
    }
}

/** Photo is too small. */
export class PhotoCropSizeSmallError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Photo is too small." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHOTO_CROP_SIZE_SMALL";
    }
}

/** The extension of the photo is invalid. */
export class PhotoExtInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The extension of the photo is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHOTO_EXT_INVALID";
    }
}

/** Profile photo file missing. */
export class PhotoFileMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Profile photo file missing." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHOTO_FILE_MISSING";
    }
}

/** Photo ID invalid. */
export class PhotoIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Photo ID invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHOTO_ID_INVALID";
    }
}

/** Photo invalid. */
export class PhotoInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Photo invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHOTO_INVALID";
    }
}

/** The photo dimensions are invalid. */
export class PhotoInvalidDimensionsError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The photo dimensions are invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHOTO_INVALID_DIMENSIONS";
    }
}

/** Internal issues, try again later. */
export class PhotoSaveFileInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Internal issues, try again later." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHOTO_SAVE_FILE_INVALID";
    }
}

/** Photo thumbnail URL is empty. */
export class PhotoThumbUrlEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Photo thumbnail URL is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHOTO_THUMB_URL_EMPTY";
    }
}

/** You can't pin messages. */
export class PinRestrictedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can't pin messages." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PIN_RESTRICTED";
    }
}

/** Too many pinned dialogs. */
export class PinnedDialogsTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Too many pinned dialogs." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PINNED_DIALOGS_TOO_MUCH";
    }
}

/** There are too many pinned topics, unpin some first. */
export class PinnedTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "There are too many pinned topics, unpin some first." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PINNED_TOO_MUCH";
    }
}

/** One of the poll answers is not acceptable. */
export class PollAnswerInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "One of the poll answers is not acceptable." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "POLL_ANSWER_INVALID";
    }
}

/** Invalid poll answers were provided. */
export class PollAnswersInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid poll answers were provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "POLL_ANSWERS_INVALID";
    }
}

/** Duplicate poll options provided. */
export class PollOptionDuplicateError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Duplicate poll options provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "POLL_OPTION_DUPLICATE";
    }
}

/** Invalid poll option provided. */
export class PollOptionInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid poll option provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "POLL_OPTION_INVALID";
    }
}

/** One of the poll questions is not acceptable. */
export class PollQuestionInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "One of the poll questions is not acceptable." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "POLL_QUESTION_INVALID";
    }
}

/** A premium account is required to execute this action. */
export class PremiumAccountRequiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "A premium account is required to execute this action." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PREMIUM_ACCOUNT_REQUIRED";
    }
}

/** The pricing for the [subscription](https://core.telegram.org/api/subscriptions) is invalid, the maximum price is specified in the [`stars_subscription_amount_max` config key &raquo;](https://core.telegram.org/api/config#stars-subscription-amount-max). */
export class PricingChatInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The pricing for the [subscription](https://core.telegram.org/api/subscriptions) is invalid, the maximum price is specified in the [`stars_subscription_amount_max` config key &raquo;](https://core.telegram.org/api/config#stars-subscription-amount-max)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PRICING_CHAT_INVALID";
    }
}

/** The privacy key is invalid. */
export class PrivacyKeyInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The privacy key is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PRIVACY_KEY_INVALID";
    }
}

/** Too many privacy rules were specified, the current limit is 1000. */
export class PrivacyTooLongError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Too many privacy rules were specified, the current limit is 1000." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PRIVACY_TOO_LONG";
    }
}

/** The specified privacy rule combination is invalid. */
export class PrivacyValueInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified privacy rule combination is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PRIVACY_VALUE_INVALID";
    }
}

/** A public key is required. */
export class PublicKeyRequiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "A public key is required." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PUBLIC_KEY_REQUIRED";
    }
}

/** The specified payment purpose is invalid. */
export class PurposeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified payment purpose is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PURPOSE_INVALID";
    }
}

/** The query ID is empty. */
export class QueryIdEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The query ID is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "QUERY_ID_EMPTY";
    }
}

/** The query ID is invalid. */
export class QueryIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The query ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "QUERY_ID_INVALID";
    }
}

/** The query string is too short. */
export class QueryTooShortError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The query string is too short." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "QUERY_TOO_SHORT";
    }
}

/** [Quick replies](https://core.telegram.org/api/business#quick-reply-shortcuts) cannot be used by bots. */
export class QuickRepliesBotNotAllowedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "[Quick replies](https://core.telegram.org/api/business#quick-reply-shortcuts) cannot be used by bots." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "QUICK_REPLIES_BOT_NOT_ALLOWED";
    }
}

/** A maximum of [appConfig.`quick_replies_limit`](https://core.telegram.org/api/config#quick-replies-limit) shortcuts may be created, the limit was reached. */
export class QuickRepliesTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "A maximum of [appConfig.`quick_replies_limit`](https://core.telegram.org/api/config#quick-replies-limit) shortcuts may be created, the limit was reached." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "QUICK_REPLIES_TOO_MUCH";
    }
}

/** You can forward a quiz while hiding the original author only after choosing an option in the quiz. */
export class QuizAnswerMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can forward a quiz while hiding the original author only after choosing an option in the quiz." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "QUIZ_ANSWER_MISSING";
    }
}

/** An invalid value was provided to the correct_answers field. */
export class QuizCorrectAnswerInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "An invalid value was provided to the correct_answers field." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "QUIZ_CORRECT_ANSWER_INVALID";
    }
}

/** No correct quiz answer was specified. */
export class QuizCorrectAnswersEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "No correct quiz answer was specified." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "QUIZ_CORRECT_ANSWERS_EMPTY";
    }
}

/** You specified too many correct answers in a quiz, quizzes can only have one right answer! */
export class QuizCorrectAnswersTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You specified too many correct answers in a quiz, quizzes can only have one right answer!" + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "QUIZ_CORRECT_ANSWERS_TOO_MUCH";
    }
}

/** Quizzes can't have the multiple_choice flag set! */
export class QuizMultipleInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Quizzes can't have the multiple_choice flag set!" + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "QUIZ_MULTIPLE_INVALID";
    }
}

/** The specified `reply_to`.`quote_text` field is invalid. */
export class QuoteTextInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified `reply_to`.`quote_text` field is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "QUOTE_TEXT_INVALID";
    }
}

/** You cannot raise your hand. */
export class RaiseHandForbiddenError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You cannot raise your hand." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RAISE_HAND_FORBIDDEN";
    }
}

/** Random ID empty. */
export class RandomIdEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Random ID empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RANDOM_ID_EMPTY";
    }
}

/** The specified `random_id` was expired (most likely it didn't follow the required `uint64_t random_id = (time() << 32) | ((uint64_t)random_uint32_t())` format, or the specified time is too far in the past). */
export class RandomIdExpiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified `random_id` was expired (most likely it didn't follow the required `uint64_t random_id = (time() << 32) | ((uint64_t)random_uint32_t())` format, or the specified time is too far in the past)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RANDOM_ID_EXPIRED";
    }
}

/** A provided random ID is invalid. */
export class RandomIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "A provided random ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RANDOM_ID_INVALID";
    }
}

/** Random length invalid. */
export class RandomLengthInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Random length invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RANDOM_LENGTH_INVALID";
    }
}

/** Invalid range provided. */
export class RangesInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid range provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RANGES_INVALID";
    }
}

/** Empty reaction provided. */
export class ReactionEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Empty reaction provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "REACTION_EMPTY";
    }
}

/** The specified reaction is invalid. */
export class ReactionInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified reaction is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "REACTION_INVALID";
    }
}

/** The specified number of reactions is invalid. */
export class ReactionsCountInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified number of reactions is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "REACTIONS_COUNT_INVALID";
    }
}

/** The message already has exactly `reactions_uniq_max` reaction emojis, you can't react with a new emoji, see [the docs for more info &raquo;](https://core.telegram.org/api/config#client-configuration). */
export class ReactionsTooManyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The message already has exactly `reactions_uniq_max` reaction emojis, you can't react with a new emoji, see [the docs for more info &raquo;](https://core.telegram.org/api/config#client-configuration)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "REACTIONS_TOO_MANY";
    }
}

/** The specified receipt is empty. */
export class ReceiptEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified receipt is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RECEIPT_EMPTY";
    }
}

/** Reply markup for buy button empty. */
export class ReplyMarkupBuyEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Reply markup for buy button empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "REPLY_MARKUP_BUY_EMPTY";
    }
}

/** A game message is being edited, but the newly provided keyboard doesn't have a keyboardButtonGame button. */
export class ReplyMarkupGameEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "A game message is being edited, but the newly provided keyboard doesn't have a keyboardButtonGame button." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "REPLY_MARKUP_GAME_EMPTY";
    }
}

/** The provided reply markup is invalid. */
export class ReplyMarkupInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided reply markup is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "REPLY_MARKUP_INVALID";
    }
}

/** The specified reply_markup is too long. */
export class ReplyMarkupTooLongError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified reply_markup is too long." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "REPLY_MARKUP_TOO_LONG";
    }
}

/** The specified reply-to message ID is invalid. */
export class ReplyMessageIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified reply-to message ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "REPLY_MESSAGE_ID_INVALID";
    }
}

/** Each shortcut can contain a maximum of [appConfig.`quick_reply_messages_limit`](https://core.telegram.org/api/config#quick-reply-messages-limit) messages, the limit was reached. */
export class ReplyMessagesTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Each shortcut can contain a maximum of [appConfig.`quick_reply_messages_limit`](https://core.telegram.org/api/config#quick-reply-messages-limit) messages, the limit was reached." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "REPLY_MESSAGES_TOO_MUCH";
    }
}

/** The specified `reply_to` field is invalid. */
export class ReplyToInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified `reply_to` field is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "REPLY_TO_INVALID";
    }
}

/** The specified inputReplyToMonoForum.monoforum_peer_id is invalid. */
export class ReplyToMonoforumPeerInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified inputReplyToMonoForum.monoforum_peer_id is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "REPLY_TO_MONOFORUM_PEER_INVALID";
    }
}

/** The replied-to user is invalid. */
export class ReplyToUserInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The replied-to user is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "REPLY_TO_USER_INVALID";
    }
}

/** The master DC did not accept the `request_token` from the CDN DC. Continue downloading the file from the master DC using upload.getFile. */
export class RequestTokenInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The master DC did not accept the `request_token` from the CDN DC. Continue downloading the file from the master DC using upload.getFile." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "REQUEST_TOKEN_INVALID";
    }
}

/** No password reset is in progress. */
export class ResetRequestMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "No password reset is in progress." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RESET_REQUEST_MISSING";
    }
}

/** You provided a duplicate result ID. */
export class ResultIdDuplicateError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You provided a duplicate result ID." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RESULT_ID_DUPLICATE";
    }
}

/** Result ID empty. */
export class ResultIdEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Result ID empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RESULT_ID_EMPTY";
    }
}

/** One of the specified result IDs is invalid. */
export class ResultIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "One of the specified result IDs is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RESULT_ID_INVALID";
    }
}

/** Result type invalid. */
export class ResultTypeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Result type invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RESULT_TYPE_INVALID";
    }
}

/** Too many results were provided. */
export class ResultsTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Too many results were provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RESULTS_TOO_MUCH";
    }
}

/** You cannot change your vote. */
export class RevoteNotAllowedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You cannot change your vote." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "REVOTE_NOT_ALLOWED";
    }
}

/** The new admin rights are equal to the old rights, no change was made. */
export class RightsNotModifiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The new admin rights are equal to the old rights, no change was made." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RIGHTS_NOT_MODIFIED";
    }
}

/** The specified ringtone is invalid. */
export class RingtoneInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified ringtone is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RINGTONE_INVALID";
    }
}

/** The MIME type for the ringtone is invalid. */
export class RingtoneMimeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The MIME type for the ringtone is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RINGTONE_MIME_INVALID";
    }
}

/** Internal RSA decryption failed. */
export class RsaDecryptFailedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Internal RSA decryption failed." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RSA_DECRYPT_FAILED";
    }
}

/** The passed inputSavedStarGiftChat.saved_id is empty. */
export class SavedIdEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The passed inputSavedStarGiftChat.saved_id is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SAVED_ID_EMPTY";
    }
}

/** Bots cannot schedule messages. */
export class ScheduleBotNotAllowedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Bots cannot schedule messages." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SCHEDULE_BOT_NOT_ALLOWED";
    }
}

/** Invalid schedule date provided. */
export class ScheduleDateInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid schedule date provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SCHEDULE_DATE_INVALID";
    }
}

/** You can't schedule a message this far in the future. */
export class ScheduleDateTooLateError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can't schedule a message this far in the future." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SCHEDULE_DATE_TOO_LATE";
    }
}

/** Can't schedule until user is online, if the user's last seen timestamp is hidden by their privacy settings. */
export class ScheduleStatusPrivateError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Can't schedule until user is online, if the user's last seen timestamp is hidden by their privacy settings." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SCHEDULE_STATUS_PRIVATE";
    }
}

/** There are too many scheduled messages. */
export class ScheduleTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "There are too many scheduled messages." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SCHEDULE_TOO_MUCH";
    }
}

/** The specified game score is invalid. */
export class ScoreInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified game score is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SCORE_INVALID";
    }
}

/** The search query is empty. */
export class SearchQueryEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The search query is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SEARCH_QUERY_EMPTY";
    }
}

/** You cannot provide a search query and an invite link at the same time. */
export class SearchWithLinkNotSupportedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You cannot provide a search query and an invite link at the same time." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SEARCH_WITH_LINK_NOT_SUPPORTED";
    }
}

/** Invalid duration provided. */
export class SecondsInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid duration provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SECONDS_INVALID";
    }
}

/** A secure secret is required. */
export class SecureSecretRequiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "A secure secret is required." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SECURE_SECRET_REQUIRED";
    }
}

/** Business bots can't delete messages just for the user, `revoke` **must** be set. */
export class SelfDeleteRestrictedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Business bots can't delete messages just for the user, `revoke` **must** be set." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SELF_DELETE_RESTRICTED";
    }
}

/** You can't send messages as the specified peer. */
export class SendAsPeerInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can't send messages as the specified peer." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SEND_AS_PEER_INVALID";
    }
}

/** An inputBotInlineMessageGame can only be contained in an inputBotInlineResultGame, not in an inputBotInlineResult/inputBotInlineResultPhoto/etc. */
export class SendMessageGameInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "An inputBotInlineMessageGame can only be contained in an inputBotInlineResultGame, not in an inputBotInlineResult/inputBotInlineResultPhoto/etc." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SEND_MESSAGE_GAME_INVALID";
    }
}

/** Invalid media provided. */
export class SendMessageMediaInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid media provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SEND_MESSAGE_MEDIA_INVALID";
    }
}

/** The message type is invalid. */
export class SendMessageTypeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The message type is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SEND_MESSAGE_TYPE_INVALID";
    }
}

/** This session was created less than 24 hours ago, try again in %d seconds. */
export class SessionTooFreshError extends BadRequestError {
    public value: number;

    constructor(args: ErrorArgs) {
        const value = Number(args.capture || 0);
        const message = "This session was created less than 24 hours ago, try again in " + value + " seconds." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.value = value;
    }
}

/** Invalid settings were provided. */
export class SettingsInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid settings were provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SETTINGS_INVALID";
    }
}

/** The provided SHA256 hash is invalid. */
export class Sha256HashInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided SHA256 hash is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SHA256_HASH_INVALID";
    }
}

/** The specified short name is invalid. */
export class ShortNameInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified short name is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SHORT_NAME_INVALID";
    }
}

/** The specified short name is already in use. */
export class ShortNameOccupiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified short name is already in use." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SHORT_NAME_OCCUPIED";
    }
}

/** The specified shortcut is invalid. */
export class ShortcutInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified shortcut is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SHORTCUT_INVALID";
    }
}

/** The specified slot list is empty. */
export class SlotsEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified slot list is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SLOTS_EMPTY";
    }
}

/** Slowmode is enabled, you cannot forward multiple messages to this group. */
export class SlowmodeMultiMsgsDisabledError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Slowmode is enabled, you cannot forward multiple messages to this group." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SLOWMODE_MULTI_MSGS_DISABLED";
    }
}

/** The specified invoice slug is invalid. */
export class SlugInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified invoice slug is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SLUG_INVALID";
    }
}

/** An error occurred while creating the SMS code. */
export class SmsCodeCreateFailedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "An error occurred while creating the SMS code." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SMS_CODE_CREATE_FAILED";
    }
}

/** The specified job ID is invalid. */
export class SmsjobIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified job ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SMSJOB_ID_INVALID";
    }
}

/** The specified inputCheckPasswordSRP.A value is invalid. */
export class SrpAInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified inputCheckPasswordSRP.A value is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SRP_A_INVALID";
    }
}

/** Invalid SRP ID provided. */
export class SrpIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid SRP ID provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SRP_ID_INVALID";
    }
}

/** Password has changed. */
export class SrpPasswordChangedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Password has changed." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SRP_PASSWORD_CHANGED";
    }
}

/** The specified star gift was already converted to Stars. */
export class StargiftAlreadyConvertedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified star gift was already converted to Stars." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARGIFT_ALREADY_CONVERTED";
    }
}

/** The specified star gift was already refunded. */
export class StargiftAlreadyRefundedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified star gift was already refunded." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARGIFT_ALREADY_REFUNDED";
    }
}

/** The specified gift was already upgraded to a collectible gift. */
export class StargiftAlreadyUpgradedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified gift was already upgraded to a collectible gift." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARGIFT_ALREADY_UPGRADED";
    }
}

/** The passed gift is invalid. */
export class StargiftInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The passed gift is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARGIFT_INVALID";
    }
}

/** The specified gift was not found. */
export class StargiftNotFoundError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified gift was not found." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARGIFT_NOT_FOUND";
    }
}

/** You cannot transfer or sell a gift owned by another user. */
export class StargiftOwnerInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You cannot transfer or sell a gift owned by another user." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARGIFT_OWNER_INVALID";
    }
}

/** The specified inputSavedStarGiftChat.peer is invalid. */
export class StargiftPeerInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified inputSavedStarGiftChat.peer is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARGIFT_PEER_INVALID";
    }
}

/** You can't buy the gift using the specified currency (i.e. trying to pay in Stars for TON gifts). */
export class StargiftResellCurrencyNotAllowedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You can't buy the gift using the specified currency (i.e. trying to pay in Stars for TON gifts)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARGIFT_RESELL_CURRENCY_NOT_ALLOWED";
    }
}

/** The specified gift slug is invalid. */
export class StargiftSlugInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified gift slug is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARGIFT_SLUG_INVALID";
    }
}

/** You cannot transfer this gift yet, wait %d seconds. */
export class StargiftTransferTooEarlyError extends BadRequestError {
    public value: number;

    constructor(args: ErrorArgs) {
        const value = Number(args.capture || 0);
        const message = "You cannot transfer this gift yet, wait " + value + " seconds." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.value = value;
    }
}

/** A received gift can only be upgraded to a collectible gift if the [messageActionStarGift](https://core.telegram.org/constructor/messageActionStarGift)/[savedStarGift](https://core.telegram.org/constructor/savedStarGift).`can_upgrade` flag is set. */
export class StargiftUpgradeUnavailableError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "A received gift can only be upgraded to a collectible gift if the [messageActionStarGift](https://core.telegram.org/constructor/messageActionStarGift)/[savedStarGift](https://core.telegram.org/constructor/savedStarGift).`can_upgrade` flag is set." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARGIFT_UPGRADE_UNAVAILABLE";
    }
}

/** The gift is sold out. */
export class StargiftUsageLimitedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The gift is sold out." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARGIFT_USAGE_LIMITED";
    }
}

/** You've reached the starGift.limited_per_user limit, you can't buy any more gifts of this type. */
export class StargiftUserUsageLimitedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You've reached the starGift.limited_per_user limit, you can't buy any more gifts of this type." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARGIFT_USER_USAGE_LIMITED";
    }
}

/** The previous referral program was terminated less than 24 hours ago: further changes can be made after the date specified in userFull.starref_program.end_date. */
export class StarrefAwaitingEndError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The previous referral program was terminated less than 24 hours ago: further changes can be made after the date specified in userFull.starref_program.end_date." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARREF_AWAITING_END";
    }
}

/** The specified referral link is invalid. */
export class StarrefExpiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified referral link is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARREF_EXPIRED";
    }
}

/** The specified affiliate link was already revoked. */
export class StarrefHashRevokedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified affiliate link was already revoked." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARREF_HASH_REVOKED";
    }
}

/** The specified commission_permille is invalid: the minimum and maximum values for this parameter are contained in the [starref_min_commission_permille](https://core.telegram.org/api/config#starref-min-commission-permille) and [starref_max_commission_permille](https://core.telegram.org/api/config#starref-max-commission-permille) client configuration parameters. */
export class StarrefPermilleInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified commission_permille is invalid: the minimum and maximum values for this parameter are contained in the [starref_min_commission_permille](https://core.telegram.org/api/config#starref-min-commission-permille) and [starref_max_commission_permille](https://core.telegram.org/api/config#starref-max-commission-permille) client configuration parameters." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARREF_PERMILLE_INVALID";
    }
}

/** The specified commission_permille is too low: the minimum and maximum values for this parameter are contained in the [starref_min_commission_permille](https://core.telegram.org/api/config#starref-min-commission-permille) and [starref_max_commission_permille](https://core.telegram.org/api/config#starref-max-commission-permille) client configuration parameters. */
export class StarrefPermilleTooLowError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified commission_permille is too low: the minimum and maximum values for this parameter are contained in the [starref_min_commission_permille](https://core.telegram.org/api/config#starref-min-commission-permille) and [starref_max_commission_permille](https://core.telegram.org/api/config#starref-max-commission-permille) client configuration parameters." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARREF_PERMILLE_TOO_LOW";
    }
}

/** The specified amount in stars is invalid. */
export class StarsAmountInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified amount in stars is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARS_AMOUNT_INVALID";
    }
}

/** The specified Telegram Star invoice is invalid. */
export class StarsInvoiceInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified Telegram Star invoice is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARS_INVOICE_INVALID";
    }
}

/** To import this chat invite link, you must first [pay for the associated Telegram Star subscription &raquo;](https://core.telegram.org/api/subscriptions#channel-subscriptions). */
export class StarsPaymentRequiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "To import this chat invite link, you must first [pay for the associated Telegram Star subscription &raquo;](https://core.telegram.org/api/subscriptions#channel-subscriptions)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARS_PAYMENT_REQUIRED";
    }
}

/** The start parameter is empty. */
export class StartParamEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The start parameter is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "START_PARAM_EMPTY";
    }
}

/** Start parameter invalid. */
export class StartParamInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Start parameter invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "START_PARAM_INVALID";
    }
}

/** Start parameter is too long. */
export class StartParamTooLongError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Start parameter is too long." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "START_PARAM_TOO_LONG";
    }
}

/** The specified sticker document is invalid. */
export class StickerDocumentInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified sticker document is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKER_DOCUMENT_INVALID";
    }
}

/** Sticker emoji invalid. */
export class StickerEmojiInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Sticker emoji invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKER_EMOJI_INVALID";
    }
}

/** Sticker file invalid. */
export class StickerFileInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Sticker file invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKER_FILE_INVALID";
    }
}

/** The specified video sticker has invalid dimensions. */
export class StickerGifDimensionsError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified video sticker has invalid dimensions." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKER_GIF_DIMENSIONS";
    }
}

/** The provided sticker ID is invalid. */
export class StickerIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided sticker ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKER_ID_INVALID";
    }
}

/** The provided sticker is invalid. */
export class StickerInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided sticker is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKER_INVALID";
    }
}

/** The specified sticker MIME type is invalid. */
export class StickerMimeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified sticker MIME type is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKER_MIME_INVALID";
    }
}

/** Sticker png dimensions invalid. */
export class StickerPngDimensionsError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Sticker png dimensions invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKER_PNG_DIMENSIONS";
    }
}

/** One of the specified stickers is not a valid PNG file. */
export class StickerPngNopngError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "One of the specified stickers is not a valid PNG file." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKER_PNG_NOPNG";
    }
}

/** You must send the animated sticker as a document. */
export class StickerTgsNodocError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You must send the animated sticker as a document." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKER_TGS_NODOC";
    }
}

/** Invalid TGS sticker provided. */
export class StickerTgsNotgsError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid TGS sticker provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKER_TGS_NOTGS";
    }
}

/** Incorrect stickerset thumb file provided, PNG / WEBP expected. */
export class StickerThumbPngNopngError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Incorrect stickerset thumb file provided, PNG / WEBP expected." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKER_THUMB_PNG_NOPNG";
    }
}

/** Incorrect stickerset TGS thumb file provided. */
export class StickerThumbTgsNotgsError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Incorrect stickerset TGS thumb file provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKER_THUMB_TGS_NOTGS";
    }
}

/** The specified video sticker is too big. */
export class StickerVideoBigError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified video sticker is too big." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKER_VIDEO_BIG";
    }
}

/** You must send the video sticker as a document. */
export class StickerVideoNodocError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You must send the video sticker as a document." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKER_VIDEO_NODOC";
    }
}

/** The specified video sticker is not in webm format. */
export class StickerVideoNowebmError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified video sticker is not in webm format." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKER_VIDEO_NOWEBM";
    }
}

/** There are too many stickers in this stickerpack, you can't add any more. */
export class StickerpackStickersTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "There are too many stickers in this stickerpack, you can't add any more." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKERPACK_STICKERS_TOO_MUCH";
    }
}

/** No sticker provided. */
export class StickersEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "No sticker provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKERS_EMPTY";
    }
}

/** There are too many stickers in this stickerpack, you can't add any more. */
export class StickersTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "There are too many stickers in this stickerpack, you can't add any more." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKERS_TOO_MUCH";
    }
}

/** The provided sticker set is invalid. */
export class StickersetInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided sticker set is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKERSET_INVALID";
    }
}

/** This peer hasn't ever posted any stories. */
export class StoriesNeverCreatedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "This peer hasn't ever posted any stories." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STORIES_NEVER_CREATED";
    }
}

/** You have hit the maximum active stories limit as specified by the [`story_expiring_limit_*` client configuration parameters](https://core.telegram.org/api/config#story-expiring-limit-default): you should buy a [Premium](https://core.telegram.org/api/premium) subscription, delete an active story, or wait for the oldest story to expire. */
export class StoriesTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You have hit the maximum active stories limit as specified by the [`story_expiring_limit_*` client configuration parameters](https://core.telegram.org/api/config#story-expiring-limit-default): you should buy a [Premium](https://core.telegram.org/api/premium) subscription, delete an active story, or wait for the oldest story to expire." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STORIES_TOO_MUCH";
    }
}

/** You specified no story IDs. */
export class StoryIdEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You specified no story IDs." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STORY_ID_EMPTY";
    }
}

/** The specified story ID is invalid. */
export class StoryIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified story ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STORY_ID_INVALID";
    }
}

/** The new story information you passed is equal to the previous story information, thus it wasn't modified. */
export class StoryNotModifiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The new story information you passed is equal to the previous story information, thus it wasn't modified." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STORY_NOT_MODIFIED";
    }
}

/** The specified story period is invalid for this account. */
export class StoryPeriodInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified story period is invalid for this account." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STORY_PERIOD_INVALID";
    }
}

/** You've hit the monthly story limit as specified by the [`stories_sent_monthly_limit_*` client configuration parameters](https://core.telegram.org/api/config#stories-sent-monthly-limit-default): wait %d seconds before posting a new story. */
export class StorySendFloodMonthlyError extends BadRequestError {
    public value: number;

    constructor(args: ErrorArgs) {
        const value = Number(args.capture || 0);
        const message = "You've hit the monthly story limit as specified by the [`stories_sent_monthly_limit_*` client configuration parameters](https://core.telegram.org/api/config#stories-sent-monthly-limit-default): wait " + value + " seconds before posting a new story." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.value = value;
    }
}

/** You've hit the weekly story limit as specified by the [`stories_sent_weekly_limit_*` client configuration parameters](https://core.telegram.org/api/config#stories-sent-weekly-limit-default): wait for %d seconds before posting a new story. */
export class StorySendFloodWeeklyError extends BadRequestError {
    public value: number;

    constructor(args: ErrorArgs) {
        const value = Number(args.capture || 0);
        const message = "You've hit the weekly story limit as specified by the [`stories_sent_weekly_limit_*` client configuration parameters](https://core.telegram.org/api/config#stories-sent-weekly-limit-default): wait for " + value + " seconds before posting a new story." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.value = value;
    }
}

/** You cannot send a [bot subscription invoice](https://core.telegram.org/api/subscriptions#bot-subscriptions) directly, you may only create invoice links using [payments.exportInvoice](https://core.telegram.org/method/payments.exportInvoice). */
export class SubscriptionExportMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You cannot send a [bot subscription invoice](https://core.telegram.org/api/subscriptions#bot-subscriptions) directly, you may only create invoice links using [payments.exportInvoice](https://core.telegram.org/method/payments.exportInvoice)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SUBSCRIPTION_EXPORT_MISSING";
    }
}

/** The specified subscription_id is invalid. */
export class SubscriptionIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified subscription_id is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SUBSCRIPTION_ID_INVALID";
    }
}

/** The specified subscription_pricing.period is invalid. */
export class SubscriptionPeriodInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified subscription_pricing.period is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SUBSCRIPTION_PERIOD_INVALID";
    }
}

/** The specified price for the suggested post is invalid. */
export class SuggestedPostAmountInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified price for the suggested post is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SUGGESTED_POST_AMOUNT_INVALID";
    }
}

/** You cannot send suggested posts to non-[monoforum](https://core.telegram.org/api/monoforum) peers. */
export class SuggestedPostPeerInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You cannot send suggested posts to non-[monoforum](https://core.telegram.org/api/monoforum) peers." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SUGGESTED_POST_PEER_INVALID";
    }
}

/** The switch_pm.text field was empty. */
export class SwitchPmTextEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The switch_pm.text field was empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SWITCH_PM_TEXT_EMPTY";
    }
}

/** The URL specified in switch_webview.url is invalid! */
export class SwitchWebviewUrlInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The URL specified in switch_webview.url is invalid!" + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SWITCH_WEBVIEW_URL_INVALID";
    }
}

/** The specified takeout ID is invalid. */
export class TakeoutInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified takeout ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TAKEOUT_INVALID";
    }
}

/** A [takeout](https://core.telegram.org/api/takeout) session needs to be initialized first, [see here &raquo; for more info](https://core.telegram.org/api/takeout). */
export class TakeoutRequiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "A [takeout](https://core.telegram.org/api/takeout) session needs to be initialized first, [see here &raquo; for more info](https://core.telegram.org/api/takeout)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TAKEOUT_REQUIRED";
    }
}

/** An email reset was already requested. */
export class TaskAlreadyExistsError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "An email reset was already requested." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TASK_ALREADY_EXISTS";
    }
}

/** The passed temporary key is already bound to another **perm_auth_key_id**. */
export class TempAuthKeyAlreadyBoundError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The passed temporary key is already bound to another **perm_auth_key_id**." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TEMP_AUTH_KEY_ALREADY_BOUND";
    }
}

/** No temporary auth key provided. */
export class TempAuthKeyEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "No temporary auth key provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TEMP_AUTH_KEY_EMPTY";
    }
}

/** The specified [invoice](https://core.telegram.org/constructor/invoice).`terms_url` is invalid. */
export class TermsUrlInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified [invoice](https://core.telegram.org/constructor/invoice).`terms_url` is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TERMS_URL_INVALID";
    }
}

/** Invalid theme file provided. */
export class ThemeFileInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid theme file provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "THEME_FILE_INVALID";
    }
}

/** Invalid theme format provided. */
export class ThemeFormatInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid theme format provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "THEME_FORMAT_INVALID";
    }
}

/** Invalid theme provided. */
export class ThemeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid theme provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "THEME_INVALID";
    }
}

/** The theme's MIME type is invalid. */
export class ThemeMimeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The theme's MIME type is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "THEME_MIME_INVALID";
    }
}

/** The specified `theme_params` field is invalid. */
export class ThemeParamsInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified `theme_params` field is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "THEME_PARAMS_INVALID";
    }
}

/** The specified theme slug is invalid. */
export class ThemeSlugInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified theme slug is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "THEME_SLUG_INVALID";
    }
}

/** The specified theme title is invalid. */
export class ThemeTitleInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified theme title is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "THEME_TITLE_INVALID";
    }
}

/** The specified timezone does not exist. */
export class TimezoneInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified timezone does not exist." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TIMEZONE_INVALID";
    }
}

/** The specified stickerpack title is invalid. */
export class TitleInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified stickerpack title is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TITLE_INVALID";
    }
}

/** The temporary password is disabled. */
export class TmpPasswordDisabledError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The temporary password is disabled." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TMP_PASSWORD_DISABLED";
    }
}

/** The passed tmp_password is invalid. */
export class TmpPasswordInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The passed tmp_password is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TMP_PASSWORD_INVALID";
    }
}

/** The specified `to_id` of the passed inputInvoiceStarGiftResale or inputInvoiceStarGiftTransfer is invalid. */
export class ToIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified `to_id` of the passed inputInvoiceStarGiftResale or inputInvoiceStarGiftTransfer is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TO_ID_INVALID";
    }
}

/** The specified destination language is invalid. */
export class ToLangInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified destination language is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TO_LANG_INVALID";
    }
}

/** Duplicate [checklist items](https://core.telegram.org/api/todo) detected. */
export class TodoItemDuplicateError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Duplicate [checklist items](https://core.telegram.org/api/todo) detected." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TODO_ITEM_DUPLICATE";
    }
}

/** A checklist was specified, but no [checklist items](https://core.telegram.org/api/todo) were passed. */
export class TodoItemsEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "A checklist was specified, but no [checklist items](https://core.telegram.org/api/todo) were passed." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TODO_ITEMS_EMPTY";
    }
}

/** No todo items were specified, so no changes were made to the todo list. */
export class TodoNotModifiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "No todo items were specified, so no changes were made to the todo list." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TODO_NOT_MODIFIED";
    }
}

/** The specified token is empty. */
export class TokenEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified token is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TOKEN_EMPTY";
    }
}

/** The provided token is invalid. */
export class TokenInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided token is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TOKEN_INVALID";
    }
}

/** The specified token type is invalid. */
export class TokenTypeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified token type is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TOKEN_TYPE_INVALID";
    }
}

/** The `close` flag cannot be provided together with any of the other flags. */
export class TopicCloseSeparatelyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The `close` flag cannot be provided together with any of the other flags." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TOPIC_CLOSE_SEPARATELY";
    }
}

/** This topic was closed, you can't send messages to it anymore. */
export class TopicClosedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "This topic was closed, you can't send messages to it anymore." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TOPIC_CLOSED";
    }
}

/** The specified topic was deleted. */
export class TopicDeletedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified topic was deleted." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TOPIC_DELETED";
    }
}

/** The `hide` flag cannot be provided together with any of the other flags. */
export class TopicHideSeparatelyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The `hide` flag cannot be provided together with any of the other flags." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TOPIC_HIDE_SEPARATELY";
    }
}

/** The specified topic ID is invalid. */
export class TopicIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified topic ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TOPIC_ID_INVALID";
    }
}

/** The updated topic info is equal to the current topic info, nothing was changed. */
export class TopicNotModifiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The updated topic info is equal to the current topic info, nothing was changed." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TOPIC_NOT_MODIFIED";
    }
}

/** The specified topic title is empty. */
export class TopicTitleEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified topic title is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TOPIC_TITLE_EMPTY";
    }
}

/** You specified no topic IDs. */
export class TopicsEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You specified no topic IDs." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TOPICS_EMPTY";
    }
}

/** The specified transaction ID is invalid. */
export class TransactionIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified transaction ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TRANSACTION_ID_INVALID";
    }
}

/** Audio transcription failed. */
export class TranscriptionFailedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Audio transcription failed." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TRANSCRIPTION_FAILED";
    }
}

/** Translation is currently unavailable due to a temporary server-side lack of resources. */
export class TranslateReqQuotaExceededError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Translation is currently unavailable due to a temporary server-side lack of resources." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TRANSLATE_REQ_QUOTA_EXCEEDED";
    }
}

/** The provided TTL is invalid. */
export class TtlDaysInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided TTL is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TTL_DAYS_INVALID";
    }
}

/** Invalid media Time To Live was provided. */
export class TtlMediaInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid media Time To Live was provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TTL_MEDIA_INVALID";
    }
}

/** The specified TTL period is invalid. */
export class TtlPeriodInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified TTL period is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TTL_PERIOD_INVALID";
    }
}

/** No top peer type was provided. */
export class TypesEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "No top peer type was provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TYPES_EMPTY";
    }
}

/** `require_payment` cannot be *set* by users, only by monoforums: users must instead use the [inputPrivacyKeyNoPaidMessages](https://core.telegram.org/constructor/inputPrivacyKeyNoPaidMessages) privacy setting to remove a previously added exemption. */
export class UnsupportedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "`require_payment` cannot be *set* by users, only by monoforums: users must instead use the [inputPrivacyKeyNoPaidMessages](https://core.telegram.org/constructor/inputPrivacyKeyNoPaidMessages) privacy setting to remove a previously added exemption." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "UNSUPPORTED";
    }
}

/** Invalid until date provided. */
export class UntilDateInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid until date provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "UNTIL_DATE_INVALID";
    }
}

/** Invalid URL provided. */
export class UrlInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid URL provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "URL_INVALID";
    }
}

/** The specified usage limit is invalid. */
export class UsageLimitInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified usage limit is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USAGE_LIMIT_INVALID";
    }
}

/** You're not an admin. */
export class UserAdminInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You're not an admin." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_ADMIN_INVALID";
    }
}

/** You have already invited this user. */
export class UserAlreadyInvitedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You have already invited this user." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_ALREADY_INVITED";
    }
}

/** The user is already in the group. */
export class UserAlreadyParticipantError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The user is already in the group." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_ALREADY_PARTICIPANT";
    }
}

/** You're banned from sending messages in supergroups/channels. */
export class UserBannedInChannelError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You're banned from sending messages in supergroups/channels." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_BANNED_IN_CHANNEL";
    }
}

/** User blocked. */
export class UserBlockedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "User blocked." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_BLOCKED";
    }
}

/** Bots can only be admins in channels. */
export class UserBotError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Bots can only be admins in channels." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_BOT";
    }
}

/** User accounts must provide the `bot` method parameter when calling this method. If there is no such method parameter, this method can only be invoked by bot accounts. */
export class UserBotInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "User accounts must provide the `bot` method parameter when calling this method. If there is no such method parameter, this method can only be invoked by bot accounts." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_BOT_INVALID";
    }
}

/** This method can only be called by a bot. */
export class UserBotRequiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "This method can only be called by a bot." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_BOT_REQUIRED";
    }
}

/** One of the users you tried to add is already in too many channels/supergroups. */
export class UserChannelsTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "One of the users you tried to add is already in too many channels/supergroups." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_CHANNELS_TOO_MUCH";
    }
}

/** For channels.editAdmin: you've tried to edit the admin rights of the owner, but you're not the owner; for channels.leaveChannel: you can't leave this channel, because you're its creator. */
export class UserCreatorError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "For channels.editAdmin: you've tried to edit the admin rights of the owner, but you're not the owner; for channels.leaveChannel: you can't leave this channel, because you're its creator." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_CREATOR";
    }
}

/** Gifts are not available in the current region ([stars_gifts_enabled](https://core.telegram.org/api/config#stars-gifts-enabled) is equal to false). */
export class UserGiftUnavailableError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Gifts are not available in the current region ([stars_gifts_enabled](https://core.telegram.org/api/config#stars-gifts-enabled) is equal to false)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_GIFT_UNAVAILABLE";
    }
}

/** The provided user ID is invalid. */
export class UserIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided user ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_ID_INVALID";
    }
}

/** Invalid user provided. */
export class UserInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid user provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_INVALID";
    }
}

/** You were blocked by this user. */
export class UserIsBlockedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You were blocked by this user." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_IS_BLOCKED";
    }
}

/** Bots can't send messages to other bots. */
export class UserIsBotError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Bots can't send messages to other bots." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_IS_BOT";
    }
}

/** This user was kicked from this supergroup/channel. */
export class UserKickedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "This user was kicked from this supergroup/channel." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_KICKED";
    }
}

/** The provided user is not a mutual contact. */
export class UserNotMutualContactError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided user is not a mutual contact." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_NOT_MUTUAL_CONTACT";
    }
}

/** You're not a member of this supergroup/channel. */
export class UserNotParticipantError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You're not a member of this supergroup/channel." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_NOT_PARTICIPANT";
    }
}

/** Cannot generate a link to stories posted by a peer without a username. */
export class UserPublicMissingError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Cannot generate a link to stories posted by a peer without a username." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_PUBLIC_MISSING";
    }
}

/** The specified user volume is invalid. */
export class UserVolumeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified user volume is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_VOLUME_INVALID";
    }
}

/** The provided username is not valid. */
export class UsernameInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided username is not valid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USERNAME_INVALID";
    }
}

/** The username was not modified. */
export class UsernameNotModifiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The username was not modified." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USERNAME_NOT_MODIFIED";
    }
}

/** The provided username is not occupied. */
export class UsernameNotOccupiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided username is not occupied." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USERNAME_NOT_OCCUPIED";
    }
}

/** The provided username is already occupied. */
export class UsernameOccupiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The provided username is already occupied." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USERNAME_OCCUPIED";
    }
}

/** The specified username can be purchased on https://fragment.com. */
export class UsernamePurchaseAvailableError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified username can be purchased on https://fragment.com." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USERNAME_PURCHASE_AVAILABLE";
    }
}

/** The maximum number of active usernames was reached. */
export class UsernamesActiveTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The maximum number of active usernames was reached." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USERNAMES_ACTIVE_TOO_MUCH";
    }
}

/** You must have a profile picture to publish your geolocation. */
export class UserpicUploadRequiredError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You must have a profile picture to publish your geolocation." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USERPIC_UPLOAD_REQUIRED";
    }
}

/** Not enough users (to create a chat, for example). */
export class UsersTooFewError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Not enough users (to create a chat, for example)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USERS_TOO_FEW";
    }
}

/** The maximum number of users has been exceeded (to create a chat, for example). */
export class UsersTooMuchError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The maximum number of users has been exceeded (to create a chat, for example)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USERS_TOO_MUCH";
    }
}

/** The specified venue ID is invalid. */
export class VenueIdInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified venue ID is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "VENUE_ID_INVALID";
    }
}

/** The video's content type is invalid. */
export class VideoContentTypeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The video's content type is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "VIDEO_CONTENT_TYPE_INVALID";
    }
}

/** The specified video file is invalid. */
export class VideoFileInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified video file is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "VIDEO_FILE_INVALID";
    }
}

/** You cannot pause the video stream. */
export class VideoPauseForbiddenError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You cannot pause the video stream." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "VIDEO_PAUSE_FORBIDDEN";
    }
}

/** You cannot stop the video stream. */
export class VideoStopForbiddenError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You cannot stop the video stream." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "VIDEO_STOP_FORBIDDEN";
    }
}

/** The specified video title is empty. */
export class VideoTitleEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified video title is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "VIDEO_TITLE_EMPTY";
    }
}

/** This user's privacy settings forbid you from sending voice messages. */
export class VoiceMessagesForbiddenError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "This user's privacy settings forbid you from sending voice messages." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "VOICE_MESSAGES_FORBIDDEN";
    }
}

/** The specified wallpaper file is invalid. */
export class WallpaperFileInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified wallpaper file is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "WALLPAPER_FILE_INVALID";
    }
}

/** The specified wallpaper is invalid. */
export class WallpaperInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified wallpaper is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "WALLPAPER_INVALID";
    }
}

/** The specified wallpaper MIME type is invalid. */
export class WallpaperMimeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified wallpaper MIME type is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "WALLPAPER_MIME_INVALID";
    }
}

/** The specified wallpaper could not be found. */
export class WallpaperNotFoundError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified wallpaper could not be found." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "WALLPAPER_NOT_FOUND";
    }
}

/** WC convert URL invalid. */
export class WcConvertUrlInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "WC convert URL invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "WC_CONVERT_URL_INVALID";
    }
}

/** Invalid webdocument URL provided. */
export class WebdocumentInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid webdocument URL provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "WEBDOCUMENT_INVALID";
    }
}

/** Invalid webdocument mime type provided. */
export class WebdocumentMimeInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Invalid webdocument mime type provided." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "WEBDOCUMENT_MIME_INVALID";
    }
}

/** Webdocument is too big! */
export class WebdocumentSizeTooBigError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Webdocument is too big!" + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "WEBDOCUMENT_SIZE_TOO_BIG";
    }
}

/** The passed web document URL is empty. */
export class WebdocumentUrlEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The passed web document URL is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "WEBDOCUMENT_URL_EMPTY";
    }
}

/** The specified webdocument URL is invalid. */
export class WebdocumentUrlInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified webdocument URL is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "WEBDOCUMENT_URL_INVALID";
    }
}

/** Failure while fetching the webpage with cURL. */
export class WebpageCurlFailedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Failure while fetching the webpage with cURL." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "WEBPAGE_CURL_FAILED";
    }
}

/** Webpage media empty. */
export class WebpageMediaEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Webpage media empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "WEBPAGE_MEDIA_EMPTY";
    }
}

/** A preview for the specified webpage `url` could not be generated. */
export class WebpageNotFoundError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "A preview for the specified webpage `url` could not be generated." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "WEBPAGE_NOT_FOUND";
    }
}

/** The specified webpage `url` is invalid. */
export class WebpageUrlInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified webpage `url` is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "WEBPAGE_URL_INVALID";
    }
}

/** The specified web push authentication secret is invalid. */
export class WebpushAuthInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified web push authentication secret is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "WEBPUSH_AUTH_INVALID";
    }
}

/** The specified web push elliptic curve Diffie-Hellman public key is invalid. */
export class WebpushKeyInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified web push elliptic curve Diffie-Hellman public key is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "WEBPUSH_KEY_INVALID";
    }
}

/** The specified web push token is invalid. */
export class WebpushTokenInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified web push token is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "WEBPUSH_TOKEN_INVALID";
    }
}

/** You blocked this user. */
export class YouBlockedUserError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "You blocked this user." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "YOU_BLOCKED_USER";
    }
}

/** The specified method cannot be used by bots. */
export class BotMethodInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified method cannot be used by bots." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_METHOD_INVALID";
    }
}

/** The specified device model is empty. */
export class ConnectionDeviceModelEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified device model is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CONNECTION_DEVICE_MODEL_EMPTY";
    }
}

/** The specified language pack is empty. */
export class ConnectionLangPackInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified language pack is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CONNECTION_LANG_PACK_INVALID";
    }
}

/** Please initialize the connection using initConnection before making queries. */
export class ConnectionNotInitedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "Please initialize the connection using initConnection before making queries." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CONNECTION_NOT_INITED";
    }
}

/** The specified system version is empty. */
export class ConnectionSystemEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified system version is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CONNECTION_SYSTEM_EMPTY";
    }
}

/** The specified system language code is empty. */
export class ConnectionSystemLangCodeEmptyError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified system language code is empty." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CONNECTION_SYSTEM_LANG_CODE_EMPTY";
    }
}

/** The file currently being accessed is stored in DC %d, please re-send the query to that DC. */
export class FileMigrateError extends BadRequestError {
    public newDc: number;

    constructor(args: ErrorArgs) {
        const newDc = Number(args.capture || 0);
        const message = "The file currently being accessed is stored in DC " + newDc + ", please re-send the query to that DC." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.newDc = newDc;
    }
}

/** Part %d of the file is missing from storage. Try repeating the method call to resave the part. */
export class FilePartMissingError extends BadRequestError {
    public value: number;

    constructor(args: ErrorArgs) {
        const value = Number(args.capture || 0);
        const message = "Part " + value + " of the file is missing from storage. Try repeating the method call to resave the part." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.value = value;
    }
}

/** The specified TL constructor is invalid. */
export class InputConstructorInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified TL constructor is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INPUT_CONSTRUCTOR_INVALID";
    }
}

/** An error occurred while parsing the provided TL constructor. */
export class InputFetchErrorError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "An error occurred while parsing the provided TL constructor." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INPUT_FETCH_ERROR";
    }
}

/** An error occurred while parsing the provided TL constructor. */
export class InputFetchFailError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "An error occurred while parsing the provided TL constructor." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INPUT_FETCH_FAIL";
    }
}

/** The specified layer is invalid. */
export class InputLayerInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified layer is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INPUT_LAYER_INVALID";
    }
}

/** The specified method is invalid. */
export class InputMethodInvalidError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The specified method is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INPUT_METHOD_INVALID";
    }
}

/** The request payload is too long. */
export class InputRequestTooLongError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The request payload is too long." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INPUT_REQUEST_TOO_LONG";
    }
}

/** The current account is spamreported, you cannot execute this action, check @spambot for more info. */
export class PeerFloodError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The current account is spamreported, you cannot execute this action, check @spambot for more info." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PEER_FLOOD";
    }
}

/** The passed stickerset information is equal to the current information. */
export class StickersetNotModifiedError extends BadRequestError {
    constructor(args: ErrorArgs) {
        const message = "The passed stickerset information is equal to the current information." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKERSET_NOT_MODIFIED";
    }
}

/** The specified authorization key is not registered in the system (for example, a PFS temporary key has expired). */
export class AuthKeyUnregisteredError extends UnauthorizedError {
    constructor(args: ErrorArgs) {
        const message = "The specified authorization key is not registered in the system (for example, a PFS temporary key has expired)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "AUTH_KEY_UNREGISTERED";
    }
}

/** The specified auth key is invalid. */
export class AuthKeyInvalidError extends UnauthorizedError {
    constructor(args: ErrorArgs) {
        const message = "The specified auth key is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "AUTH_KEY_INVALID";
    }
}

/** The method is unavailable for temporary authorization keys, not bound to a permanent authorization key. */
export class AuthKeyPermEmptyError extends UnauthorizedError {
    constructor(args: ErrorArgs) {
        const message = "The method is unavailable for temporary authorization keys, not bound to a permanent authorization key." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "AUTH_KEY_PERM_EMPTY";
    }
}

/** The session has expired. */
export class SessionExpiredError extends UnauthorizedError {
    constructor(args: ErrorArgs) {
        const message = "The session has expired." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SESSION_EXPIRED";
    }
}

/** 2FA is enabled, use a password to login. */
export class SessionPasswordNeededError extends UnauthorizedError {
    constructor(args: ErrorArgs) {
        const message = "2FA is enabled, use a password to login." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SESSION_PASSWORD_NEEDED";
    }
}

/** The session was revoked by the user. */
export class SessionRevokedError extends UnauthorizedError {
    constructor(args: ErrorArgs) {
        const message = "The session was revoked by the user." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SESSION_REVOKED";
    }
}

/** The current account was deleted by the user. */
export class UserDeactivatedError extends UnauthorizedError {
    constructor(args: ErrorArgs) {
        const message = "The current account was deleted by the user." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_DEACTIVATED";
    }
}

/** The current account was deleted and banned by Telegram's antispam system. */
export class UserDeactivatedBanError extends UnauthorizedError {
    constructor(args: ErrorArgs) {
        const message = "The current account was deleted and banned by Telegram's antispam system." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_DEACTIVATED_BAN";
    }
}

/** This peer charges %d [Telegram Stars](https://core.telegram.org/api/stars) per message, but the `allow_paid_stars` was not set or its value is smaller than %d. */
export class AllowPaymentRequiredError extends ForbiddenError {
    public value: number;

    constructor(args: ErrorArgs) {
        const value = Number(args.capture || 0);
        const message = "This peer charges " + value + " [Telegram Stars](https://core.telegram.org/api/stars) per message, but the `allow_paid_stars` was not set or its value is smaller than " + value + "." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.value = value;
    }
}

/** Sorry, anonymous administrators cannot leave reactions or participate in polls. */
export class AnonymousReactionsDisabledError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "Sorry, anonymous administrators cannot leave reactions or participate in polls." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "ANONYMOUS_REACTIONS_DISABLED";
    }
}

/** The specified method *can* be used over a [business connection](https://core.telegram.org/api/bots/connected-business-bots) for some operations, but the specified query attempted an operation that is not allowed over a business connection. */
export class BotAccessForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "The specified method *can* be used over a [business connection](https://core.telegram.org/api/bots/connected-business-bots) for some operations, but the specified query attempted an operation that is not allowed over a business connection." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_ACCESS_FORBIDDEN";
    }
}

/** This bot cannot assign [verification icons](https://core.telegram.org/api/bots/verification). */
export class BotVerifierForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "This bot cannot assign [verification icons](https://core.telegram.org/api/bots/verification)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BOT_VERIFIER_FORBIDDEN";
    }
}

/** Channel poll voters and reactions cannot be fetched to prevent deanonymization. */
export class BroadcastForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "Channel poll voters and reactions cannot be fetched to prevent deanonymization." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BROADCAST_FORBIDDEN";
    }
}

/** channel/supergroup not available. */
export class ChannelPublicGroupNaError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "channel/supergroup not available." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHANNEL_PUBLIC_GROUP_NA";
    }
}

/** You cannot execute this action. */
export class ChatActionForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You cannot execute this action." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_ACTION_FORBIDDEN";
    }
}

/** You do not have the rights to do this. */
export class ChatAdminInviteRequiredError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You do not have the rights to do this." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_ADMIN_INVITE_REQUIRED";
    }
}

/** You join the discussion group before commenting, see [here &raquo;](https://core.telegram.org/api/discussion#requiring-users-to-join-the-group) for more info. */
export class ChatGuestSendForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You join the discussion group before commenting, see [here &raquo;](https://core.telegram.org/api/discussion#requiring-users-to-join-the-group) for more info." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_GUEST_SEND_FORBIDDEN";
    }
}

/** You can't send audio messages in this chat. */
export class ChatSendAudiosForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You can't send audio messages in this chat." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_SEND_AUDIOS_FORBIDDEN";
    }
}

/** You can't send documents in this chat. */
export class ChatSendDocsForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You can't send documents in this chat." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_SEND_DOCS_FORBIDDEN";
    }
}

/** You can't send a game to this chat. */
export class ChatSendGameForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You can't send a game to this chat." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_SEND_GAME_FORBIDDEN";
    }
}

/** You can't send gifs in this chat. */
export class ChatSendGifsForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You can't send gifs in this chat." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_SEND_GIFS_FORBIDDEN";
    }
}

/** You can't send media in this chat. */
export class ChatSendMediaForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You can't send media in this chat." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_SEND_MEDIA_FORBIDDEN";
    }
}

/** You can't send photos in this chat. */
export class ChatSendPhotosForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You can't send photos in this chat." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_SEND_PHOTOS_FORBIDDEN";
    }
}

/** You can't send non-media (text) messages in this chat. */
export class ChatSendPlainForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You can't send non-media (text) messages in this chat." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_SEND_PLAIN_FORBIDDEN";
    }
}

/** You can't send polls in this chat. */
export class ChatSendPollForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You can't send polls in this chat." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_SEND_POLL_FORBIDDEN";
    }
}

/** You can't send round videos to this chat. */
export class ChatSendRoundvideosForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You can't send round videos to this chat." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_SEND_ROUNDVIDEOS_FORBIDDEN";
    }
}

/** You can't send stickers in this chat. */
export class ChatSendStickersForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You can't send stickers in this chat." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_SEND_STICKERS_FORBIDDEN";
    }
}

/** You can't send videos in this chat. */
export class ChatSendVideosForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You can't send videos in this chat." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_SEND_VIDEOS_FORBIDDEN";
    }
}

/** You can't send voice recordings in this chat. */
export class ChatSendVoicesForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You can't send voice recordings in this chat." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_SEND_VOICES_FORBIDDEN";
    }
}

/** You can't send webpage previews to this chat. */
export class ChatSendWebpageForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You can't send webpage previews to this chat." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_SEND_WEBPAGE_FORBIDDEN";
    }
}

/** The specified user type is invalid. */
export class ChatTypeInvalidError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "The specified user type is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_TYPE_INVALID";
    }
}

/** You can't write in this chat. */
export class ChatWriteForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You can't write in this chat." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_WRITE_FORBIDDEN";
    }
}

/** Normal users can't edit invites that were created by bots. */
export class EditBotInviteForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "Normal users can't edit invites that were created by bots." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "EDIT_BOT_INVITE_FORBIDDEN";
    }
}

/** The groupcall has already started, you can join directly using [phone.joinGroupCall](https://core.telegram.org/method/phone.joinGroupCall). */
export class GroupcallAlreadyStartedError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "The groupcall has already started, you can join directly using [phone.joinGroupCall](https://core.telegram.org/method/phone.joinGroupCall)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "GROUPCALL_ALREADY_STARTED";
    }
}

/** Only the inline bot can edit message. */
export class InlineBotRequiredError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "Only the inline bot can edit message." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "INLINE_BOT_REQUIRED";
    }
}

/** Message author required. */
export class MessageAuthorRequiredError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "Message author required." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MESSAGE_AUTHOR_REQUIRED";
    }
}

/** You can't delete one of the messages you tried to delete, most likely because it is a service message. */
export class MessageDeleteForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You can't delete one of the messages you tried to delete, most likely because it is a service message." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MESSAGE_DELETE_FORBIDDEN";
    }
}

/** Cast a vote in the poll before calling this method. */
export class PollVoteRequiredError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "Cast a vote in the poll before calling this method." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "POLL_VOTE_REQUIRED";
    }
}

/** You need a [Telegram Premium subscription](https://core.telegram.org/api/premium) to send a message to this user. */
export class PrivacyPremiumRequiredError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You need a [Telegram Premium subscription](https://core.telegram.org/api/premium) to send a message to this user." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PRIVACY_PREMIUM_REQUIRED";
    }
}

/** You can only export group call invite links for public chats or channels. */
export class PublicChannelMissingError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You can only export group call invite links for public chats or channels." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PUBLIC_CHANNEL_MISSING";
    }
}

/** Your admin rights do not allow you to do this. */
export class RightForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "Your admin rights do not allow you to do this." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RIGHT_FORBIDDEN";
    }
}

/** You can't change your sensitive content settings. */
export class SensitiveChangeForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You can't change your sensitive content settings." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SENSITIVE_CHANGE_FORBIDDEN";
    }
}

/** You can't send this secret message because the other participant deleted their account. */
export class UserDeletedError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You can't send this secret message because the other participant deleted their account." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_DELETED";
    }
}

/** The user hasn't granted or has revoked the bot's access to change their emoji status using [bots.toggleUserEmojiStatusPermission](https://core.telegram.org/method/bots.toggleUserEmojiStatusPermission). */
export class UserPermissionDeniedError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "The user hasn't granted or has revoked the bot's access to change their emoji status using [bots.toggleUserEmojiStatusPermission](https://core.telegram.org/method/bots.toggleUserEmojiStatusPermission)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_PERMISSION_DENIED";
    }
}

/** The user's privacy settings do not allow you to do this. */
export class UserPrivacyRestrictedError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "The user's privacy settings do not allow you to do this." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_PRIVACY_RESTRICTED";
    }
}

/** You're spamreported, you can't create channels or chats. */
export class UserRestrictedError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You're spamreported, you can't create channels or chats." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USER_RESTRICTED";
    }
}

/** You cannot fetch the read date of this message because you have disallowed other users to do so for *your* messages; to fix, allow other users to see *your* exact last online date OR purchase a [Telegram Premium](https://core.telegram.org/api/premium) subscription. */
export class YourPrivacyRestrictedError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "You cannot fetch the read date of this message because you have disallowed other users to do so for *your* messages; to fix, allow other users to see *your* exact last online date OR purchase a [Telegram Premium](https://core.telegram.org/api/premium) subscription." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "YOUR_PRIVACY_RESTRICTED";
    }
}

/** This chat is not available to the current user. */
export class ChatForbiddenError extends ForbiddenError {
    constructor(args: ErrorArgs) {
        const message = "This chat is not available to the current user." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_FORBIDDEN";
    }
}

/** Please update the app to access the gift API. */
export class ApiGiftRestrictedUpdateAppError extends AuthKeyError {
    constructor(args: ErrorArgs) {
        const message = "Please update the app to access the gift API." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "API_GIFT_RESTRICTED_UPDATE_APP";
    }
}

/** The user is currently advertising a [Business Location](https://core.telegram.org/api/business#location), the location may only be changed (or removed) using [account.updateBusinessLocation &raquo;](https://core.telegram.org/method/account.updateBusinessLocation).  . */
export class BusinessAddressActiveError extends AuthKeyError {
    constructor(args: ErrorArgs) {
        const message = "The user is currently advertising a [Business Location](https://core.telegram.org/api/business#location), the location may only be changed (or removed) using [account.updateBusinessLocation &raquo;](https://core.telegram.org/method/account.updateBusinessLocation).  ." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "BUSINESS_ADDRESS_ACTIVE";
    }
}

/** The other side of the call does not support any of the VoIP protocols supported by the local client, as specified by the `protocol.layer` and `protocol.library_versions` fields. */
export class CallProtocolCompatLayerInvalidError extends AuthKeyError {
    constructor(args: ErrorArgs) {
        const message = "The other side of the call does not support any of the VoIP protocols supported by the local client, as specified by the `protocol.layer` and `protocol.library_versions` fields." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CALL_PROTOCOL_COMPAT_LAYER_INVALID";
    }
}

/** The client has to be updated in order to support [file references](https://core.telegram.org/api/file-references). */
export class FilerefUpgradeNeededError extends AuthKeyError {
    constructor(args: ErrorArgs) {
        const message = "The client has to be updated in order to support [file references](https://core.telegram.org/api/file-references)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FILEREF_UPGRADE_NEEDED";
    }
}

/** You can't change phone number right after logging in, please wait at least 24 hours. */
export class FreshChangePhoneForbiddenError extends AuthKeyError {
    constructor(args: ErrorArgs) {
        const message = "You can't change phone number right after logging in, please wait at least 24 hours." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FRESH_CHANGE_PHONE_FORBIDDEN";
    }
}

/** You can't logout other sessions if less than 24 hours have passed since you logged on the current session. */
export class FreshResetAuthorisationForbiddenError extends AuthKeyError {
    constructor(args: ErrorArgs) {
        const message = "You can't logout other sessions if less than 24 hours have passed since you logged on the current session." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FRESH_RESET_AUTHORISATION_FORBIDDEN";
    }
}

/** A detailed description of the error will be received separately as described [here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable). */
export class PaymentUnsupportedError extends AuthKeyError {
    constructor(args: ErrorArgs) {
        const message = "A detailed description of the error will be received separately as described [here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PAYMENT_UNSUPPORTED";
    }
}

/** You have tried logging in too many times. */
export class PhonePasswordFloodError extends AuthKeyError {
    constructor(args: ErrorArgs) {
        const message = "You have tried logging in too many times." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PHONE_PASSWORD_FLOOD";
    }
}

/** Precheckout failed, a detailed and localized description for the error will be emitted via an [updateServiceNotification as specified here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable). */
export class PrecheckoutFailedError extends AuthKeyError {
    constructor(args: ErrorArgs) {
        const message = "Precheckout failed, a detailed and localized description for the error will be emitted via an [updateServiceNotification as specified here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PRECHECKOUT_FAILED";
    }
}

/** You cannot currently purchase a Premium subscription. */
export class PremiumCurrentlyUnavailableError extends AuthKeyError {
    constructor(args: ErrorArgs) {
        const message = "You cannot currently purchase a Premium subscription." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PREMIUM_CURRENTLY_UNAVAILABLE";
    }
}

/** Import for this chat is already in progress, wait %d minutes before starting a new one. */
export class PreviousChatImportActiveWaitMinError extends AuthKeyError {
    public value: number;

    constructor(args: ErrorArgs) {
        const value = Number(args.capture || 0);
        const message = "Import for this chat is already in progress, wait " + value + " minutes before starting a new one." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.value = value;
    }
}

/** Returned when all available options for this type of number were already used (e.g. flash-call, then SMS, then this error might be returned to trigger a second resend). */
export class SendCodeUnavailableError extends AuthKeyError {
    constructor(args: ErrorArgs) {
        const message = "Returned when all available options for this type of number were already used (e.g. flash-call, then SMS, then this error might be returned to trigger a second resend)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SEND_CODE_UNAVAILABLE";
    }
}

/** A gift export is in progress, a detailed and localized description for the error will be emitted via an [updateServiceNotification as specified here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable). */
export class StargiftExportInProgressError extends AuthKeyError {
    constructor(args: ErrorArgs) {
        const message = "A gift export is in progress, a detailed and localized description for the error will be emitted via an [updateServiceNotification as specified here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARGIFT_EXPORT_IN_PROGRESS";
    }
}

/** The form amount has changed, please fetch the new form using [payments.getPaymentForm](https://core.telegram.org/method/payments.getPaymentForm) and restart the process. */
export class StarsFormAmountMismatchError extends AuthKeyError {
    constructor(args: ErrorArgs) {
        const message = "The form amount has changed, please fetch the new form using [payments.getPaymentForm](https://core.telegram.org/method/payments.getPaymentForm) and restart the process." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STARS_FORM_AMOUNT_MISMATCH";
    }
}

/** Provided stickerset can't be installed as group stickerset to prevent admin deanonymization. */
export class StickersetOwnerAnonymousError extends AuthKeyError {
    constructor(args: ErrorArgs) {
        const message = "Provided stickerset can't be installed as group stickerset to prevent admin deanonymization." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "STICKERSET_OWNER_ANONYMOUS";
    }
}

/** Translations are unavailable, a detailed and localized description for the error will be emitted via an [updateServiceNotification as specified here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable). */
export class TranslationsDisabledError extends AuthKeyError {
    constructor(args: ErrorArgs) {
        const message = "Translations are unavailable, a detailed and localized description for the error will be emitted via an [updateServiceNotification as specified here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TRANSLATIONS_DISABLED";
    }
}

/** Please update your client to login. */
export class UpdateAppToLoginError extends AuthKeyError {
    constructor(args: ErrorArgs) {
        const message = "Please update your client to login." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "UPDATE_APP_TO_LOGIN";
    }
}

/** You need to disable privacy settings for your profile picture in order to make your geolocation public. */
export class UserpicPrivacyRequiredError extends AuthKeyError {
    constructor(args: ErrorArgs) {
        const message = "You need to disable privacy settings for your profile picture in order to make your geolocation public." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "USERPIC_PRIVACY_REQUIRED";
    }
}

/** Concurrent usage of the current session from multiple connections was detected, the current session was invalidated by the server for security reasons! */
export class AuthKeyDuplicatedError extends AuthKeyError {
    constructor(args: ErrorArgs) {
        const message = "Concurrent usage of the current session from multiple connections was detected, the current session was invalidated by the server for security reasons!" + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "AUTH_KEY_DUPLICATED";
    }
}

/** Since this account is active and protected by a 2FA password, we will delete it in 1 week for security purposes. You can cancel this process at any time, you'll be able to reset your account in %d seconds. */
export class TwoFaConfirmWaitError extends FloodError {
    public value: number;

    constructor(args: ErrorArgs) {
        const value = Number(args.capture || 0);
        const message = "Since this account is active and protected by a 2FA password, we will delete it in 1 week for security purposes. You can cancel this process at any time, you'll be able to reset your account in " + value + " seconds." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.value = value;
    }
}

/** Please wait %d seconds before repeating the action. */
export class FloodWaitError extends FloodError {
    public seconds: number;

    constructor(args: ErrorArgs) {
        const seconds = Number(args.capture || 0);
        const message = "Please wait " + seconds + " seconds before repeating the action." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.seconds = seconds;
    }
}

/** The current account is [frozen](https://core.telegram.org/api/auth#frozen-accounts), and thus cannot execute the specified action. */
export class FrozenMethodError extends FrozenError {
    constructor(args: ErrorArgs) {
        const message = "The current account is [frozen](https://core.telegram.org/api/auth#frozen-accounts), and thus cannot execute the specified action." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "FROZEN_METHOD_INVALID";
    }
}

/** You already have a premium subscription active until unixtime %d . */
export class PremiumSubActiveUntilError extends FloodError {
    public value: number;

    constructor(args: ErrorArgs) {
        const value = Number(args.capture || 0);
        const message = "You already have a premium subscription active until unixtime " + value + " ." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.value = value;
    }
}

/** Slowmode is enabled in this chat: wait %d seconds before sending another message to this chat. */
export class SlowModeWaitError extends FloodError {
    public seconds: number;

    constructor(args: ErrorArgs) {
        const seconds = Number(args.capture || 0);
        const message = "Slowmode is enabled in this chat: wait " + seconds + " seconds before sending another message to this chat." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.seconds = seconds;
    }
}

/** Sorry, for security reasons, you will be able to begin downloading your data in %d seconds. We have notified all your devices about the export request to make sure it's authorized and to give you time to react if it's not. */
export class TakeoutInitDelayError extends FloodError {
    public seconds: number;

    constructor(args: ErrorArgs) {
        const seconds = Number(args.capture || 0);
        const message = "Sorry, for security reasons, you will be able to begin downloading your data in " + seconds + " seconds. We have notified all your devices about the export request to make sure it's authorized and to give you time to react if it's not." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.seconds = seconds;
    }
}

/** Internal error, please repeat the method call. */
export class AuthKeyUnsynchronizedError extends ServerError {
    constructor(args: ErrorArgs) {
        const message = "Internal error, please repeat the method call." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "AUTH_KEY_UNSYNCHRONIZED";
    }
}

/** Internal error (debug info %d), please repeat the method call. */
export class AuthRestartError extends ServerError {
    public value: number;

    constructor(args: ErrorArgs) {
        const value = Number(args.capture || 0);
        const message = "Internal error (debug info " + value + "), please repeat the method call." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.value = value;
    }
}

/** A server-side timeout occurred while reuploading the file to the CDN DC. */
export class CdnUploadTimeoutError extends ServerError {
    constructor(args: ErrorArgs) {
        const message = "A server-side timeout occurred while reuploading the file to the CDN DC." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CDN_UPLOAD_TIMEOUT";
    }
}

/** Failure while generating the chat ID. */
export class ChatIdGenerateFailedError extends ServerError {
    constructor(args: ErrorArgs) {
        const message = "Failure while generating the chat ID." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "CHAT_ID_GENERATE_FAILED";
    }
}

/** Channel internal replication issues, try again later (treat this like an RPC_CALL_FAIL). */
export class PersistentTimestampOutdatedError extends ServerError {
    constructor(args: ErrorArgs) {
        const message = "Channel internal replication issues, try again later (treat this like an RPC_CALL_FAIL)." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "PERSISTENT_TIMESTAMP_OUTDATED";
    }
}

/** You provided a random ID that was already used. */
export class RandomIdDuplicateError extends ServerError {
    constructor(args: ErrorArgs) {
        const message = "You provided a random ID that was already used." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "RANDOM_ID_DUPLICATE";
    }
}

/** The specified media is invalid. */
export class SendMediaInvalidError extends ServerError {
    constructor(args: ErrorArgs) {
        const message = "The specified media is invalid." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SEND_MEDIA_INVALID";
    }
}

/** Failure while signing in. */
export class SignInFailedError extends ServerError {
    constructor(args: ErrorArgs) {
        const message = "Failure while signing in." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "SIGN_IN_FAILED";
    }
}

/** Translation failed, please try again later. */
export class TranslateReqFailedError extends ServerError {
    constructor(args: ErrorArgs) {
        const message = "Translation failed, please try again later." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TRANSLATE_REQ_FAILED";
    }
}

/** A timeout occurred while translating the specified text. */
export class TranslationTimeoutError extends ServerError {
    constructor(args: ErrorArgs) {
        const message = "A timeout occurred while translating the specified text." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "TRANSLATION_TIMEOUT";
    }
}

/** Timeout while fetching data. */
export class TimeoutError extends TimedOutError {
    constructor(args: ErrorArgs) {
        const message = "Timeout while fetching data." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "Timeout";
    }
}

/** Spent too much time waiting for a previous query in the invokeAfterMsg request queue, aborting! */
export class MsgWaitTimeoutError extends TimedOutError {
    constructor(args: ErrorArgs) {
        const message = "Spent too much time waiting for a previous query in the invokeAfterMsg request queue, aborting!" + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.errorMessage = "MSG_WAIT_TIMEOUT";
    }
}

/** A wait of %d seconds is required in the test servers before repeating the action. */
export class FloodTestPhoneWaitError extends FloodError {
    public seconds: number;

    constructor(args: ErrorArgs) {
        const seconds = Number(args.capture || 0);
        const message = "A wait of " + seconds + " seconds is required in the test servers before repeating the action." + RPCError._fmtRequest(args.request);
        super(message, args.request);
        this.message = message;
        this.seconds = seconds;
    }
}


export const rpcErrorsDict: Map<string, any> = new Map<string, any>([
    ["ABOUT_TOO_LONG", AboutTooLongError],
    ["ACCESS_TOKEN_EXPIRED", AccessTokenExpiredError],
    ["ACCESS_TOKEN_INVALID", AccessTokenInvalidError],
    ["AD_EXPIRED", AdExpiredError],
    ["ADDRESS_INVALID", AddressInvalidError],
    ["ADMIN_ID_INVALID", AdminIdInvalidError],
    ["ADMIN_RANK_EMOJI_NOT_ALLOWED", AdminRankEmojiNotAllowedError],
    ["ADMIN_RANK_INVALID", AdminRankInvalidError],
    ["ADMIN_RIGHTS_EMPTY", AdminRightsEmptyError],
    ["ADMINS_TOO_MUCH", AdminsTooMuchError],
    ["ALBUM_PHOTOS_TOO_MANY", AlbumPhotosTooManyError],
    ["API_ID_INVALID", ApiIdInvalidError],
    ["API_ID_PUBLISHED_FLOOD", ApiIdPublishedFloodError],
    ["ARTICLE_TITLE_EMPTY", ArticleTitleEmptyError],
    ["AUDIO_CONTENT_URL_EMPTY", AudioContentUrlEmptyError],
    ["AUDIO_TITLE_EMPTY", AudioTitleEmptyError],
    ["AUTH_BYTES_INVALID", AuthBytesInvalidError],
    ["AUTH_TOKEN_ALREADY_ACCEPTED", AuthTokenAlreadyAcceptedError],
    ["AUTH_TOKEN_EXCEPTION", AuthTokenExceptionError],
    ["AUTH_TOKEN_EXPIRED", AuthTokenExpiredError],
    ["AUTH_TOKEN_INVALID", AuthTokenInvalidError],
    ["AUTH_TOKEN_INVALIDX", AuthTokenInvalidxError],
    ["AUTOARCHIVE_NOT_AVAILABLE", AutoarchiveNotAvailableError],
    ["BALANCE_TOO_LOW", BalanceTooLowError],
    ["BANK_CARD_NUMBER_INVALID", BankCardNumberInvalidError],
    ["BANNED_RIGHTS_INVALID", BannedRightsInvalidError],
    ["BIRTHDAY_INVALID", BirthdayInvalidError],
    ["BOOST_NOT_MODIFIED", BoostNotModifiedError],
    ["BOOST_PEER_INVALID", BoostPeerInvalidError],
    ["BOOSTS_EMPTY", BoostsEmptyError],
    ["BOOSTS_REQUIRED", BoostsRequiredError],
    ["BOT_ALREADY_DISABLED", BotAlreadyDisabledError],
    ["BOT_APP_BOT_INVALID", BotAppBotInvalidError],
    ["BOT_APP_INVALID", BotAppInvalidError],
    ["BOT_APP_SHORTNAME_INVALID", BotAppShortnameInvalidError],
    ["BOT_BUSINESS_MISSING", BotBusinessMissingError],
    ["BOT_CHANNELS_NA", BotChannelsNaError],
    ["BOT_COMMAND_DESCRIPTION_INVALID", BotCommandDescriptionInvalidError],
    ["BOT_COMMAND_INVALID", BotCommandInvalidError],
    ["BOT_DOMAIN_INVALID", BotDomainInvalidError],
    ["BOT_FALLBACK_UNSUPPORTED", BotFallbackUnsupportedError],
    ["BOT_GAMES_DISABLED", BotGamesDisabledError],
    ["BOT_GROUPS_BLOCKED", BotGroupsBlockedError],
    ["BOT_INLINE_DISABLED", BotInlineDisabledError],
    ["BOT_INVALID", BotInvalidError],
    ["BOT_INVOICE_INVALID", BotInvoiceInvalidError],
    ["BOT_NOT_CONNECTED_YET", BotNotConnectedYetError],
    ["BOT_ONESIDE_NOT_AVAIL", BotOnesideNotAvailError],
    ["BOT_PAYMENTS_DISABLED", BotPaymentsDisabledError],
    ["BOT_RESPONSE_TIMEOUT", BotResponseTimeoutError],
    ["BOT_SCORE_NOT_MODIFIED", BotScoreNotModifiedError],
    ["BOT_WEBVIEW_DISABLED", BotWebviewDisabledError],
    ["BOTS_TOO_MUCH", BotsTooMuchError],
    ["BROADCAST_ID_INVALID", BroadcastIdInvalidError],
    ["BROADCAST_PUBLIC_VOTERS_FORBIDDEN", BroadcastPublicVotersForbiddenError],
    ["BROADCAST_REQUIRED", BroadcastRequiredError],
    ["BUSINESS_CONNECTION_INVALID", BusinessConnectionInvalidError],
    ["BUSINESS_CONNECTION_NOT_ALLOWED", BusinessConnectionNotAllowedError],
    ["BUSINESS_PEER_INVALID", BusinessPeerInvalidError],
    ["BUSINESS_PEER_USAGE_MISSING", BusinessPeerUsageMissingError],
    ["BUSINESS_RECIPIENTS_EMPTY", BusinessRecipientsEmptyError],
    ["BUSINESS_WORK_HOURS_EMPTY", BusinessWorkHoursEmptyError],
    ["BUSINESS_WORK_HOURS_PERIOD_INVALID", BusinessWorkHoursPeriodInvalidError],
    ["BUTTON_COPY_TEXT_INVALID", ButtonCopyTextInvalidError],
    ["BUTTON_DATA_INVALID", ButtonDataInvalidError],
    ["BUTTON_ID_INVALID", ButtonIdInvalidError],
    ["BUTTON_INVALID", ButtonInvalidError],
    ["BUTTON_POS_INVALID", ButtonPosInvalidError],
    ["BUTTON_TEXT_INVALID", ButtonTextInvalidError],
    ["BUTTON_TYPE_INVALID", ButtonTypeInvalidError],
    ["BUTTON_URL_INVALID", ButtonUrlInvalidError],
    ["BUTTON_USER_INVALID", ButtonUserInvalidError],
    ["BUTTON_USER_PRIVACY_RESTRICTED", ButtonUserPrivacyRestrictedError],
    ["CALL_ALREADY_ACCEPTED", CallAlreadyAcceptedError],
    ["CALL_ALREADY_DECLINED", CallAlreadyDeclinedError],
    ["CALL_OCCUPY_FAILED", CallOccupyFailedError],
    ["CALL_PEER_INVALID", CallPeerInvalidError],
    ["CALL_PROTOCOL_FLAGS_INVALID", CallProtocolFlagsInvalidError],
    ["CALL_PROTOCOL_LAYER_INVALID", CallProtocolLayerInvalidError],
    ["CDN_METHOD_INVALID", CdnMethodInvalidError],
    ["CHANNEL_FORUM_MISSING", ChannelForumMissingError],
    ["CHANNEL_ID_INVALID", ChannelIdInvalidError],
    ["CHANNEL_INVALID", ChannelInvalidError],
    ["CHANNEL_MONOFORUM_UNSUPPORTED", ChannelMonoforumUnsupportedError],
    ["CHANNEL_PARICIPANT_MISSING", ChannelParicipantMissingError],
    ["CHANNEL_PRIVATE", ChannelPrivateError],
    ["CHANNEL_TOO_BIG", ChannelTooBigError],
    ["CHANNEL_TOO_LARGE", ChannelTooLargeError],
    ["CHANNELS_ADMIN_LOCATED_TOO_MUCH", ChannelsAdminLocatedTooMuchError],
    ["CHANNELS_ADMIN_PUBLIC_TOO_MUCH", ChannelsAdminPublicTooMuchError],
    ["CHANNELS_TOO_MUCH", ChannelsTooMuchError],
    ["CHARGE_ALREADY_REFUNDED", ChargeAlreadyRefundedError],
    ["CHARGE_ID_EMPTY", ChargeIdEmptyError],
    ["CHARGE_ID_INVALID", ChargeIdInvalidError],
    ["CHAT_ABOUT_NOT_MODIFIED", ChatAboutNotModifiedError],
    ["CHAT_ABOUT_TOO_LONG", ChatAboutTooLongError],
    ["CHAT_ADMIN_REQUIRED", ChatAdminRequiredError],
    ["CHAT_DISCUSSION_UNALLOWED", ChatDiscussionUnallowedError],
    ["CHAT_FORWARDS_RESTRICTED", ChatForwardsRestrictedError],
    ["CHAT_ID_EMPTY", ChatIdEmptyError],
    ["CHAT_ID_INVALID", ChatIdInvalidError],
    ["CHAT_INVALID", ChatInvalidError],
    ["CHAT_INVITE_PERMANENT", ChatInvitePermanentError],
    ["CHAT_LINK_EXISTS", ChatLinkExistsError],
    ["CHAT_MEMBER_ADD_FAILED", ChatMemberAddFailedError],
    ["CHAT_NOT_MODIFIED", ChatNotModifiedError],
    ["CHAT_PUBLIC_REQUIRED", ChatPublicRequiredError],
    ["CHAT_RESTRICTED", ChatRestrictedError],
    ["CHAT_REVOKE_DATE_UNSUPPORTED", ChatRevokeDateUnsupportedError],
    ["CHAT_SEND_INLINE_FORBIDDEN", ChatSendInlineForbiddenError],
    ["CHAT_TITLE_EMPTY", ChatTitleEmptyError],
    ["CHAT_TOO_BIG", ChatTooBigError],
    ["CHATLINK_SLUG_EMPTY", ChatlinkSlugEmptyError],
    ["CHATLINK_SLUG_EXPIRED", ChatlinkSlugExpiredError],
    ["CHATLINKS_TOO_MUCH", ChatlinksTooMuchError],
    ["CHATLIST_EXCLUDE_INVALID", ChatlistExcludeInvalidError],
    ["CHATLISTS_TOO_MUCH", ChatlistsTooMuchError],
    ["CODE_EMPTY", CodeEmptyError],
    ["CODE_HASH_INVALID", CodeHashInvalidError],
    ["CODE_INVALID", CodeInvalidError],
    ["COLLECTIBLE_INVALID", CollectibleInvalidError],
    ["COLLECTIBLE_NOT_FOUND", CollectibleNotFoundError],
    ["COLOR_INVALID", ColorInvalidError],
    ["CONNECTION_API_ID_INVALID", ConnectionApiIdInvalidError],
    ["CONNECTION_APP_VERSION_EMPTY", ConnectionAppVersionEmptyError],
    ["CONNECTION_ID_INVALID", ConnectionIdInvalidError],
    ["CONNECTION_LAYER_INVALID", ConnectionLayerInvalidError],
    ["CONTACT_ADD_MISSING", ContactAddMissingError],
    ["CONTACT_ID_INVALID", ContactIdInvalidError],
    ["CONTACT_MISSING", ContactMissingError],
    ["CONTACT_NAME_EMPTY", ContactNameEmptyError],
    ["CONTACT_REQ_MISSING", ContactReqMissingError],
    ["CREATE_CALL_FAILED", CreateCallFailedError],
    ["CURRENCY_TOTAL_AMOUNT_INVALID", CurrencyTotalAmountInvalidError],
    ["CUSTOM_REACTIONS_TOO_MANY", CustomReactionsTooManyError],
    ["DATA_HASH_SIZE_INVALID", DataHashSizeInvalidError],
    ["DATA_INVALID", DataInvalidError],
    ["DATA_JSON_INVALID", DataJsonInvalidError],
    ["DATA_TOO_LONG", DataTooLongError],
    ["DATE_EMPTY", DateEmptyError],
    ["DC_ID_INVALID", DcIdInvalidError],
    ["DH_G_A_INVALID", DhGAInvalidError],
    ["DOCUMENT_INVALID", DocumentInvalidError],
    ["EFFECT_ID_INVALID", EffectIdInvalidError],
    ["EMAIL_HASH_EXPIRED", EmailHashExpiredError],
    ["EMAIL_INVALID", EmailInvalidError],
    ["EMAIL_NOT_ALLOWED", EmailNotAllowedError],
    ["EMAIL_NOT_SETUP", EmailNotSetupError],
    ["EMAIL_UNCONFIRMED", EmailUnconfirmedError],
    ["EMAIL_VERIFY_EXPIRED", EmailVerifyExpiredError],
    ["EMOJI_INVALID", EmojiInvalidError],
    ["EMOJI_MARKUP_INVALID", EmojiMarkupInvalidError],
    ["EMOJI_NOT_MODIFIED", EmojiNotModifiedError],
    ["EMOTICON_EMPTY", EmoticonEmptyError],
    ["EMOTICON_INVALID", EmoticonInvalidError],
    ["EMOTICON_STICKERPACK_MISSING", EmoticonStickerpackMissingError],
    ["ENCRYPTED_MESSAGE_INVALID", EncryptedMessageInvalidError],
    ["ENCRYPTION_ALREADY_ACCEPTED", EncryptionAlreadyAcceptedError],
    ["ENCRYPTION_ALREADY_DECLINED", EncryptionAlreadyDeclinedError],
    ["ENCRYPTION_DECLINED", EncryptionDeclinedError],
    ["ENCRYPTION_ID_INVALID", EncryptionIdInvalidError],
    ["ENTITIES_TOO_LONG", EntitiesTooLongError],
    ["ENTITY_BOUNDS_INVALID", EntityBoundsInvalidError],
    ["ENTITY_MENTION_USER_INVALID", EntityMentionUserInvalidError],
    ["ERROR_TEXT_EMPTY", ErrorTextEmptyError],
    ["EXPIRE_DATE_INVALID", ExpireDateInvalidError],
    ["EXPIRES_AT_INVALID", ExpiresAtInvalidError],
    ["EXPORT_CARD_INVALID", ExportCardInvalidError],
    ["EXTENDED_MEDIA_AMOUNT_INVALID", ExtendedMediaAmountInvalidError],
    ["EXTENDED_MEDIA_INVALID", ExtendedMediaInvalidError],
    ["EXTERNAL_URL_INVALID", ExternalUrlInvalidError],
    ["FILE_CONTENT_TYPE_INVALID", FileContentTypeInvalidError],
    ["FILE_EMTPY", FileEmtpyError],
    ["FILE_ID_INVALID", FileIdInvalidError],
    ["FILE_PART_EMPTY", FilePartEmptyError],
    ["FILE_PART_INVALID", FilePartInvalidError],
    ["FILE_PART_LENGTH_INVALID", FilePartLengthInvalidError],
    ["FILE_PART_SIZE_CHANGED", FilePartSizeChangedError],
    ["FILE_PART_SIZE_INVALID", FilePartSizeInvalidError],
    ["FILE_PART_TOO_BIG", FilePartTooBigError],
    ["FILE_PART_TOO_SMALL", FilePartTooSmallError],
    ["FILE_PARTS_INVALID", FilePartsInvalidError],
    ["FILE_REFERENCE_EXPIRED", FileReferenceExpiredError],
    ["FILE_REFERENCE_INVALID", FileReferenceInvalidError],
    ["FILE_REFERENCE_EMPTY", FileReferenceEmptyError],
    ["FILE_TITLE_EMPTY", FileTitleEmptyError],
    ["FILE_TOKEN_INVALID", FileTokenInvalidError],
    ["FILTER_ID_INVALID", FilterIdInvalidError],
    ["FILTER_INCLUDE_EMPTY", FilterIncludeEmptyError],
    ["FILTER_NOT_SUPPORTED", FilterNotSupportedError],
    ["FILTER_TITLE_EMPTY", FilterTitleEmptyError],
    ["FIRSTNAME_INVALID", FirstnameInvalidError],
    ["FOLDER_ID_EMPTY", FolderIdEmptyError],
    ["FOLDER_ID_INVALID", FolderIdInvalidError],
    ["FORM_EXPIRED", FormExpiredError],
    ["FORM_ID_EMPTY", FormIdEmptyError],
    ["FORM_SUBMIT_DUPLICATE", FormSubmitDuplicateError],
    ["FORM_UNSUPPORTED", FormUnsupportedError],
    ["FORUM_ENABLED", ForumEnabledError],
    ["FRESH_CHANGE_ADMINS_FORBIDDEN", FreshChangeAdminsForbiddenError],
    ["FROM_MESSAGE_BOT_DISABLED", FromMessageBotDisabledError],
    ["FROM_PEER_INVALID", FromPeerInvalidError],
    ["FROZEN_PARTICIPANT_MISSING", FrozenParticipantError],
    ["GAME_BOT_INVALID", GameBotInvalidError],
    ["GENERAL_MODIFY_ICON_FORBIDDEN", GeneralModifyIconForbiddenError],
    ["GEO_POINT_INVALID", GeoPointInvalidError],
    ["GIF_CONTENT_TYPE_INVALID", GifContentTypeInvalidError],
    ["GIF_ID_INVALID", GifIdInvalidError],
    ["GIFT_MONTHS_INVALID", GiftMonthsInvalidError],
    ["GIFT_SLUG_EXPIRED", GiftSlugExpiredError],
    ["GIFT_SLUG_INVALID", GiftSlugInvalidError],
    ["GIFT_STARS_INVALID", GiftStarsInvalidError],
    ["GRAPH_EXPIRED_RELOAD", GraphExpiredReloadError],
    ["GRAPH_INVALID_RELOAD", GraphInvalidReloadError],
    ["GRAPH_OUTDATED_RELOAD", GraphOutdatedReloadError],
    ["GROUPCALL_ALREADY_DISCARDED", GroupcallAlreadyDiscardedError],
    ["GROUPCALL_FORBIDDEN", GroupcallForbiddenError],
    ["GROUPCALL_INVALID", GroupcallInvalidError],
    ["GROUPCALL_JOIN_MISSING", GroupcallJoinMissingError],
    ["GROUPCALL_NOT_MODIFIED", GroupcallNotModifiedError],
    ["GROUPCALL_SSRC_DUPLICATE_MUCH", GroupcallSsrcDuplicateMuchError],
    ["GROUPED_MEDIA_INVALID", GroupedMediaInvalidError],
    ["HASH_INVALID", HashInvalidError],
    ["HASH_SIZE_INVALID", HashSizeInvalidError],
    ["HASHTAG_INVALID", HashtagInvalidError],
    ["HIDE_REQUESTER_MISSING", HideRequesterMissingError],
    ["ID_EXPIRED", IdExpiredError],
    ["ID_INVALID", IdInvalidError],
    ["IMAGE_PROCESS_FAILED", ImageProcessFailedError],
    ["IMPORT_FILE_INVALID", ImportFileInvalidError],
    ["IMPORT_FORMAT_DATE_INVALID", ImportFormatDateInvalidError],
    ["IMPORT_FORMAT_UNRECOGNIZED", ImportFormatUnrecognizedError],
    ["IMPORT_ID_INVALID", ImportIdInvalidError],
    ["IMPORT_TOKEN_INVALID", ImportTokenInvalidError],
    ["INLINE_RESULT_EXPIRED", InlineResultExpiredError],
    ["INPUT_CHATLIST_INVALID", InputChatlistInvalidError],
    ["INPUT_FILE_INVALID", InputFileInvalidError],
    ["INPUT_FILTER_INVALID", InputFilterInvalidError],
    ["INPUT_PEERS_EMPTY", InputPeersEmptyError],
    ["INPUT_PURPOSE_INVALID", InputPurposeInvalidError],
    ["INPUT_TEXT_EMPTY", InputTextEmptyError],
    ["INPUT_TEXT_TOO_LONG", InputTextTooLongError],
    ["INPUT_USER_DEACTIVATED", InputUserDeactivatedError],
    ["INVITE_FORBIDDEN_WITH_JOINAS", InviteForbiddenWithJoinasError],
    ["INVITE_HASH_EMPTY", InviteHashEmptyError],
    ["INVITE_HASH_EXPIRED", InviteHashExpiredError],
    ["INVITE_HASH_INVALID", InviteHashInvalidError],
    ["INVITE_REQUEST_SENT", InviteRequestSentError],
    ["INVITE_REVOKED_MISSING", InviteRevokedMissingError],
    ["INVITE_SLUG_EMPTY", InviteSlugEmptyError],
    ["INVITE_SLUG_EXPIRED", InviteSlugExpiredError],
    ["INVITE_SLUG_INVALID", InviteSlugInvalidError],
    ["INVITES_TOO_MUCH", InvitesTooMuchError],
    ["INVOICE_INVALID", InvoiceInvalidError],
    ["INVOICE_PAYLOAD_INVALID", InvoicePayloadInvalidError],
    ["JOIN_AS_PEER_INVALID", JoinAsPeerInvalidError],
    ["LANG_CODE_INVALID", LangCodeInvalidError],
    ["LANG_CODE_NOT_SUPPORTED", LangCodeNotSupportedError],
    ["LANG_PACK_INVALID", LangPackInvalidError],
    ["LANGUAGE_INVALID", LanguageInvalidError],
    ["LASTNAME_INVALID", LastnameInvalidError],
    ["LIMIT_INVALID", LimitInvalidError],
    ["LINK_NOT_MODIFIED", LinkNotModifiedError],
    ["LOCATION_INVALID", LocationInvalidError],
    ["MAX_DATE_INVALID", MaxDateInvalidError],
    ["MAX_ID_INVALID", MaxIdInvalidError],
    ["MAX_QTS_INVALID", MaxQtsInvalidError],
    ["MD5_CHECKSUM_INVALID", Md5ChecksumInvalidError],
    ["MEDIA_ALREADY_PAID", MediaAlreadyPaidError],
    ["MEDIA_CAPTION_TOO_LONG", MediaCaptionTooLongError],
    ["MEDIA_EMPTY", MediaEmptyError],
    ["MEDIA_FILE_INVALID", MediaFileInvalidError],
    ["MEDIA_GROUPED_INVALID", MediaGroupedInvalidError],
    ["MEDIA_INVALID", MediaInvalidError],
    ["MEDIA_NEW_INVALID", MediaNewInvalidError],
    ["MEDIA_PREV_INVALID", MediaPrevInvalidError],
    ["MEDIA_TTL_INVALID", MediaTtlInvalidError],
    ["MEDIA_TYPE_INVALID", MediaTypeInvalidError],
    ["MEDIA_VIDEO_STORY_MISSING", MediaVideoStoryMissingError],
    ["MEGAGROUP_GEO_REQUIRED", MegagroupGeoRequiredError],
    ["MEGAGROUP_ID_INVALID", MegagroupIdInvalidError],
    ["MEGAGROUP_PREHISTORY_HIDDEN", MegagroupPrehistoryHiddenError],
    ["MEGAGROUP_REQUIRED", MegagroupRequiredError],
    ["MESSAGE_EDIT_TIME_EXPIRED", MessageEditTimeExpiredError],
    ["MESSAGE_EMPTY", MessageEmptyError],
    ["MESSAGE_ID_INVALID", MessageIdInvalidError],
    ["MESSAGE_IDS_EMPTY", MessageIdsEmptyError],
    ["MESSAGE_NOT_MODIFIED", MessageNotModifiedError],
    ["MESSAGE_NOT_READ_YET", MessageNotReadYetError],
    ["MESSAGE_POLL_CLOSED", MessagePollClosedError],
    ["MESSAGE_TOO_LONG", MessageTooLongError],
    ["MESSAGE_TOO_OLD", MessageTooOldError],
    ["METHOD_INVALID", MethodInvalidError],
    ["MIN_DATE_INVALID", MinDateInvalidError],
    ["MONTH_INVALID", MonthInvalidError],
    ["MSG_ID_INVALID", MsgIdInvalidError],
    ["MSG_TOO_OLD", MsgTooOldError],
    ["MSG_VOICE_MISSING", MsgVoiceMissingError],
    ["MSG_WAIT_FAILED", MsgWaitError],
    ["MULTI_MEDIA_TOO_LONG", MultiMediaTooLongError],
    ["NEW_SALT_INVALID", NewSaltInvalidError],
    ["NEW_SETTINGS_EMPTY", NewSettingsEmptyError],
    ["NEW_SETTINGS_INVALID", NewSettingsInvalidError],
    ["NEXT_OFFSET_INVALID", NextOffsetInvalidError],
    ["NO_PAYMENT_NEEDED", NoPaymentNeededError],
    ["NOGENERAL_HIDE_FORBIDDEN", NogeneralHideForbiddenError],
    ["NOT_ELIGIBLE", NotEligibleError],
    ["NOT_JOINED", NotJoinedError],
    ["OFFSET_INVALID", OffsetInvalidError],
    ["OFFSET_PEER_ID_INVALID", OffsetPeerIdInvalidError],
    ["OPTION_INVALID", OptionInvalidError],
    ["OPTIONS_TOO_MUCH", OptionsTooMuchError],
    ["ORDER_INVALID", OrderInvalidError],
    ["PACK_SHORT_NAME_INVALID", PackShortNameInvalidError],
    ["PACK_SHORT_NAME_OCCUPIED", PackShortNameOccupiedError],
    ["PACK_TITLE_INVALID", PackTitleInvalidError],
    ["PACK_TYPE_INVALID", PackTypeInvalidError],
    ["PARENT_PEER_INVALID", ParentPeerInvalidError],
    ["PARTICIPANT_ID_INVALID", ParticipantIdInvalidError],
    ["PARTICIPANT_JOIN_MISSING", ParticipantJoinMissingError],
    ["PARTICIPANT_VERSION_OUTDATED", ParticipantVersionOutdatedError],
    ["PARTICIPANTS_TOO_FEW", ParticipantsTooFewError],
    ["PASSWORD_EMPTY", PasswordEmptyError],
    ["PASSWORD_HASH_INVALID", PasswordHashInvalidError],
    ["PASSWORD_MISSING", PasswordMissingError],
    ["PASSWORD_RECOVERY_EXPIRED", PasswordRecoveryExpiredError],
    ["PASSWORD_RECOVERY_NA", PasswordRecoveryNaError],
    ["PASSWORD_REQUIRED", PasswordRequiredError],
    ["PAYMENT_CREDENTIALS_INVALID", PaymentCredentialsInvalidError],
    ["PAYMENT_PROVIDER_INVALID", PaymentProviderInvalidError],
    ["PAYMENT_REQUIRED", PaymentRequiredError],
    ["PEER_HISTORY_EMPTY", PeerHistoryEmptyError],
    ["PEER_ID_INVALID", PeerIdInvalidError],
    ["PEER_ID_NOT_SUPPORTED", PeerIdNotSupportedError],
    ["PEER_TYPES_INVALID", PeerTypesInvalidError],
    ["PEERS_LIST_EMPTY", PeersListEmptyError],
    ["PERSISTENT_TIMESTAMP_EMPTY", PersistentTimestampEmptyError],
    ["PERSISTENT_TIMESTAMP_INVALID", PersistentTimestampInvalidError],
    ["PHONE_CODE_EMPTY", PhoneCodeEmptyError],
    ["PHONE_CODE_EXPIRED", PhoneCodeExpiredError],
    ["PHONE_CODE_HASH_EMPTY", PhoneCodeHashEmptyError],
    ["PHONE_CODE_INVALID", PhoneCodeInvalidError],
    ["PHONE_HASH_EXPIRED", PhoneHashExpiredError],
    ["PHONE_NOT_OCCUPIED", PhoneNotOccupiedError],
    ["PHONE_NUMBER_APP_SIGNUP_FORBIDDEN", PhoneNumberAppSignupForbiddenError],
    ["PHONE_NUMBER_BANNED", PhoneNumberBannedError],
    ["PHONE_NUMBER_FLOOD", PhoneNumberFloodError],
    ["PHONE_NUMBER_INVALID", PhoneNumberInvalidError],
    ["PHONE_NUMBER_OCCUPIED", PhoneNumberOccupiedError],
    ["PHONE_NUMBER_UNOCCUPIED", PhoneNumberUnoccupiedError],
    ["PHONE_PASSWORD_PROTECTED", PhonePasswordProtectedError],
    ["PHOTO_CONTENT_TYPE_INVALID", PhotoContentTypeInvalidError],
    ["PHOTO_CONTENT_URL_EMPTY", PhotoContentUrlEmptyError],
    ["PHOTO_CROP_FILE_MISSING", PhotoCropFileMissingError],
    ["PHOTO_CROP_SIZE_SMALL", PhotoCropSizeSmallError],
    ["PHOTO_EXT_INVALID", PhotoExtInvalidError],
    ["PHOTO_FILE_MISSING", PhotoFileMissingError],
    ["PHOTO_ID_INVALID", PhotoIdInvalidError],
    ["PHOTO_INVALID", PhotoInvalidError],
    ["PHOTO_INVALID_DIMENSIONS", PhotoInvalidDimensionsError],
    ["PHOTO_SAVE_FILE_INVALID", PhotoSaveFileInvalidError],
    ["PHOTO_THUMB_URL_EMPTY", PhotoThumbUrlEmptyError],
    ["PIN_RESTRICTED", PinRestrictedError],
    ["PINNED_DIALOGS_TOO_MUCH", PinnedDialogsTooMuchError],
    ["PINNED_TOO_MUCH", PinnedTooMuchError],
    ["POLL_ANSWER_INVALID", PollAnswerInvalidError],
    ["POLL_ANSWERS_INVALID", PollAnswersInvalidError],
    ["POLL_OPTION_DUPLICATE", PollOptionDuplicateError],
    ["POLL_OPTION_INVALID", PollOptionInvalidError],
    ["POLL_QUESTION_INVALID", PollQuestionInvalidError],
    ["PREMIUM_ACCOUNT_REQUIRED", PremiumAccountRequiredError],
    ["PRICING_CHAT_INVALID", PricingChatInvalidError],
    ["PRIVACY_KEY_INVALID", PrivacyKeyInvalidError],
    ["PRIVACY_TOO_LONG", PrivacyTooLongError],
    ["PRIVACY_VALUE_INVALID", PrivacyValueInvalidError],
    ["PUBLIC_KEY_REQUIRED", PublicKeyRequiredError],
    ["PURPOSE_INVALID", PurposeInvalidError],
    ["QUERY_ID_EMPTY", QueryIdEmptyError],
    ["QUERY_ID_INVALID", QueryIdInvalidError],
    ["QUERY_TOO_SHORT", QueryTooShortError],
    ["QUICK_REPLIES_BOT_NOT_ALLOWED", QuickRepliesBotNotAllowedError],
    ["QUICK_REPLIES_TOO_MUCH", QuickRepliesTooMuchError],
    ["QUIZ_ANSWER_MISSING", QuizAnswerMissingError],
    ["QUIZ_CORRECT_ANSWER_INVALID", QuizCorrectAnswerInvalidError],
    ["QUIZ_CORRECT_ANSWERS_EMPTY", QuizCorrectAnswersEmptyError],
    ["QUIZ_CORRECT_ANSWERS_TOO_MUCH", QuizCorrectAnswersTooMuchError],
    ["QUIZ_MULTIPLE_INVALID", QuizMultipleInvalidError],
    ["QUOTE_TEXT_INVALID", QuoteTextInvalidError],
    ["RAISE_HAND_FORBIDDEN", RaiseHandForbiddenError],
    ["RANDOM_ID_EMPTY", RandomIdEmptyError],
    ["RANDOM_ID_EXPIRED", RandomIdExpiredError],
    ["RANDOM_ID_INVALID", RandomIdInvalidError],
    ["RANDOM_LENGTH_INVALID", RandomLengthInvalidError],
    ["RANGES_INVALID", RangesInvalidError],
    ["REACTION_EMPTY", ReactionEmptyError],
    ["REACTION_INVALID", ReactionInvalidError],
    ["REACTIONS_COUNT_INVALID", ReactionsCountInvalidError],
    ["REACTIONS_TOO_MANY", ReactionsTooManyError],
    ["RECEIPT_EMPTY", ReceiptEmptyError],
    ["REPLY_MARKUP_BUY_EMPTY", ReplyMarkupBuyEmptyError],
    ["REPLY_MARKUP_GAME_EMPTY", ReplyMarkupGameEmptyError],
    ["REPLY_MARKUP_INVALID", ReplyMarkupInvalidError],
    ["REPLY_MARKUP_TOO_LONG", ReplyMarkupTooLongError],
    ["REPLY_MESSAGE_ID_INVALID", ReplyMessageIdInvalidError],
    ["REPLY_MESSAGES_TOO_MUCH", ReplyMessagesTooMuchError],
    ["REPLY_TO_INVALID", ReplyToInvalidError],
    ["REPLY_TO_MONOFORUM_PEER_INVALID", ReplyToMonoforumPeerInvalidError],
    ["REPLY_TO_USER_INVALID", ReplyToUserInvalidError],
    ["REQUEST_TOKEN_INVALID", RequestTokenInvalidError],
    ["RESET_REQUEST_MISSING", ResetRequestMissingError],
    ["RESULT_ID_DUPLICATE", ResultIdDuplicateError],
    ["RESULT_ID_EMPTY", ResultIdEmptyError],
    ["RESULT_ID_INVALID", ResultIdInvalidError],
    ["RESULT_TYPE_INVALID", ResultTypeInvalidError],
    ["RESULTS_TOO_MUCH", ResultsTooMuchError],
    ["REVOTE_NOT_ALLOWED", RevoteNotAllowedError],
    ["RIGHTS_NOT_MODIFIED", RightsNotModifiedError],
    ["RINGTONE_INVALID", RingtoneInvalidError],
    ["RINGTONE_MIME_INVALID", RingtoneMimeInvalidError],
    ["RSA_DECRYPT_FAILED", RsaDecryptFailedError],
    ["SAVED_ID_EMPTY", SavedIdEmptyError],
    ["SCHEDULE_BOT_NOT_ALLOWED", ScheduleBotNotAllowedError],
    ["SCHEDULE_DATE_INVALID", ScheduleDateInvalidError],
    ["SCHEDULE_DATE_TOO_LATE", ScheduleDateTooLateError],
    ["SCHEDULE_STATUS_PRIVATE", ScheduleStatusPrivateError],
    ["SCHEDULE_TOO_MUCH", ScheduleTooMuchError],
    ["SCORE_INVALID", ScoreInvalidError],
    ["SEARCH_QUERY_EMPTY", SearchQueryEmptyError],
    ["SEARCH_WITH_LINK_NOT_SUPPORTED", SearchWithLinkNotSupportedError],
    ["SECONDS_INVALID", SecondsInvalidError],
    ["SECURE_SECRET_REQUIRED", SecureSecretRequiredError],
    ["SELF_DELETE_RESTRICTED", SelfDeleteRestrictedError],
    ["SEND_AS_PEER_INVALID", SendAsPeerInvalidError],
    ["SEND_MESSAGE_GAME_INVALID", SendMessageGameInvalidError],
    ["SEND_MESSAGE_MEDIA_INVALID", SendMessageMediaInvalidError],
    ["SEND_MESSAGE_TYPE_INVALID", SendMessageTypeInvalidError],
    ["SETTINGS_INVALID", SettingsInvalidError],
    ["SHA256_HASH_INVALID", Sha256HashInvalidError],
    ["SHORT_NAME_INVALID", ShortNameInvalidError],
    ["SHORT_NAME_OCCUPIED", ShortNameOccupiedError],
    ["SHORTCUT_INVALID", ShortcutInvalidError],
    ["SLOTS_EMPTY", SlotsEmptyError],
    ["SLOWMODE_MULTI_MSGS_DISABLED", SlowmodeMultiMsgsDisabledError],
    ["SLUG_INVALID", SlugInvalidError],
    ["SMS_CODE_CREATE_FAILED", SmsCodeCreateFailedError],
    ["SMSJOB_ID_INVALID", SmsjobIdInvalidError],
    ["SRP_A_INVALID", SrpAInvalidError],
    ["SRP_ID_INVALID", SrpIdInvalidError],
    ["SRP_PASSWORD_CHANGED", SrpPasswordChangedError],
    ["STARGIFT_ALREADY_CONVERTED", StargiftAlreadyConvertedError],
    ["STARGIFT_ALREADY_REFUNDED", StargiftAlreadyRefundedError],
    ["STARGIFT_ALREADY_UPGRADED", StargiftAlreadyUpgradedError],
    ["STARGIFT_INVALID", StargiftInvalidError],
    ["STARGIFT_NOT_FOUND", StargiftNotFoundError],
    ["STARGIFT_OWNER_INVALID", StargiftOwnerInvalidError],
    ["STARGIFT_PEER_INVALID", StargiftPeerInvalidError],
    ["STARGIFT_RESELL_CURRENCY_NOT_ALLOWED", StargiftResellCurrencyNotAllowedError],
    ["STARGIFT_SLUG_INVALID", StargiftSlugInvalidError],
    ["STARGIFT_UPGRADE_UNAVAILABLE", StargiftUpgradeUnavailableError],
    ["STARGIFT_USAGE_LIMITED", StargiftUsageLimitedError],
    ["STARGIFT_USER_USAGE_LIMITED", StargiftUserUsageLimitedError],
    ["STARREF_AWAITING_END", StarrefAwaitingEndError],
    ["STARREF_EXPIRED", StarrefExpiredError],
    ["STARREF_HASH_REVOKED", StarrefHashRevokedError],
    ["STARREF_PERMILLE_INVALID", StarrefPermilleInvalidError],
    ["STARREF_PERMILLE_TOO_LOW", StarrefPermilleTooLowError],
    ["STARS_AMOUNT_INVALID", StarsAmountInvalidError],
    ["STARS_INVOICE_INVALID", StarsInvoiceInvalidError],
    ["STARS_PAYMENT_REQUIRED", StarsPaymentRequiredError],
    ["START_PARAM_EMPTY", StartParamEmptyError],
    ["START_PARAM_INVALID", StartParamInvalidError],
    ["START_PARAM_TOO_LONG", StartParamTooLongError],
    ["STICKER_DOCUMENT_INVALID", StickerDocumentInvalidError],
    ["STICKER_EMOJI_INVALID", StickerEmojiInvalidError],
    ["STICKER_FILE_INVALID", StickerFileInvalidError],
    ["STICKER_GIF_DIMENSIONS", StickerGifDimensionsError],
    ["STICKER_ID_INVALID", StickerIdInvalidError],
    ["STICKER_INVALID", StickerInvalidError],
    ["STICKER_MIME_INVALID", StickerMimeInvalidError],
    ["STICKER_PNG_DIMENSIONS", StickerPngDimensionsError],
    ["STICKER_PNG_NOPNG", StickerPngNopngError],
    ["STICKER_TGS_NODOC", StickerTgsNodocError],
    ["STICKER_TGS_NOTGS", StickerTgsNotgsError],
    ["STICKER_THUMB_PNG_NOPNG", StickerThumbPngNopngError],
    ["STICKER_THUMB_TGS_NOTGS", StickerThumbTgsNotgsError],
    ["STICKER_VIDEO_BIG", StickerVideoBigError],
    ["STICKER_VIDEO_NODOC", StickerVideoNodocError],
    ["STICKER_VIDEO_NOWEBM", StickerVideoNowebmError],
    ["STICKERPACK_STICKERS_TOO_MUCH", StickerpackStickersTooMuchError],
    ["STICKERS_EMPTY", StickersEmptyError],
    ["STICKERS_TOO_MUCH", StickersTooMuchError],
    ["STICKERSET_INVALID", StickersetInvalidError],
    ["STORIES_NEVER_CREATED", StoriesNeverCreatedError],
    ["STORIES_TOO_MUCH", StoriesTooMuchError],
    ["STORY_ID_EMPTY", StoryIdEmptyError],
    ["STORY_ID_INVALID", StoryIdInvalidError],
    ["STORY_NOT_MODIFIED", StoryNotModifiedError],
    ["STORY_PERIOD_INVALID", StoryPeriodInvalidError],
    ["SUBSCRIPTION_EXPORT_MISSING", SubscriptionExportMissingError],
    ["SUBSCRIPTION_ID_INVALID", SubscriptionIdInvalidError],
    ["SUBSCRIPTION_PERIOD_INVALID", SubscriptionPeriodInvalidError],
    ["SUGGESTED_POST_AMOUNT_INVALID", SuggestedPostAmountInvalidError],
    ["SUGGESTED_POST_PEER_INVALID", SuggestedPostPeerInvalidError],
    ["SWITCH_PM_TEXT_EMPTY", SwitchPmTextEmptyError],
    ["SWITCH_WEBVIEW_URL_INVALID", SwitchWebviewUrlInvalidError],
    ["TAKEOUT_INVALID", TakeoutInvalidError],
    ["TAKEOUT_REQUIRED", TakeoutRequiredError],
    ["TASK_ALREADY_EXISTS", TaskAlreadyExistsError],
    ["TEMP_AUTH_KEY_ALREADY_BOUND", TempAuthKeyAlreadyBoundError],
    ["TEMP_AUTH_KEY_EMPTY", TempAuthKeyEmptyError],
    ["TERMS_URL_INVALID", TermsUrlInvalidError],
    ["THEME_FILE_INVALID", ThemeFileInvalidError],
    ["THEME_FORMAT_INVALID", ThemeFormatInvalidError],
    ["THEME_INVALID", ThemeInvalidError],
    ["THEME_MIME_INVALID", ThemeMimeInvalidError],
    ["THEME_PARAMS_INVALID", ThemeParamsInvalidError],
    ["THEME_SLUG_INVALID", ThemeSlugInvalidError],
    ["THEME_TITLE_INVALID", ThemeTitleInvalidError],
    ["TIMEZONE_INVALID", TimezoneInvalidError],
    ["TITLE_INVALID", TitleInvalidError],
    ["TMP_PASSWORD_DISABLED", TmpPasswordDisabledError],
    ["TMP_PASSWORD_INVALID", TmpPasswordInvalidError],
    ["TO_ID_INVALID", ToIdInvalidError],
    ["TO_LANG_INVALID", ToLangInvalidError],
    ["TODO_ITEM_DUPLICATE", TodoItemDuplicateError],
    ["TODO_ITEMS_EMPTY", TodoItemsEmptyError],
    ["TODO_NOT_MODIFIED", TodoNotModifiedError],
    ["TOKEN_EMPTY", TokenEmptyError],
    ["TOKEN_INVALID", TokenInvalidError],
    ["TOKEN_TYPE_INVALID", TokenTypeInvalidError],
    ["TOPIC_CLOSE_SEPARATELY", TopicCloseSeparatelyError],
    ["TOPIC_CLOSED", TopicClosedError],
    ["TOPIC_DELETED", TopicDeletedError],
    ["TOPIC_HIDE_SEPARATELY", TopicHideSeparatelyError],
    ["TOPIC_ID_INVALID", TopicIdInvalidError],
    ["TOPIC_NOT_MODIFIED", TopicNotModifiedError],
    ["TOPIC_TITLE_EMPTY", TopicTitleEmptyError],
    ["TOPICS_EMPTY", TopicsEmptyError],
    ["TRANSACTION_ID_INVALID", TransactionIdInvalidError],
    ["TRANSCRIPTION_FAILED", TranscriptionFailedError],
    ["TRANSLATE_REQ_QUOTA_EXCEEDED", TranslateReqQuotaExceededError],
    ["TTL_DAYS_INVALID", TtlDaysInvalidError],
    ["TTL_MEDIA_INVALID", TtlMediaInvalidError],
    ["TTL_PERIOD_INVALID", TtlPeriodInvalidError],
    ["TYPES_EMPTY", TypesEmptyError],
    ["UNSUPPORTED", UnsupportedError],
    ["UNTIL_DATE_INVALID", UntilDateInvalidError],
    ["URL_INVALID", UrlInvalidError],
    ["USAGE_LIMIT_INVALID", UsageLimitInvalidError],
    ["USER_ADMIN_INVALID", UserAdminInvalidError],
    ["USER_ALREADY_INVITED", UserAlreadyInvitedError],
    ["USER_ALREADY_PARTICIPANT", UserAlreadyParticipantError],
    ["USER_BANNED_IN_CHANNEL", UserBannedInChannelError],
    ["USER_BLOCKED", UserBlockedError],
    ["USER_BOT", UserBotError],
    ["USER_BOT_INVALID", UserBotInvalidError],
    ["USER_BOT_REQUIRED", UserBotRequiredError],
    ["USER_CHANNELS_TOO_MUCH", UserChannelsTooMuchError],
    ["USER_CREATOR", UserCreatorError],
    ["USER_GIFT_UNAVAILABLE", UserGiftUnavailableError],
    ["USER_ID_INVALID", UserIdInvalidError],
    ["USER_INVALID", UserInvalidError],
    ["USER_IS_BLOCKED", UserIsBlockedError],
    ["USER_IS_BOT", UserIsBotError],
    ["USER_KICKED", UserKickedError],
    ["USER_NOT_MUTUAL_CONTACT", UserNotMutualContactError],
    ["USER_NOT_PARTICIPANT", UserNotParticipantError],
    ["USER_PUBLIC_MISSING", UserPublicMissingError],
    ["USER_VOLUME_INVALID", UserVolumeInvalidError],
    ["USERNAME_INVALID", UsernameInvalidError],
    ["USERNAME_NOT_MODIFIED", UsernameNotModifiedError],
    ["USERNAME_NOT_OCCUPIED", UsernameNotOccupiedError],
    ["USERNAME_OCCUPIED", UsernameOccupiedError],
    ["USERNAME_PURCHASE_AVAILABLE", UsernamePurchaseAvailableError],
    ["USERNAMES_ACTIVE_TOO_MUCH", UsernamesActiveTooMuchError],
    ["USERPIC_UPLOAD_REQUIRED", UserpicUploadRequiredError],
    ["USERS_TOO_FEW", UsersTooFewError],
    ["USERS_TOO_MUCH", UsersTooMuchError],
    ["VENUE_ID_INVALID", VenueIdInvalidError],
    ["VIDEO_CONTENT_TYPE_INVALID", VideoContentTypeInvalidError],
    ["VIDEO_FILE_INVALID", VideoFileInvalidError],
    ["VIDEO_PAUSE_FORBIDDEN", VideoPauseForbiddenError],
    ["VIDEO_STOP_FORBIDDEN", VideoStopForbiddenError],
    ["VIDEO_TITLE_EMPTY", VideoTitleEmptyError],
    ["VOICE_MESSAGES_FORBIDDEN", VoiceMessagesForbiddenError],
    ["WALLPAPER_FILE_INVALID", WallpaperFileInvalidError],
    ["WALLPAPER_INVALID", WallpaperInvalidError],
    ["WALLPAPER_MIME_INVALID", WallpaperMimeInvalidError],
    ["WALLPAPER_NOT_FOUND", WallpaperNotFoundError],
    ["WC_CONVERT_URL_INVALID", WcConvertUrlInvalidError],
    ["WEBDOCUMENT_INVALID", WebdocumentInvalidError],
    ["WEBDOCUMENT_MIME_INVALID", WebdocumentMimeInvalidError],
    ["WEBDOCUMENT_SIZE_TOO_BIG", WebdocumentSizeTooBigError],
    ["WEBDOCUMENT_URL_EMPTY", WebdocumentUrlEmptyError],
    ["WEBDOCUMENT_URL_INVALID", WebdocumentUrlInvalidError],
    ["WEBPAGE_CURL_FAILED", WebpageCurlFailedError],
    ["WEBPAGE_MEDIA_EMPTY", WebpageMediaEmptyError],
    ["WEBPAGE_NOT_FOUND", WebpageNotFoundError],
    ["WEBPAGE_URL_INVALID", WebpageUrlInvalidError],
    ["WEBPUSH_AUTH_INVALID", WebpushAuthInvalidError],
    ["WEBPUSH_KEY_INVALID", WebpushKeyInvalidError],
    ["WEBPUSH_TOKEN_INVALID", WebpushTokenInvalidError],
    ["YOU_BLOCKED_USER", YouBlockedUserError],
    ["BOT_METHOD_INVALID", BotMethodInvalidError],
    ["CONNECTION_DEVICE_MODEL_EMPTY", ConnectionDeviceModelEmptyError],
    ["CONNECTION_LANG_PACK_INVALID", ConnectionLangPackInvalidError],
    ["CONNECTION_NOT_INITED", ConnectionNotInitedError],
    ["CONNECTION_SYSTEM_EMPTY", ConnectionSystemEmptyError],
    ["CONNECTION_SYSTEM_LANG_CODE_EMPTY", ConnectionSystemLangCodeEmptyError],
    ["INPUT_CONSTRUCTOR_INVALID", InputConstructorInvalidError],
    ["INPUT_FETCH_ERROR", InputFetchErrorError],
    ["INPUT_FETCH_FAIL", InputFetchFailError],
    ["INPUT_LAYER_INVALID", InputLayerInvalidError],
    ["INPUT_METHOD_INVALID", InputMethodInvalidError],
    ["INPUT_REQUEST_TOO_LONG", InputRequestTooLongError],
    ["PEER_FLOOD", PeerFloodError],
    ["STICKERSET_NOT_MODIFIED", StickersetNotModifiedError],
    ["AUTH_KEY_UNREGISTERED", AuthKeyUnregisteredError],
    ["AUTH_KEY_INVALID", AuthKeyInvalidError],
    ["AUTH_KEY_PERM_EMPTY", AuthKeyPermEmptyError],
    ["SESSION_EXPIRED", SessionExpiredError],
    ["SESSION_PASSWORD_NEEDED", SessionPasswordNeededError],
    ["SESSION_REVOKED", SessionRevokedError],
    ["USER_DEACTIVATED", UserDeactivatedError],
    ["USER_DEACTIVATED_BAN", UserDeactivatedBanError],
    ["ALLOW_PAYMENT_REQUIRED", AllowPaymentRequiredError],
    ["ANONYMOUS_REACTIONS_DISABLED", AnonymousReactionsDisabledError],
    ["BOT_ACCESS_FORBIDDEN", BotAccessForbiddenError],
    ["BOT_VERIFIER_FORBIDDEN", BotVerifierForbiddenError],
    ["BROADCAST_FORBIDDEN", BroadcastForbiddenError],
    ["CHANNEL_PUBLIC_GROUP_NA", ChannelPublicGroupNaError],
    ["CHAT_ACTION_FORBIDDEN", ChatActionForbiddenError],
    ["CHAT_ADMIN_INVITE_REQUIRED", ChatAdminInviteRequiredError],
    ["CHAT_GUEST_SEND_FORBIDDEN", ChatGuestSendForbiddenError],
    ["CHAT_SEND_AUDIOS_FORBIDDEN", ChatSendAudiosForbiddenError],
    ["CHAT_SEND_DOCS_FORBIDDEN", ChatSendDocsForbiddenError],
    ["CHAT_SEND_GAME_FORBIDDEN", ChatSendGameForbiddenError],
    ["CHAT_SEND_GIFS_FORBIDDEN", ChatSendGifsForbiddenError],
    ["CHAT_SEND_MEDIA_FORBIDDEN", ChatSendMediaForbiddenError],
    ["CHAT_SEND_PHOTOS_FORBIDDEN", ChatSendPhotosForbiddenError],
    ["CHAT_SEND_PLAIN_FORBIDDEN", ChatSendPlainForbiddenError],
    ["CHAT_SEND_POLL_FORBIDDEN", ChatSendPollForbiddenError],
    ["CHAT_SEND_ROUNDVIDEOS_FORBIDDEN", ChatSendRoundvideosForbiddenError],
    ["CHAT_SEND_STICKERS_FORBIDDEN", ChatSendStickersForbiddenError],
    ["CHAT_SEND_VIDEOS_FORBIDDEN", ChatSendVideosForbiddenError],
    ["CHAT_SEND_VOICES_FORBIDDEN", ChatSendVoicesForbiddenError],
    ["CHAT_SEND_WEBPAGE_FORBIDDEN", ChatSendWebpageForbiddenError],
    ["CHAT_TYPE_INVALID", ChatTypeInvalidError],
    ["CHAT_WRITE_FORBIDDEN", ChatWriteForbiddenError],
    ["EDIT_BOT_INVITE_FORBIDDEN", EditBotInviteForbiddenError],
    ["GROUPCALL_ALREADY_STARTED", GroupcallAlreadyStartedError],
    ["INLINE_BOT_REQUIRED", InlineBotRequiredError],
    ["MESSAGE_AUTHOR_REQUIRED", MessageAuthorRequiredError],
    ["MESSAGE_DELETE_FORBIDDEN", MessageDeleteForbiddenError],
    ["POLL_VOTE_REQUIRED", PollVoteRequiredError],
    ["PRIVACY_PREMIUM_REQUIRED", PrivacyPremiumRequiredError],
    ["PUBLIC_CHANNEL_MISSING", PublicChannelMissingError],
    ["RIGHT_FORBIDDEN", RightForbiddenError],
    ["SENSITIVE_CHANGE_FORBIDDEN", SensitiveChangeForbiddenError],
    ["USER_DELETED", UserDeletedError],
    ["USER_PERMISSION_DENIED", UserPermissionDeniedError],
    ["USER_PRIVACY_RESTRICTED", UserPrivacyRestrictedError],
    ["USER_RESTRICTED", UserRestrictedError],
    ["YOUR_PRIVACY_RESTRICTED", YourPrivacyRestrictedError],
    ["CHAT_FORBIDDEN", ChatForbiddenError],
    ["API_GIFT_RESTRICTED_UPDATE_APP", ApiGiftRestrictedUpdateAppError],
    ["BUSINESS_ADDRESS_ACTIVE", BusinessAddressActiveError],
    ["CALL_PROTOCOL_COMPAT_LAYER_INVALID", CallProtocolCompatLayerInvalidError],
    ["FILEREF_UPGRADE_NEEDED", FilerefUpgradeNeededError],
    ["FRESH_CHANGE_PHONE_FORBIDDEN", FreshChangePhoneForbiddenError],
    ["FRESH_RESET_AUTHORISATION_FORBIDDEN", FreshResetAuthorisationForbiddenError],
    ["PAYMENT_UNSUPPORTED", PaymentUnsupportedError],
    ["PHONE_PASSWORD_FLOOD", PhonePasswordFloodError],
    ["PRECHECKOUT_FAILED", PrecheckoutFailedError],
    ["PREMIUM_CURRENTLY_UNAVAILABLE", PremiumCurrentlyUnavailableError],
    ["SEND_CODE_UNAVAILABLE", SendCodeUnavailableError],
    ["STARGIFT_EXPORT_IN_PROGRESS", StargiftExportInProgressError],
    ["STARS_FORM_AMOUNT_MISMATCH", StarsFormAmountMismatchError],
    ["STICKERSET_OWNER_ANONYMOUS", StickersetOwnerAnonymousError],
    ["TRANSLATIONS_DISABLED", TranslationsDisabledError],
    ["UPDATE_APP_TO_LOGIN", UpdateAppToLoginError],
    ["USERPIC_PRIVACY_REQUIRED", UserpicPrivacyRequiredError],
    ["AUTH_KEY_DUPLICATED", AuthKeyDuplicatedError],
    ["FROZEN_METHOD_INVALID", FrozenMethodError],
    ["AUTH_KEY_UNSYNCHRONIZED", AuthKeyUnsynchronizedError],
    ["AUTH_RESTART", AuthRestartError],
    ["CDN_UPLOAD_TIMEOUT", CdnUploadTimeoutError],
    ["CHAT_ID_GENERATE_FAILED", ChatIdGenerateFailedError],
    ["PERSISTENT_TIMESTAMP_OUTDATED", PersistentTimestampOutdatedError],
    ["RANDOM_ID_DUPLICATE", RandomIdDuplicateError],
    ["SEND_MEDIA_INVALID", SendMediaInvalidError],
    ["SIGN_IN_FAILED", SignInFailedError],
    ["TRANSLATE_REQ_FAILED", TranslateReqFailedError],
    ["TRANSLATION_TIMEOUT", TranslationTimeoutError],
    ["Timeout", TimeoutError],
    ["MSG_WAIT_TIMEOUT", MsgWaitTimeoutError],
]);

export const rpcErrorsRe: Map<RegExp, any> = new Map<RegExp, any>([
    [/^NETWORK_MIGRATE_(\d+)$/, NetworkMigrateError],
    [/^PHONE_MIGRATE_(\d+)$/, PhoneMigrateError],
    [/^STATS_MIGRATE_(\d+)$/, StatsMigrateError],
    [/^USER_MIGRATE_(\d+)$/, UserMigrateError],
    [/^EMAIL_UNCONFIRMED_(\d+)$/, EmailUnconfirmedError],
    [/^FILE_REFERENCE_(\d+)_EXPIRED$/, FileReferenceExpiredError],
    [/^FILE_REFERENCE_(\d+)_INVALID$/, FileReferenceInvalidError],
    [/^PASSWORD_TOO_FRESH_(\d+)$/, PasswordTooFreshError],
    [/^SESSION_TOO_FRESH_(\d+)$/, SessionTooFreshError],
    [/^STARGIFT_TRANSFER_TOO_EARLY_(\d+)$/, StargiftTransferTooEarlyError],
    [/^STORY_SEND_FLOOD_MONTHLY_(\d+)$/, StorySendFloodMonthlyError],
    [/^STORY_SEND_FLOOD_WEEKLY_(\d+)$/, StorySendFloodWeeklyError],
    [/^FILE_MIGRATE_(\d+)$/, FileMigrateError],
    [/^FILE_PART_(\d+)_MISSING$/, FilePartMissingError],
    [/^ALLOW_PAYMENT_REQUIRED_(\d+)$/, AllowPaymentRequiredError],
    [/^PREVIOUS_CHAT_IMPORT_ACTIVE_WAIT_(\d+)MIN$/, PreviousChatImportActiveWaitMinError],
    [/^2FA_CONFIRM_WAIT_(\d+)$/, TwoFaConfirmWaitError],
    [/^FLOOD_PREMIUM_WAIT_(\d+)$/, FloodWaitError],
    [/^FLOOD_WAIT_(\d+)$/, FloodWaitError],
    [/^PREMIUM_SUB_ACTIVE_UNTIL_(\d+)$/, PremiumSubActiveUntilError],
    [/^SLOWMODE_WAIT_(\d+)$/, SlowModeWaitError],
    [/^TAKEOUT_INIT_DELAY_(\d+)$/, TakeoutInitDelayError],
    [/^AUTH_RESTART_(\d+)$/, AuthRestartError],
    [/^FLOOD_TEST_PHONE_WAIT_(\d+)$/, FloodTestPhoneWaitError],
]);

export const rpcErrorRe = rpcErrorsRe;

export const baseErrors: Map<number, any> = new Map<number, any>([
    [303, InvalidDCError],
    [400, BadRequestError],
    [401, UnauthorizedError],
    [403, ForbiddenError],
    [404, NotFoundError],
    [406, AuthKeyError],
    [420, FloodError],
    [500, ServerError],
    [503, TimedOutError],
]);
