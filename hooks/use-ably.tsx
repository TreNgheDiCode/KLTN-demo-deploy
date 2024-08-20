"use client";

import * as Ably from "ably";

class AblyClient {
  private static instance: Ably.Realtime | null = null;

  private constructor() {} // Prevent direct instantiation

  public static getInstance(): Ably.Realtime | null {
    // Ensure this runs only on the client side
    if (typeof window === "undefined") {
      return null;
    }

    if (!AblyClient.instance) {
      AblyClient.instance = new Ably.Realtime({
        authUrl: "/api/ably",
        authMethod: "POST",
      });
    }
    return AblyClient.instance;
  }
}

export default AblyClient;
