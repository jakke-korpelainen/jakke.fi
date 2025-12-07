import clsx from "clsx";

interface TwoColumnProps {
  row?: boolean;
  heading: string;
  className?: string;
  children: React.ReactNode;
}

export const TwoColumn = ({
  heading,
  children,
  row = true,
}: TwoColumnProps) => (
  <div
    className={clsx(
      "flex border-b-2 border-before/[0.1] pb-5 last-of-type:border-0 last-of-type:pb-0 xl:pb-10",
      {
        ["flex-col xl:flex-row"]: row,
        ["flex-col"]: !row,
      },
    )}
  >
    <h2 className={clsx({ ["m-0 w-full xl:w-80"]: row, ["w-full"]: !row })}>
      {heading}
    </h2>
    <div
      className={clsx(
        "flex flex-col items-start sm:flex-row w-full sm:items-center gap-4 sm:gap-10 lg:gap-0",
      )}
    >
      {children}
    </div>
  </div>
);
