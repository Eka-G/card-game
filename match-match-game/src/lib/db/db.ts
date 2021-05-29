import { Collection } from './constants';

class DataBase {
  private readonly dbReq = indexedDB.open('Eka-G', 1);

  private db: IDBDatabase | undefined;

  private users: IDBObjectStore | undefined;

  private scores: IDBObjectStore | undefined;

  constructor() {
    this.dbReq.onupgradeneeded = () => {
      this.db = this.dbReq.result;

      this.users = this.db.createObjectStore(Collection.Users, { autoIncrement: true });
      this.scores = this.db.createObjectStore(Collection.Scores, { autoIncrement: true });
    };

    this.dbReq.onsuccess = () => {
      this.db = this.dbReq.result;
    };

    this.dbReq.onerror = () => {
      console.error('Error', this.dbReq.error);
    };
  }

  set(collection: Collection, data: unknown) {
    return new Promise((res, rej) => {
      if (!this.db) return;

      const tx = this.db.transaction([collection], 'readwrite');

      const store = tx.objectStore(collection);

      store.add(data);

      tx.oncomplete = () => {
        res(data);
      };
      tx.onerror = () => {
        rej();
      };
    });
  }
}

export default new DataBase();
