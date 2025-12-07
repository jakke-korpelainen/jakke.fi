import { format } from "date-fns";

const DEFAULT_FORMAT = "MMMM dd, yyyy 'at' HH:mm";

export const formatDateString = (value: string) => format(new Date(value), DEFAULT_FORMAT);
