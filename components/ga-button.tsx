"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { Button } from "@/components/ui/button";

export const GAButton = () => {
  return (
    <div>
      <Button
        onClick={() => sendGAEvent({ event: "buttonClicked", value: "xyz" })}
      >
        Send Event
      </Button>
    </div>
  );
};
