import { Event } from "../components/DayView";

const DB_NAME = "calendar_db";
const DB_VERSION = 1;
const OBJECT_STORE_NAME = "calendar_events";

function createIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error(
        "Error opening database:",
        (event.target as IDBRequest).error
      );
      reject("Error opening database");
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;

      // Check if the object store already exists (to avoid errors during repeated database upgrades)
      if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
        const objectStore = db.createObjectStore(OBJECT_STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        objectStore.createIndex("date", "date", { unique: false });
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      resolve(db);
    };
  });
}

export function populateIndexedDBWithEvents(events: Event[]): Promise<void> {
  return new Promise((resolve, reject) => {
    createIndexedDB()
      .then((db) => {
        const transaction = db.transaction([OBJECT_STORE_NAME], "readwrite");
        const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

        // Clear the object store before adding new events (optional)
        const clearRequest = objectStore.clear();
        clearRequest.onsuccess = () => {
          // Add the new events to the object store
          events.forEach((event) => {
            objectStore.add(event);
          });
        };

        transaction.oncomplete = () => {
          resolve();
        };

        transaction.onerror = (event) => {
          console.error(
            "Error populating IndexedDB:",
            (event.target as IDBRequest).error
          );
          reject("Error populating IndexedDB");
        };
      })
      .catch((error) => {
        console.error("Error opening IndexedDB:", error);
        reject("Error opening IndexedDB");
      });
  });
}

export function fetchEventDataFromIndexedDB(): Promise<{
  calendar_events: Event[];
}> {
  return new Promise((resolve, reject) => {
    createIndexedDB()
      .then((db) => {
        const transaction = db.transaction([OBJECT_STORE_NAME], "readonly");
        const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
        const getRequest = objectStore.getAll();

        getRequest.onerror = (event) => {
          console.error(
            "Error fetching data:",
            (event.target as IDBRequest).error
          );
          reject("Error fetching data");
        };

        getRequest.onsuccess = (event) => {
          const data = (event.target as IDBRequest).result;
          resolve({ calendar_events: data });
        };
      })
      .catch((error) => {
        console.error("Error opening IndexedDB:", error);
        reject("Error opening IndexedDB");
      });
  });
}
