import { BotInlineMessageMediaAuto } from "./BotInlineMessageMediaAuto";
import { BotInlineMessageText } from "./BotInlineMessageText";
import { BotInlineMessageMediaGeo } from "./BotInlineMessageMediaGeo";
import { BotInlineMessageMediaVenue } from "./BotInlineMessageMediaVenue";
import { BotInlineMessageMediaContact } from "./BotInlineMessageMediaContact";
import { BotInlineMessageMediaInvoice } from "./BotInlineMessageMediaInvoice";
import { BotInlineMessageMediaWebPage } from "./BotInlineMessageMediaWebPage";

export type TypeBotInlineMessage = BotInlineMessageMediaAuto | BotInlineMessageText | BotInlineMessageMediaGeo | BotInlineMessageMediaVenue | BotInlineMessageMediaContact | BotInlineMessageMediaInvoice | BotInlineMessageMediaWebPage;