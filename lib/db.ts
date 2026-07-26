import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("flora.db");

db.execSync("PRAGMA foreign_keys = ON;");

export function initDb() {
  db.execSync(
    `
        CREATE TABLE IF NOT EXISTS species (
              id INTEGER PRIMARY KEY, 
              scientific_name TEXT NOT NULL, 
              common_name TEXT, 
              default_watering_interval_days INTEGER, 
              light TEXT, 
              soil_type TEXT);
        CREATE TABLE IF NOT EXISTS plants (
              id INTEGER PRIMARY KEY, 
              species_id INTEGER REFERENCES species(id) , 
              nickname TEXT NOT NULL, 
              location TEXT, 
              photo_url TEXT, 
              pot_changed_at TEXT, 
              watering_interval_days INTEGER);
        CREATE TABLE IF NOT EXISTS watering_log (
              id INTEGER PRIMARY KEY, 
              plant_id INTEGER NOT NULL REFERENCES plants(id) ON DELETE CASCADE, 
              type TEXT NOT NULL CHECK(type IN ('watering', 'misting')), 
              done_at TEXT NOT NULL);
        `,
  );
}

initDb();
