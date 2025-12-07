"use client";

import clsx from "clsx";
import { format, isPast } from "date-fns";
import Image from "next/image";

import { calculateClockOut } from "./helper";
import { TimeState } from "./reducer/types";

export const ClockOut = ({ ...state }: TimeState) => {
  let clockOutValue = "N/A";
  let clockOutDate = null;

  try {
    clockOutDate = calculateClockOut(state);
    clockOutValue = format(clockOutDate, "HH:mm");
  } catch (err) {
    console.error(err);
  }

  const isPastClockOutDate = clockOutDate ? isPast(clockOutDate) : false;
  const leaveText = isPastClockOutDate ? "Time to leave" : "You can leave at";

  return (
    <div className="relative">
      <Image
        className={clsx(
          { ["animate-bounce"]: isPastClockOutDate },
          "bottom-15 absolute left-20 lg:bottom-20 lg:left-40",
        )}
        alt="Aggressive Goose looking at the time"
        width={900}
        height={900}
        src="/hanh.png"
      />
      <div className="z-10">
        <p>{leaveText}</p>
        <h1>{clockOutValue}</h1>
      </div>
    </div>
  );
};
