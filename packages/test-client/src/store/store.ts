import { readonly } from "vue";
import { createAction } from "./actions";
import { IState, createState } from "./state";
import { createPersistStorage } from "./lib";

const state = createState();
const action = createAction(state);

const useStore = () => {
  const store = {
    // state: readonly(state),
    state: createPersistStorage<IState>(state),
    action: readonly(action),
  };

  return store;
};
export default useStore();
