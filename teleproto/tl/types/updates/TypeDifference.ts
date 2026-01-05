import { DifferenceEmpty } from "./DifferenceEmpty";
import { Difference } from "./Difference";
import { DifferenceSlice } from "./DifferenceSlice";
import { DifferenceTooLong } from "./DifferenceTooLong";

export type TypeDifference = DifferenceEmpty | Difference | DifferenceSlice | DifferenceTooLong;