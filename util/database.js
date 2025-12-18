import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const databasePromise = SQLite.openDatabaseAsync("place.db");

export async function init() {
  const db = await databasePromise;

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    );
  `);
}

export async function insertPlace(place) {
  const db = await databasePromise;

  const result = await db.runAsync(
    `
    INSERT INTO places
     (
      title,
      imageUri,
      address,
      lat,
      lng
     )
    VALUES (
      ?,
      ?,
      ?,
      ?,
      ?
    );
  `,
    [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
    ],
  );
}
export async function fetchPlaces() {
  const db = await databasePromise;

  const result = await db.getAllAsync(
    `
    SELECT * FROM places;
  `,
    [],
  );
  let formattedResult = [];

  for (const place of result) {
    formattedResult.push(
      new Place(
        place.title,
        place.imageUri,
        {
          address: place.address,
          lat: place.lat,
          lng: place.lng,
        },
        place.id,
      ),
    );
  }
  return formattedResult;
}

export async function fetchPlaceDetails(id) {
  const db = await databasePromise;

  const result = await db.getFirstAsync(
    `
    SELECT * FROM places WHERE id = ?;
  `,
    [id],
  );
  let formattedResult = new Place(
    result.title,
    result.imageUri,
    {
      address: result.address,
      lat: result.lat,
      lng: result.lng,
    },
    result.id,
  );
  return formattedResult;
}
