import { SavedDialogs } from "./SavedDialogs";
import { SavedDialogsSlice } from "./SavedDialogsSlice";
import { SavedDialogsNotModified } from "./SavedDialogsNotModified";

export type TypeSavedDialogs = SavedDialogs | SavedDialogsSlice | SavedDialogsNotModified;