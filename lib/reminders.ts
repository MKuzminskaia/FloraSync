import type { ReminderType } from "@/lib/care-events";
import { db } from "@/lib/db";

export type Reminder = {
  id: number;
  plantId: number;
  type: ReminderType;
  dueAt: string;
  notificationId: string | null;
};

// Add a new reminder in schedule, return an id of new inserted row
export function addReminder(entry: Omit<Reminder, "id">): number {
  const result = db.runSync(
    "INSERT INTO reminders(plant_id, type, due_at, notification_id) VALUES (?,?,?,?)",
    entry.plantId,
    entry.type,
    entry.dueAt,
    entry.notificationId,
  );
  return result.lastInsertRowId;
}

// Return a list from reminders for a plant by id
export function getRemindersForPlant(plantId: number): Reminder[] {
  const result = db.getAllSync<Reminder>(
    "SELECT id, plant_id, type, due_at, notification_id FROM reminders WHERE plant_id = ? ORDER BY due_at DESC",
    plantId,
  );
  return result;
}

// Return info about one reminder from reminders for a plant
export function getReminderById(id: number): Reminder | null {
  const result = db.getFirstSync<Reminder>(
    "SELECT id, plant_id, type, due_at, notification_id FROM reminders WHERE id = ?",
    id,
  );
  return result;
}

// Update a reminder by id and return count of changes
export function updateReminder(entry: Reminder): number {
  const result = db.runSync(
    "UPDATE reminders SET plant_id = ?, type = ?, due_at = ?, notification_id = ? WHERE id = ?",
    entry.plantId,
    entry.type,
    entry.dueAt,
    entry.notificationId,
    entry.id,
  );
  return result.changes;
}

// Delete an entry from reminders by id and return count of changes
export function deleteReminder(id: number): number {
  const result = db.runSync("DELETE FROM reminders WHERE id = ?", id);
  return result.changes;
}
