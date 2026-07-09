import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("flora.db");

export function initDb() {
  db.execSync(
    `CREATE TABLE IF NOT EXISTS species (id INTEGER PRIMARY KEY, scientific_name TEXT NOT NULL, common_name TEXT, default_watering_interval INTEGER, light TEXT, soil_type TEXT);
         CREATE TABLE IF NOT EXISTS plants (id INTEGER PRIMARY KEY, species_id INTEGER , nickname TEXT NOT NULL, location TEXT, photo_url TEXT, pot_changed_at TEXT);`,
  );
}

initDb();
