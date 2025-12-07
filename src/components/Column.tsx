import clsx from "clsx";

interface ColumnProps {
  children: React.ReactNode;
  className?: string;
}

export const Column = ({ children, className }: ColumnProps) => {
  return <div className={clsx("w-full lg:w-6/12", className)}>{children}</div>;
};
