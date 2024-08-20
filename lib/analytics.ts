import { redis } from "./redis";
import { getDate } from "./utils";

type AnalyticsArg = {
  retention?: number;
};

type TrackingOptions = {
  persist?: boolean;
};

export class Analytics {
  private retention = 60 * 60 * 24 * 7; // 7 days

  constructor(opts?: AnalyticsArg) {
    if (opts?.retention) {
      this.retention = opts.retention;
    }
  }

  setRetention(retention: number) {
    this.retention = retention;
  }

  async track(namespace: string, event: object = {}, opts?: TrackingOptions) {
    let key = `analytics::${namespace}`;

    if (!opts?.persist) {
      key += `::${getDate()}`;
    }

    await redis.hincrby(key, JSON.stringify(event), 1);

    if (!opts?.persist) {
      await redis.expire(key, this.retention);
    }
  }
}

export class AnalyticsSingleton {
  private static instance: Analytics | null = null;

  private constructor() {}

  static getInstance(): Analytics {
    if (!AnalyticsSingleton.instance) {
      AnalyticsSingleton.instance = new Analytics();
    }
    return AnalyticsSingleton.instance;
  }
}

export const analytics = AnalyticsSingleton.getInstance();
