import { Dialogs } from "./Dialogs";
import { DialogsSlice } from "./DialogsSlice";
import { DialogsNotModified } from "./DialogsNotModified";

export type TypeDialogs = Dialogs | DialogsSlice | DialogsNotModified;