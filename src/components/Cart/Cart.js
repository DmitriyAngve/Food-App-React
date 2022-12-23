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

  const submitOrderHandler = (userData) => {
    fetch(
      "https://react-project-angve-3-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
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
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
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

//

// ~~ SUBMITTING AND SENDING CART DATA ~~
// STEP: 1
// 1.1 Add a new function in taht "Cart" Component. In this function I expect to get the "userData" (as a argument, as a parameter). We already get access to the cart data through the cart context. And therefore, all we now gotta do is make sure that this "submitOrder" function is called from inside to the "Checkout" Component and that it receives that "userData".
// 1.2 So for that, I'll pass it to the "Checkout" Component through a prop. Add "onConfirm" (name custom), where I point at the "submitOrderHandler". ("<Checkout onConfirm={submitOrederHandler}...").
// GO TO Checkout.js --->>>
// CAME FROM Checkout.js
// STEP: 3
// In there we now wanna send the request to the backend and we wanna send both the user data as well as the cart data.
// 3.1 Now for this, we can use the "fetch" function (in "submitOrderHandler" ) and send the request to Firebase (to Firebase URL) and then to a new Node of our choice. ("fetch("https://react-project-angve-3-default-rtdb.firebaseio.com/order.json");")
// order.json will be created dynamically
// 3.2 Important thing: this request should be a "POST" request. So we need to pass this configuration object as a second argument to "fetch" and set "method" to "POST".
// 3.3 We then also need to add the "body" and set this to "JSON.stringify", since we need to send JSON data and pass in all our data and pass in all our data and that's an object with the "userData". We could set a user field "user: userData" and pass the user data we're getting from "userData" (as a argument or parameter) as a value for that field and then maybe add a ordered items field "orderedItems: " - that should then be our cart. Now for this we have our cart context ("cartCtx") where we get our items. So we can then set: "orderedItems: cartCtx.items"
// That's the data we're then sending to the
// ~~ SUBMITTING AND SENDING CART DATA ~~
