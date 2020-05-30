/**
 * types
 */

const UPDATE_TO_ORDER = 'UPDATE_TO_ORDER';

/**
 * constant initial state 
 * used for initial cart state
 */

const initialState = {
    orderData: {},
}



/**
 * _setOrderData add and update helper
 * @private
 * @param Object item 
 * @param Object state
 */
const _setOrderData = (item, state) => {
       return {
            ...state,
            orderData: item
        }
 }

/**
 * Action addToCart 
 * @param Item: Object
 */
export const updateOrder = (item) => ({
    type: UPDATE_TO_ORDER,
    payload: item
})


/**
 * Reducer
 */

export default function cartReducer(state = initialState, action){
    const {
        type,
        payload
    } = action
    switch (type) {
       case UPDATE_TO_ORDER:
            return _setOrderData(payload,state)

        default:
            return state;
    }
}