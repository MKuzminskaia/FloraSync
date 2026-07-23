import type { WateringLogEntry } from "@/lib/watering-log";
import { addWateringEntry, getWateringLogForPlant } from "@/lib/watering-log";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useWateringForPlant(id: number) {
  const [log, setLog] = useState<WateringLogEntry[]>([]);

  useFocusEffect(
    useCallback(() => {
      setLog(getWateringLogForPlant(id));
    }, [id]),
  );

  const addWatering = (entry: Omit<WateringLogEntry, "id">) => {
    addWateringEntry(entry);
    setLog(getWateringLogForPlant(id));
  };

  return { log, addWatering };
}
