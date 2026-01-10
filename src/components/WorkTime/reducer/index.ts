import { add, parse, startOfDay } from "date-fns";
import type { TimeActions, TimeState } from "./types";

export function reducer(state: TimeState, action: TimeActions): TimeState {
  switch (action.type) {
    case "SET_PAUSE_PAID":
    case "SET_PAUSE_START_TIME":
    case "SET_PAUSE_END_TIME": {
      const pauses = state.pauses.filter((pause) => pause.id !== action.id);
      const pauseInEdit = state.pauses.find((pause) => pause.id === action.id);

      if (!pauseInEdit) {
        throw new Error("Invalid operation: Couldn't locate pause to edit.");
      }

      if (action.type === "SET_PAUSE_START_TIME") {
        const startTime = parse(action.value, "HH:mm", new Date());
        return {
          ...state,
          pauses: pauses.concat({ ...pauseInEdit, startTime }),
        };
      }

      if (action.type === "SET_PAUSE_END_TIME") {
        const endTime = parse(action.value, "HH:mm", new Date());
        return { ...state, pauses: pauses.concat({ ...pauseInEdit, endTime }) };
      }

      if (action.type === "SET_PAUSE_PAID") {
        const paid = action.value === true.toString();
        return { ...state, pauses: pauses.concat({ ...pauseInEdit, paid }) };
      }
      throw new Error("Invalid operation: Unrecognized time action.");
    }
    case "SET_START_TIME": {
      const startTime = parse(action.value, "HH:mm", new Date());
      return { ...state, startTime };
    }
    case "ADD_PAUSE": {
      return {
        ...state,
        pauses: state.pauses.concat({
          id: crypto.randomUUID(),
          startTime: new Date(),
          endTime: new Date(),
          paid: false,
        }),
      };
    }
    case "DELETE_PAUSE": {
      return {
        ...state,
        pauses: state.pauses.filter((pause) => pause.id !== action.id),
      };
    }
    default: {
      return state;
    }
  }
}

export const initialState: TimeState = {
  startTime: add(startOfDay(new Date()), { hours: 8 }),
  pauses: [],
};
