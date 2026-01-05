import { InputUserEmpty } from "./InputUserEmpty";
import { InputUserSelf } from "./InputUserSelf";
import { InputUser } from "./InputUser";
import { InputUserFromMessage } from "./InputUserFromMessage";

export type TypeInputUser = InputUserEmpty | InputUserSelf | InputUser | InputUserFromMessage;