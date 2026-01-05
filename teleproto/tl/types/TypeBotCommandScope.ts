import { BotCommandScopeDefault } from "./BotCommandScopeDefault";
import { BotCommandScopeUsers } from "./BotCommandScopeUsers";
import { BotCommandScopeChats } from "./BotCommandScopeChats";
import { BotCommandScopeChatAdmins } from "./BotCommandScopeChatAdmins";
import { BotCommandScopePeer } from "./BotCommandScopePeer";
import { BotCommandScopePeerAdmins } from "./BotCommandScopePeerAdmins";
import { BotCommandScopePeerUser } from "./BotCommandScopePeerUser";

export type TypeBotCommandScope = BotCommandScopeDefault | BotCommandScopeUsers | BotCommandScopeChats | BotCommandScopeChatAdmins | BotCommandScopePeer | BotCommandScopePeerAdmins | BotCommandScopePeerUser;