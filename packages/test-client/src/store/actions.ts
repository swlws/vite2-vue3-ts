import { IState } from './state';

function updateUser(state: IState) {
  return (user: any) => {
    state.user = user;
  };
}

/**
 * 创建Action
 * @param state
 */
export function createAction(state: IState) {
  return {
    updateUser: updateUser(state),
  };
}
