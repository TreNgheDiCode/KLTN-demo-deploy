import React from "react";

const NewsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-[85px] text-primary dark:text-white">{children}</div>
  );
};

export default NewsLayout;
