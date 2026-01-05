import { InputBotInlineMessageMediaAuto } from "./InputBotInlineMessageMediaAuto";
import { InputBotInlineMessageText } from "./InputBotInlineMessageText";
import { InputBotInlineMessageMediaGeo } from "./InputBotInlineMessageMediaGeo";
import { InputBotInlineMessageMediaVenue } from "./InputBotInlineMessageMediaVenue";
import { InputBotInlineMessageMediaContact } from "./InputBotInlineMessageMediaContact";
import { InputBotInlineMessageGame } from "./InputBotInlineMessageGame";
import { InputBotInlineMessageMediaInvoice } from "./InputBotInlineMessageMediaInvoice";
import { InputBotInlineMessageMediaWebPage } from "./InputBotInlineMessageMediaWebPage";

export type TypeInputBotInlineMessage = InputBotInlineMessageMediaAuto | InputBotInlineMessageText | InputBotInlineMessageMediaGeo | InputBotInlineMessageMediaVenue | InputBotInlineMessageMediaContact | InputBotInlineMessageGame | InputBotInlineMessageMediaInvoice | InputBotInlineMessageMediaWebPage;