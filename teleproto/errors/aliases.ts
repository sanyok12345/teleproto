import { FloodError } from "./RPCBaseErrors";
import {
    FrozenMethodInvalidError,
    FrozenParticipantMissingError,
} from "./RPCErrorList";

/** @deprecated Renamed to {@link FrozenMethodInvalidError}. */
export const FrozenMethodError = FrozenMethodInvalidError;
/** @deprecated Renamed to {@link FrozenMethodInvalidError}. */
export type FrozenMethodError = FrozenMethodInvalidError;

/** @deprecated Renamed to {@link FrozenParticipantMissingError}. */
export const FrozenParticipantError = FrozenParticipantMissingError;
/** @deprecated Renamed to {@link FrozenParticipantMissingError}. */
export type FrozenParticipantError = FrozenParticipantMissingError;

/**
 * @deprecated The dedicated `FrozenError` base was removed; frozen errors now
 * map by their HTTP code (420). Kept as an alias of {@link FloodError} so
 * `instanceof errors.FrozenError` still matches frozen-method errors.
 */
export const FrozenError = FloodError;
/** @deprecated Alias of {@link FloodError}. */
export type FrozenError = FloodError;
