"use client";

import clsx from "clsx";
import { differenceInMinutes, format, formatDistance } from "date-fns";

import {
  buttonClass,
  durationGroupClass,
  inputClass,
  inputGroupClass,
  labelClass,
  radioInputClass,
  radioLabelClass,
} from "./classes";
import { maximumPaidBreak } from "./helper";
import { Pause } from "./reducer/types";

interface TimeInputProps extends Pick<Pause, "id" | "startTime"> {
  onStartChange: (value: string) => void;
  endTime?: Date;
  paid?: boolean;
  onEndChange?: (value: string) => void;
  onPaidChange?: (value: string) => void;
  onDelete?: () => void;
}

export const TimeInput = ({
  id,
  startTime,
  endTime,
  paid,
  onDelete,
  onStartChange,
  onEndChange,
  onPaidChange,
}: TimeInputProps) => {
  let startTimeValue = null;
  let endTimeValue = null;
  let duration = null;
  let excess = null;

  try {
    startTimeValue = format(startTime, "HH:mm");
  } catch (err) {
    console.error(err);
  }

  if (endTime) {
    try {
      endTimeValue = format(endTime, "HH:mm");
    } catch (err) {
      console.error(err);
    }

    try {
      duration = formatDistance(startTime, endTime);
      if (paid) {
        const diff = differenceInMinutes(endTime, startTime);
        if (diff > maximumPaidBreak) {
          excess = diff - maximumPaidBreak;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  const durationText = duration ?? "N/A";

  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex grow gap-5">
          <div className={inputGroupClass}>
            <label className={labelClass} htmlFor={`${id}-start`}>
              Start time
            </label>
            <input
              min="06:00"
              max="20:00"
              type="time"
              id={`${id}-start`}
              className={inputClass}
              onChange={(e) => onStartChange(e.target.value)}
              value={startTimeValue ?? "00:00"}
            />
          </div>
          {endTime && (
            <>
              <div className={inputGroupClass}>
                <label className={labelClass} htmlFor={`${id}-end`}>
                  End time
                </label>
                <input
                  min="06:00"
                  max="20:00"
                  type="time"
                  id={`${id}-end`}
                  className={inputClass}
                  onChange={(e) => onEndChange?.(e.target.value)}
                  value={endTimeValue ?? "00:00"}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {endTime && (
        <>
          <div className="right-5 top-5 order-4 my-5 flex gap-5 lg:absolute lg:order-none lg:my-5">
            <div className="flex gap-2">
              <label className={clsx(labelClass, radioLabelClass)} htmlFor={`${id}-paid-true`}>
                Paid
                <input
                  id={`${id}-paid-true`}
                  className={clsx(inputClass, radioInputClass)}
                  onChange={() => onPaidChange?.("true")}
                  type="radio"
                  name={`${id}-paid`}
                  value={true.toString()}
                  checked={!!paid}
                />
              </label>
            </div>

            <div className="flex gap-2">
              <label className={clsx(labelClass, radioLabelClass)} htmlFor={`${id}-paid-false`}>
                Unpaid
                <input
                  id={`${id}-paid-false`}
                  className={clsx(radioInputClass)}
                  onChange={() => onPaidChange?.("false")}
                  type="radio"
                  name={`${id}-paid`}
                  checked={!paid}
                />
              </label>
            </div>
          </div>
          <div className="my-5 flex flex-col lg:my-0">
            <span className={clsx({ ["mb-2"]: paid && excess }, labelClass)}>Duration</span>

            {paid && excess !== null ? (
              <div className="w-56">
                <div className={durationGroupClass}>
                  <span className={labelClass}>total</span>
                  <span>{durationText}</span>
                </div>
                <div className={durationGroupClass}>
                  <span className={labelClass}>paid</span>
                  <span>{maximumPaidBreak} minutes</span>
                </div>
                <div className={durationGroupClass}>
                  <span className={labelClass}>unpaid</span> <span className="text-red-400">{excess} minutes</span>
                </div>
              </div>
            ) : (
              durationText
            )}
          </div>

          {onDelete && (
            <div className="bottom-5 right-5 order-5 lg:absolute lg:order-none">
              <button
                onClick={onDelete}
                className={clsx("border-red-700 text-base uppercase text-red-700", buttonClass)}
                type="button"
              >
                ✖️ Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
