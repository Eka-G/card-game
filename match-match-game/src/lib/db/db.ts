import { Collection, COLLECTIONS, DB_NAME } from './constants';

class DataBase {
  private readonly dbReq = indexedDB.open(DB_NAME, 1);

  private db: IDBDatabase | undefined;

  constructor() {
    this.dbReq.onupgradeneeded = () => {
      this.db = this.dbReq.result;

      COLLECTIONS.forEach((collection) => this.db?.createObjectStore(collection, { keyPath: 'id' }));
    };

    this.dbReq.onsuccess = () => {
      this.db = this.dbReq.result;
    };

    this.dbReq.onerror = () => {
      console.error('Error', this.dbReq.error);
    };
  }

  set(collection: Collection, id: string, data: unknown) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database is not defined'));

        return;
      }

      const tx = this.db.transaction([collection], 'readwrite');
      const store = tx.objectStore(collection);
      const req = store.put({ id, data });

      tx.oncomplete = () => {
        resolve(data);
      };
      tx.onerror = () => {
        reject(req.error);
      };
    });
  }

  get(collection: Collection, id: string) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database is not defined'));

        return;
      }

      const tx = this.db.transaction([collection], 'readwrite');
      const store = tx.objectStore(collection);
      const req = store.get(id);

      tx.oncomplete = () => {
        resolve(req.result);
      };
      tx.onerror = () => {
        reject(req.error);
      };
    });
  }

  getAll(collection: Collection) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database is not defined'));

        return;
      }

      const tx = this.db.transaction([collection], 'readwrite');
      const store = tx.objectStore(collection);
      const req = store.getAll();

      tx.oncomplete = () => {
        resolve(req.result);
      };
      tx.onerror = () => {
        reject(req.error);
      };
    });
  }
}

export default new DataBase();
