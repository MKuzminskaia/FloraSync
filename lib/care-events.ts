export const WATERING_LOG_TYPE = {
  WATERING: "watering",
  MISTING: "misting",
} as const;

export type WateringLogType =
  (typeof WATERING_LOG_TYPE)[keyof typeof WATERING_LOG_TYPE];
// = "watering" | "misting"

export const REMINDER_TYPE = {
  WATERING: "watering",
  FEEDING: "feeding",
  REPOTTING: "repotting",
} as const;

export type ReminderType = (typeof REMINDER_TYPE)[keyof typeof REMINDER_TYPE];
