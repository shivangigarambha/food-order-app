import { createContext, useReducer } from "react";

 const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

function cartReducer(state, action) {
  const { type } = action;
  const updatedItems = [...state.items];

  if (type ==='ADD_ITEM') {
    const existingItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];
    if (existingItemIndex > -1) {
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 }
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  if (type === 'REMOVE_ITEM') {
    const existingItemIndex = state.items.findIndex(
      item => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    if (existingItem.quantity === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 }
      updatedItems[existingItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  if (type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
  
  function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  }
  
  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id })
  }

  function clearCart() {
    dispatchCartAction({ type: 'CLEAR_CART' })
  }
  
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem ,
    clearCart 
  }
  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;