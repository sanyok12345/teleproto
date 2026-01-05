import { BusinessAwayMessageScheduleAlways } from "./BusinessAwayMessageScheduleAlways";
import { BusinessAwayMessageScheduleOutsideWorkHours } from "./BusinessAwayMessageScheduleOutsideWorkHours";
import { BusinessAwayMessageScheduleCustom } from "./BusinessAwayMessageScheduleCustom";

export type TypeBusinessAwayMessageSchedule = BusinessAwayMessageScheduleAlways | BusinessAwayMessageScheduleOutsideWorkHours | BusinessAwayMessageScheduleCustom;