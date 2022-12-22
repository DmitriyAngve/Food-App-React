import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClose} />}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;

//~~ ADDING A CHECKOUT FORM ~~
// CAME FROM Checkout.js
// STEP 2:
// 2.1 Import Checkout
// 2.2 Render that Component below the div with total Amount.
// Let's make sure that this form only shows up once we did click on Order button.
// 2.3 Add "onClick" listener to button in JSX code. The "onClick" prop to triggered some function when it is clicked.
// 2.5 Add this new function, and wire up the Order button to the "orderHandler". And then show this "Checkout" Component conditionaly we need to use "useState".
// 2.6 Import "useState" from react
// 2.7 Then set up some state for this Cart Component. "const [isCheckout, setIsCheckout] = useState(false)" and initially we're not in checkout mode, because "false".
// 2.8 If we clicked on the "orderHandler" -> "setIsCheckout" to true then.
// 2.9 Now I can use the "isCheckout" state to conditionally render the "Checkout" Component -> add "check" in JSX code. "{isCheckout && <Checkout />}"
// 2.10
// STEP: 3
// Let's hide buttons when we clicked ORDER button and add a button SUBMIT to the front therefore, which still allows us to cancel.
// 3.1 Add conditional for render two buttons (ORDER CANCEL). For that I create new variable with both buttons (store <div>). "const modalActions..."
// 3.2 And then add "modalActions", which I wanna render conditionally if "!isCheckout"
// 3.3 Now let's add a new button to that form
// GO TO Checkout.js --->>>
// CAME FROM Checkout.js
// STEP: 5
// 5.1 Here we need to set our "onCancel" prop. And as a value I wanna point at the "onClose" prop value to forward that event even further. "{isCheckout && <Checkout onCancel={props.onClose} />}" And now we have some props drilling here. So we're passing props through multiple levels of components.
// GO TO Checkout.js --->>>
//~~ ADDING A CHECKOUT FORM ~~
