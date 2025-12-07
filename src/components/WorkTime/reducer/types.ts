export interface Pause {
  readonly id: string;
  readonly paid: boolean;
  readonly startTime: Date;
  readonly endTime: Date;
}

export interface TimeState {
  readonly startTime: Date;
  readonly pauses: Pause[];
}

export type ActionType =
  | "ADD_PAUSE"
  | "DELETE_PAUSE"
  | "SET_START_TIME"
  | "SET_PAUSE_START_TIME"
  | "SET_PAUSE_END_TIME"
  | "SET_PAUSE_PAID";

export interface TimeAction {
  readonly type: ActionType;
  readonly value?: unknown;
}

export interface AddPauseAction extends TimeAction {
  readonly type: "ADD_PAUSE";
}

export interface SetStartTimeAction extends TimeAction {
  readonly type: "SET_START_TIME";
  readonly value: string;
}

export interface SetPauseStartTimeAction extends TimeAction {
  readonly type: "SET_PAUSE_START_TIME";
  readonly value: string;
  readonly id: string;
}

export interface SetPauseEndTimeAction extends TimeAction {
  readonly type: "SET_PAUSE_END_TIME";
  readonly value: string;
  readonly id: string;
}

export interface SetPausePaidAction extends TimeAction {
  readonly type: "SET_PAUSE_PAID";
  readonly value: string;
  readonly id: string;
}

export interface DeletePauseAction extends TimeAction {
  readonly type: "DELETE_PAUSE";
  readonly id: string;
}

export type TimeActions =
  | AddPauseAction
  | DeletePauseAction
  | SetStartTimeAction
  | SetPauseStartTimeAction
  | SetPauseEndTimeAction
  | SetPausePaidAction;
