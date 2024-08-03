"use client";

import { GlareCardDemo } from "@/components/glarce-card-demo";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <GlareCardDemo />
    </div>
  );
};

export default Loading;
