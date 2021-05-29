import { dataBase, Collection } from '../index';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

class Authorization {
  public currentUser: User | null = null;

  async createUser(user: User) {
    const newUser = await dataBase.set(Collection.Users, user);

    this.currentUser = user;

    return newUser;
  }
}

export default new Authorization();
