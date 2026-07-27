import { db } from "./db";

const PLANT_COLUMNS = `id, species_id AS speciesId, nickname, location, photo_url AS photoUrl, pot_changed_at AS potChangedAt, watering_interval_days AS wateringIntervalDays`;

export type Plant = {
  id: number;
  speciesId: number | null;
  nickname: string;
  location: string | null;
  photoUrl: string | null;
  potChangedAt: string | null;
  wateringIntervalDays: number | null;
};

export function getAllPlants(): Plant[] {
  return db.getAllSync<Plant>(`SELECT ${PLANT_COLUMNS} FROM plants`);
}

//Insert new plant and return id number of inserted plant
export function addNewPlant(plant: Omit<Plant, "id">): number {
  const result = db.runSync(
    "INSERT INTO plants (species_id, nickname, location, photo_url, pot_changed_at, watering_interval_days) VALUES (?,?,?,?,?,?)",
    plant.speciesId ?? null,
    plant.nickname,
    plant.location ?? null,
    plant.photoUrl ?? null,
    plant.potChangedAt ?? null,
    plant.wateringIntervalDays ?? null,
  );
  return result.lastInsertRowId;
}

//Return one plant by id
export function getPlantById(id: number): Plant | null {
  const result = db.getFirstSync<Plant>(
    `SELECT ${PLANT_COLUMNS} FROM plants WHERE id = ?`,
    id,
  );
  return result;
}

//Delete the plant from DataBase by id
export function deletePlant(id: number): number {
  const result = db.runSync("DELETE FROM plants WHERE id = ?", id);
  return result.changes;
}
//Update the plant by id
export function updatePlant(id: number, plant: Omit<Plant, "id">): number {
  const result = db.runSync(
    "UPDATE plants SET species_id = ?, nickname = ?, location = ?, photo_url = ?, pot_changed_at = ?, watering_interval_days = ? WHERE id = ?",
    plant.speciesId ?? null,
    plant.nickname,
    plant.location ?? null,
    plant.photoUrl ?? null,
    plant.potChangedAt ?? null,
    plant.wateringIntervalDays ?? null,
    id,
  );
  return result.changes;
}
