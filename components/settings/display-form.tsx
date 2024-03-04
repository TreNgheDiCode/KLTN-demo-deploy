"use client";

import { SettingsHeader } from "./settings-header";

export const DisplayForm = () => {
  return (
    <div className="space-y-6">
      <SettingsHeader
        title="Display"
        description="Turn items on or off to control what's displayed in the app."
      />
    </div>
  );
};
