import clsx from "clsx";

export const Column = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={clsx("w-full lg:w-6/12", className)}>{children}</div>;
};
