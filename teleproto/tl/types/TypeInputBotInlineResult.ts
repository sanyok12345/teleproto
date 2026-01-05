import { InputBotInlineResult } from "./InputBotInlineResult";
import { InputBotInlineResultPhoto } from "./InputBotInlineResultPhoto";
import { InputBotInlineResultDocument } from "./InputBotInlineResultDocument";
import { InputBotInlineResultGame } from "./InputBotInlineResultGame";

export type TypeInputBotInlineResult = InputBotInlineResult | InputBotInlineResultPhoto | InputBotInlineResultDocument | InputBotInlineResultGame;