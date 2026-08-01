import type { EntityLike } from "../define";
import { Api } from "../tl";
import { InlineResults } from "../tl/custom/inlineResults";
import GetInlineBotResults = Api.messages.GetInlineBotResults;
import type { TelegramClient } from "./TelegramClient";

// BotMethods
/** @hidden */
export async function inlineQuery(
    client: TelegramClient,
    bot: EntityLike,
    query: string,
    entity?: Api.InputPeerSelf,
    offset?: string,
    geoPoint?: Api.TypeInputGeoPoint
): Promise<InlineResults> {
    bot = await client.getInputEntity(bot);
    let peer: Api.TypeInputPeer = new Api.InputPeerSelf();
    if (entity) {
        peer = await client.getInputEntity(entity);
    }
    const result = await client.invoke(
        new GetInlineBotResults({
            bot: bot,
            peer: peer,
            query: query,
            offset: offset || "",
            geoPoint: geoPoint,
        })
    );
    return new InlineResults(client, result, entity ? peer : undefined);
}

/** One bot command for {@link setBotCommands}. */
export interface BotCommandEntry {
    /** The command itself, without the leading `/` (1-32 chars: a-z, 0-9, _). */
    command: string;
    /** Description shown in the command menu (1-256 chars). */
    description: string;
    /** L228: hide the command from the menu while still accepting it. */
    ephemeral?: boolean;
}

/** Scope/language selector for the bot command methods. */
export interface BotCommandScopeParams {
    /** Where the commands apply. Defaults to {@link Api.BotCommandScopeDefault}. */
    scope?: Api.TypeBotCommandScope;
    /** Two-letter language code the commands apply to. Defaults to all languages. */
    langCode?: string;
}

/** @hidden */
export async function setBotCommands(
    client: TelegramClient,
    commands: BotCommandEntry[],
    params: BotCommandScopeParams = {}
): Promise<boolean> {
    return client.invoke(
        new Api.bots.SetBotCommands({
            scope: params.scope ?? new Api.BotCommandScopeDefault(),
            langCode: params.langCode ?? "",
            commands: commands.map(
                (command) =>
                    new Api.BotCommand({
                        command: command.command,
                        description: command.description,
                        ephemeral: command.ephemeral,
                    })
            ),
        })
    );
}

/** @hidden */
export async function getBotCommands(
    client: TelegramClient,
    params: BotCommandScopeParams = {}
): Promise<Api.BotCommand[]> {
    return client.invoke(
        new Api.bots.GetBotCommands({
            scope: params.scope ?? new Api.BotCommandScopeDefault(),
            langCode: params.langCode ?? "",
        })
    );
}

/** @hidden */
export async function resetBotCommands(
    client: TelegramClient,
    params: BotCommandScopeParams = {}
): Promise<boolean> {
    return client.invoke(
        new Api.bots.ResetBotCommands({
            scope: params.scope ?? new Api.BotCommandScopeDefault(),
            langCode: params.langCode ?? "",
        })
    );
}

/** Parameters for {@link setBotInfo}. Only the fields you set are changed. */
export interface SetBotInfoParams {
    /** Bot owners: the owned bot to edit. Bots editing themselves can omit this. */
    bot?: EntityLike;
    /** Two-letter language code the info applies to. Defaults to all languages. */
    langCode?: string;
    /** New bot name. */
    name?: string;
    /** New short description ("about", shown on the profile page). */
    about?: string;
    /** New full description (shown on the empty chat screen). */
    description?: string;
}

/** @hidden */
export async function setBotInfo(
    client: TelegramClient,
    params: SetBotInfoParams
): Promise<boolean> {
    return client.invoke(
        new Api.bots.SetBotInfo({
            bot: params.bot
                ? ((await client.getInputEntity(
                      params.bot
                  )) as unknown as Api.TypeInputUser)
                : undefined,
            langCode: params.langCode ?? "",
            name: params.name,
            about: params.about,
            description: params.description,
        })
    );
}

/** @hidden */
export async function getBotInfo(
    client: TelegramClient,
    params: { bot?: EntityLike; langCode?: string } = {}
): Promise<Api.bots.BotInfo> {
    return client.invoke(
        new Api.bots.GetBotInfo({
            bot: params.bot
                ? ((await client.getInputEntity(
                      params.bot
                  )) as unknown as Api.TypeInputUser)
                : undefined,
            langCode: params.langCode ?? "",
        })
    );
}

/** @hidden */
export async function setBotMenuButton(
    client: TelegramClient,
    user: EntityLike,
    button: Api.TypeBotMenuButton
): Promise<boolean> {
    return client.invoke(
        new Api.bots.SetBotMenuButton({
            userId: (await client.getInputEntity(
                user
            )) as unknown as Api.TypeInputUser,
            button: button,
        })
    );
}

/** @hidden */
export async function getBotMenuButton(
    client: TelegramClient,
    user: EntityLike
): Promise<Api.TypeBotMenuButton> {
    return client.invoke(
        new Api.bots.GetBotMenuButton({
            userId: (await client.getInputEntity(
                user
            )) as unknown as Api.TypeInputUser,
        })
    );
}
