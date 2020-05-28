/**
 * types
 */
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';

/**
 * constant initial state 
 * used for initial cart state
 */

const initialState = {
    items: [],
    subtotal: 0,
    discount: 0,
    total: 0,
}


/**
 * _getTotalPrice add to cart helper
 * @private
 * @param Array items 
 * @returns number
 */
const _getTotalPrice = items => items.map(item => parseFloat(item.price) * parseInt(item.qty)).reduce((a,b)=> a+b)

/**
 * _removeFromCart remove from cart helper
 * @private
 * @param Object item 
 * @param Object state
 */
const _removeFromCart = (item, state) => {
    const {
        items,
    } = state
    const {
        id,
    } = item
    const newItems = items.filter(item => item.id !== id)
    return {
        ...state,
        items: newItems,
        subtotal: _getTotalPrice(newItems),
        total: _getTotalPrice(newItems)
    }
}
/**
 * _addToCart add to cart helper
 * @private
 * @param Object item 
 * @param Object state
 */
const _addToCart = (item, state) => {
    const {
        items
    } = state
    const {
        id,
        qty
    } = item
    console.log("------")
    oldItem = items.find(item => item.id === id)
    if(oldItem){
        const newItems = [
            ...items.filter(item => item.id !== id),
            {   
                ...oldItem,
                qty: parseInt(oldItem.qty) + parseInt(qty)
            }
        ]
        return {
            ...state,
            items: newItems,
            subtotal: _getTotalPrice(newItems),
            total: _getTotalPrice(newItems)
        }
    }else{
        const newItems = [
            ...items,
            item
        ]
        return {
            ...state,
            items: newItems,
            subtotal: _getTotalPrice(newItems),
            total: _getTotalPrice(newItems)
        }
    }
}

/**
 * Action addToCart 
 * @param Item: Object
 */
export const addToCart = (item) => ({
    type: ADD_TO_CART,
    payload: item
})

/**
 * Action removeFromCart 
 * @param Item: Object
 */
export const removeFromCart = (item) => ({
    type: REMOVE_FROM_CART,
    payload: item
})

/**
 * Action clearCart 
 */
export const clearCart = () => ({
    type: CLEAR_CART
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
        case CLEAR_CART:
            return initialState;

        case ADD_TO_CART:
            return _addToCart(payload,state)

        case REMOVE_FROM_CART:
            return _removeFromCart(payload,state)
    
        default:
            return state;
    }
}