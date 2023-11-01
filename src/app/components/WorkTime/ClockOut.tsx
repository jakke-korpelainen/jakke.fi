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
    <div className="relative flex w-full grow flex-col items-center overflow-hidden">
      <Image
        className={clsx(
          { ["animate-bounce"]: isPastClockOutDate },
          "absolute -bottom-20 left-20 sm:-bottom-40 md:-bottom-[14rem] md:-left-16 md:scale-50 lg:bottom-[27vh] lg:left-56 lg:scale-100 xl:bottom-[27vh] xl:left-52",
        )}
        alt="Aggressive Goose looking at the time"
        width={900}
        height={900}
        src="/hanh.png"
      />
      <div className="z-10 flex w-full grow flex-col justify-center gap-5">
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
