import { reactive } from 'vue';

export interface IState {
  user: any;
}

export const State: IState = {
  user: {},
};

export function createState() {
  return reactive(State);
}
