import type { WateringLogType } from "@/lib/care-events";
import { db } from "@/lib/db";

export type WateringLogEntry = {
  id: number;
  plantId: number;
  type: WateringLogType;
  doneAt: string;
};

// Add new plant watering in log, return an id of new inserted row
export function addWateringEntry(entry: Omit<WateringLogEntry, "id">): number {
  const result = db.runSync(
    "INSERT INTO watering_log (plant_id, type, done_at) VALUES (?,?,?)",
    entry.plantId,
    entry.type,
    entry.doneAt,
  );
  return result.lastInsertRowId;
}

// Return a list from a watering log for a plant by id
export function getWateringLogForPlant(plantId: number): WateringLogEntry[] {
  const result = db.getAllSync<WateringLogEntry>(
    "SELECT id, plant_id AS plantId, type, done_at AS doneAt FROM watering_log WHERE plant_id = ? ORDER BY done_at DESC",
    plantId,
  );
  return result;
}

// Return info about one watering from a watering log for a plant
export function getWateringEntryById(id: number): WateringLogEntry | null {
  const result = db.getFirstSync<WateringLogEntry>(
    "SELECT id, plant_id AS plantId, type, done_at AS doneAt FROM watering_log WHERE id = ?",
    id,
  );
  return result;
}

// Update an entry in log by id and return count of changes
export function updateWateringEntry(entry: WateringLogEntry): number {
  const result = db.runSync(
    "UPDATE watering_log SET type = ?, done_at = ? WHERE id = ?",
    entry.type,
    entry.doneAt,
    entry.id,
  );
  return result.changes;
}

// Delete an entry from log by id and return count of changes
export function deleteWateringEntry(id: number): number {
  const result = db.runSync("DELETE FROM watering_log WHERE id = ?", id);
  return result.changes;
}
