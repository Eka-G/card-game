import { dataBase, Collection } from '../index';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

type CurrentUser = User | null;
type Listener = (user: CurrentUser) => void;

class Authorization {
  public currentUser: CurrentUser = null;

  private readonly listeners = new Set<Listener>();

  public async createUser(user: User) {
    const newUser = await dataBase.set(Collection.Users, user.email, user);

    this.currentUser = user;

    this.listeners.forEach((listener) => listener(this.currentUser));

    return newUser;
  }

  public addListener(listener: Listener) {
    this.listeners.add(listener);
  }
}

export default new Authorization();
