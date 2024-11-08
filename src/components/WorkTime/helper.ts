import { add, differenceInMinutes } from "date-fns";

import { Pause, TimeState } from "./reducer/types";

export const sortDateDesc = (a: Date, b: Date) => {
  return a.valueOf() - b.valueOf();
};

/**
 * Any excess paid time will be considered as unpaid time
 */
export const maximumPaidBreak = 15;

export function calculatePauseDuration(accumulator: { regular: number; excess?: number }, pause: Pause) {
  let diff = 0;
  let excess = 0;

  const shouldCalculateExcess = accumulator.excess !== undefined;

  diff = differenceInMinutes(pause.endTime, pause.startTime);

  /** overflow sum for overspent paid breaks */
  if (shouldCalculateExcess && diff > maximumPaidBreak) {
    excess = diff - maximumPaidBreak;
  }

  return {
    regular: accumulator.regular + diff,
    excess: shouldCalculateExcess ? (accumulator?.excess ?? 0) + excess : accumulator.excess,
  };
}

export const calculateClockOut = ({ startTime, pauses }: TimeState) => {
  // sum up breaks
  const calculatedPauses = {
    unpaid: pauses.filter((p) => p.paid === false).reduce(calculatePauseDuration, { regular: 0, excess: undefined }),
    paid: pauses.filter((p) => p.paid === true).reduce(calculatePauseDuration, { regular: 0, excess: 0 }),
  };

  const baseWorkTime = add(startTime, {
    hours: 7,
    minutes: 30,
  });

  // calculate paid excess overflow to unpaid time
  const afterPaidExcessPauses = add(baseWorkTime, {
    minutes: calculatedPauses.paid.excess,
  });

  // calculate unpaid breaks
  const result = add(afterPaidExcessPauses, {
    minutes: calculatedPauses.unpaid.regular,
  });

  return result;
};
