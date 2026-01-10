import type React from "react";

interface ISplashProps {
  image: string;
}

export const SplashWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="relative w-1/2 min-h-screen items-center justify-center overflow-hidden hidden md:flex">
      {children}
    </div>
  );
};

export const SplashImage: React.FC<ISplashProps> = ({ image }) => {
  return (
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${image})` }}
    />
  );
};
