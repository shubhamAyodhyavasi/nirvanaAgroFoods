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
  delivaryTax: 0,
};

/**
 * _getSubTotalPrice add to cart helper
 * @private
 * @param Array items
 * @returns number
 */
const _getSubTotalPrice = (items) =>
  items
    .map((item) => parseFloat(item.price) * parseInt(item.qnt))
    .reduce((a, b) => a + b);

/**
 * _getDelivaryPrice add to cart helper
 * @private
 * @param Array items
 * @returns number
 */
const _getDelivaryPrice = (items) => {
  const delivaryCharge = items.find((itm) => {
    return itm.tax;
  });
  return delivaryCharge.tax ? delivaryCharge.tax : 0;
  //return parseFloat(subtotalPrice) + parseFloat(delivaryCharge.tax);
};

/**
 * _getTotalPrice add to cart helper
 * @private
 * @param Array items
 * @returns number
 */
const _getTotalPrice = (items) => {
  const delivaryCharge = items.find((itm) => {
    return itm.tax;
  });
  const subtotalPrice = _getSubTotalPrice(items);
  return parseFloat(subtotalPrice) + parseFloat(delivaryCharge.tax);
};

/**
 * _removeFromCart remove from cart helper
 * @private
 * @param Object item
 * @param Object state
 */
const _removeFromCart = (item, state) => {
  const {items} = state;
  const {id} = item;
  const newItems = items.filter((item) => item.id !== id);
  return {
    ...state,
    items: newItems,
    subtotal: _getSubTotalPrice(newItems),
    total: _getTotalPrice(newItems),
    delivaryTax: _getDelivaryPrice(newItems),
  };
};
/**
 * _addToCart add to cart helper
 * @private
 * @param Object item
 * @param Object state
 */
const _addToCart = (item, state) => {
  const {items} = state;
  const {id, qnt} = item;
  oldItem = items.find((item) => item.id === id);
  if (oldItem) {
    const newItems = [
      ...items.filter((item) => item.id !== id),
      {
        ...oldItem,
        qnt: parseInt(oldItem.qnt) + parseInt(qnt),
      },
    ];
    return {
      ...state,
      items: newItems,
      subtotal: _getSubTotalPrice(newItems),
      total: _getTotalPrice(newItems),
      delivaryTax: _getDelivaryPrice(newItems),
    };
  } else {
    const newItems = [...items, item];
    return {
      ...state,
      items: newItems,
      subtotal: _getSubTotalPrice(newItems),
      total: _getTotalPrice(newItems),
      delivaryTax: _getDelivaryPrice(newItems),
    };
  }
};

/**
 * Action addToCart
 * @param Item: Object
 */
export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

/**
 * Action removeFromCart
 * @param Item: Object
 */
export const removeFromCart = (item) => ({
  type: REMOVE_FROM_CART,
  payload: item,
});

/**
 * Action clearCart
 */
export const clearCart = () => ({
  type: CLEAR_CART,
});

/**
 * Reducer
 */

export default function cartReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case CLEAR_CART:
      return initialState;

    case ADD_TO_CART:
      return _addToCart(payload, state);

    case REMOVE_FROM_CART:
      return _removeFromCart(payload, state);

    default:
      return state;
  }
}
