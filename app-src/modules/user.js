/**
 * types
 */
const SET_USER = 'SET_USER';
const UNSET_USER = 'UNSET_USER';
const UPDATE_USER = 'UPDATE_USER';

/**
 * constant initial state
 * used for initial cart state
 */

const initialState = {};

/**
 * Action setUerState save user detail to redux
 * @param user: Object
 */
export const setUerState = (user) => ({
  type: SET_USER,
  payload: user,
});

/**
 * Action unsetUserState remove user from redux
 *
 */
export const unsetUserState = () => ({
  type: UNSET_USER,
});

/**
 * Action updateUserState update stored user
 * @param details: Object
 */
export const updateUserState = (details) => ({
  type: UPDATE_USER,
  payload: details,
});

/**
 * Reducer
 */

export default function cartReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case UNSET_USER:
      return initialState;

    case SET_USER:
      return payload;

    case UPDATE_USER:
      return {
        ...state,
        payload,
      };

    default:
      return state;
  }
}
