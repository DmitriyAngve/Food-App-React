import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;

// ~~ CLEAR CART AFTER ORDER ~~
// CAME FROM CartProvider.js
// STEP: 2
// 2.1 Add function for better auto-completion; "clearCart: () => {}"
// GO TO CartProvider.js --->>>
// ~~ CLEAR CART AFTER ORDER ~~
