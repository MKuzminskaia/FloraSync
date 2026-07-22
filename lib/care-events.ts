export const WATERING_LOG_TYPE = {
  WATERING: "watering",
  MISTING: "misting",
} as const;

export type WateringLogType =
  (typeof WATERING_LOG_TYPE)[keyof typeof WATERING_LOG_TYPE];
// = "watering" | "misting"
