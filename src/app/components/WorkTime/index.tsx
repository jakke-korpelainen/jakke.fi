"use client";

import clsx from "clsx";
import { useReducer } from "react";

import { Column } from "../Column";
import { buttonClass, columnClass } from "./classes";
import { ClockOut } from "./ClockOut";
import { sortDateDesc } from "./helper";
import { initialState, reducer } from "./reducer";
import { TimeInput } from "./TimeInput";

/**
 * Helper for calculating work time with non-paid and paid pauses :)
 */
export const WorkTime = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onStartChange = (value: string) => dispatch({ type: "SET_START_TIME", value });

  const pauses = [...state.pauses].sort((a, b) => sortDateDesc(a.startTime, b.startTime));

  return (
    <div className="flex grow flex-col text-white lg:flex-row">
      <Column className={clsx(columnClass, "bg-black")}>
        <p>For Anni</p>
        <h1 className="sticky top-0 z-10 mb-2 bg-black py-5">Work Time Calculator</h1>

        <h3>Work Started</h3>
        <TimeInput id={"work"} startTime={state.startTime} onStartChange={onStartChange} />

        {/* breaks */}
        {pauses.map((pause, index) => (
          <div className="border-1 relative rounded border border-orange-900 p-5" key={pause.id}>
            <h3 className="mb-5">
              {pause.paid ? "Paid break" : "Unpaid break"} {index + 1}
            </h3>
            <TimeInput
              id={pause.id}
              key={pause.id}
              startTime={pause.startTime}
              endTime={pause.endTime}
              paid={pause.paid}
              onDelete={() => dispatch({ type: "DELETE_PAUSE", id: pause.id })}
              onStartChange={(value) => dispatch({ type: "SET_PAUSE_START_TIME", id: pause.id, value })}
              onEndChange={(value) => dispatch({ type: "SET_PAUSE_END_TIME", id: pause.id, value })}
              onPaidChange={(value) => dispatch({ type: "SET_PAUSE_PAID", id: pause.id, value })}
            />
          </div>
        ))}
        <div className={clsx({ ["mt-10"]: pauses.length > 0 })}>
          <button className={buttonClass} type="button" onClick={() => dispatch({ type: "ADD_PAUSE" })}>
            Add break
          </button>
        </div>
      </Column>
      <Column
        className={clsx(
          columnClass,
          "order-first items-center justify-center bg-orange-900 lg:fixed lg:right-0 lg:order-none lg:h-full",
        )}
      >
        <ClockOut {...state} />
      </Column>
    </div>
  );
};
