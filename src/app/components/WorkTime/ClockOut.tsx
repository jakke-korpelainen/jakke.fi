"use client";

import clsx from "clsx";
import { format, formatDistanceStrict, isPast } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

import { calculateClockOut } from "./helper";
import { TimeState } from "./reducer/types";

export const ClockOut = ({ ...state }: TimeState) => {
  "use client";
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  let clockOutValue = "N/A";
  let clockOutDate = null;

  try {
    clockOutDate = calculateClockOut(state);
    clockOutValue = format(clockOutDate, "HH:mm");
  } catch (err) {
    console.error(err);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isPastClockOutDate = clockOutDate ? isPast(clockOutDate) : false;
  const leaveText = isPastClockOutDate ? "Time to leave" : "You can leave at";

  return (
    <div className="relative">
      <Image
        className={clsx(
          { ["animate-bounce"]: isPastClockOutDate },
          "bottom-15 absolute left-[6rem] md:bottom-10 md:left-40 lg:bottom-20 lg:left-40",
        )}
        alt="Aggressive Goose looking at the time"
        width={900}
        height={900}
        src="/hanh.png"
      />
      <div className="z-10 flex flex-col gap-5">
        <p>{leaveText}</p>
        <h1 className="lg:text-7xl mb-0 leading-[2rem] lg:text-[6rem] lg:leading-[7rem]">{clockOutValue}</h1>

        {!isPastClockOutDate && currentTime && clockOutDate && (
          <p>
            {formatDistanceStrict(clockOutDate, currentTime, {
              addSuffix: true,
              unit: "second",
            })}
            .
          </p>
        )}
      </div>
    </div>
  );
};
