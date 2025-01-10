import { makeObservable, observable } from "mobx";

export default class ActivtyStore {
  title = "Hello from MobX";

  constructor() {
    makeObservable(this, {
      title: observable,
    });
  }
}
