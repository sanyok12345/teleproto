import { LoginToken } from "./LoginToken";
import { LoginTokenMigrateTo } from "./LoginTokenMigrateTo";
import { LoginTokenSuccess } from "./LoginTokenSuccess";

export type TypeLoginToken = LoginToken | LoginTokenMigrateTo | LoginTokenSuccess;