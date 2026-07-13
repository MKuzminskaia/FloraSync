import { db } from "./db";

export type Plant = {
  id: number;
  speciesId: number | null;
  nickname: string;
  location: string | null;
  photoUrl: string | null;
  potChangedAt: string | null;
};

export function getAllPlants(): Plant[] {
  return db.getAllSync<Plant>(
    "SELECT id, species_id AS speciesId, nickname, location, photo_url as photoUrl, pot_changed_at AS potChangedAt FROM plants",
  );
}

export function addNewPlant(plant: Omit<Plant, "id">): number {
  const result = db.runSync(
    "INSERT INTO plants (species_id, nickname, location, photo_url, pot_changed_at) VALUES (?,?,?,?,?)",
    plant.speciesId ?? null,
    plant.nickname,
    plant.location ?? null,
    plant.photoUrl ?? null,
    plant.potChangedAt ?? null,
  );
  return result.lastInsertRowId;
}
