import type { WateringLogType } from "@/lib/care-events";

export type WateringLogEntry = {
  id: number;
  plantId: number;
  type: WateringLogType;
  doneAt: string;
};
