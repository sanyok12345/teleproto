import { UserStatusEmpty } from "./UserStatusEmpty";
import { UserStatusOnline } from "./UserStatusOnline";
import { UserStatusOffline } from "./UserStatusOffline";
import { UserStatusRecently } from "./UserStatusRecently";
import { UserStatusLastWeek } from "./UserStatusLastWeek";
import { UserStatusLastMonth } from "./UserStatusLastMonth";

export type TypeUserStatus = UserStatusEmpty | UserStatusOnline | UserStatusOffline | UserStatusRecently | UserStatusLastWeek | UserStatusLastMonth;