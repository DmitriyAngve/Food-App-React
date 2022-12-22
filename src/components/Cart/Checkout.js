import { useRef } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current;
    const enteredStreet = streetInputRef.current;
    const enteredPostalCode = postalCodeInputRef.current;
    const enteredCity = cityInputRef.current;
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

//~~ ADDING A CHECKOUT FORM ~~
// Let's implement ORDER button. Expand Modal window. After click ORDER button the users should enter the address and the name, and they can confirm that input to send off that order to the backend.
// STEP: 1. Add that form and to add validation to that form
// 1.1 For that need new Component: Checkout.js.
// 1.2 Create new Component "Checkout".
// 1.3 Import classes.
// 1.4 Add JSX code. We wanna return a form with the various inputs for the different values we wanna fetch
// 1.5 For this I'll wrap every input into a <div> with a className of classes.control (from css)
// 1.6 And in there I can add <label htmlFor="name">Your Name</label> with name of the user.
// 1.7 Input with an idea of name with an ID of name should be matching that value: "<label htmlFor="name"..." for accessibility.
// 1.8 Now also add another input where I fetched the address of the user
// 1.9 Now also add another input where I fetched the postal code of the user
// 1.10 Now also add another input where I fetched the city of the user
// 1.11 Add button to confirm all this.
// GO TO Cart.js --->>>
// CAME FROM Cart.js
// STEP: 4
// 4.1 I'll add a second button where I say cancel and important with type of button so that it doesn't submit the form.
// I wanna handle both button clicks. If we click the CANCEL button I wanna close modal, and that therefore means that I in the end wanna do the same thing as I did in the "Cart" Component when CLOSE button was clicked. There we triggered "props.onClose". So in the end I wanna triggered that same function now from inside the "Checkout" Component.
// 4.2 The CANCEL button onClick. I expect to get some function through props which I can forward this event to. Expect the "onCancel" prop. "<button type="button" onClick={props.onCancel}>", which means that now when we use "Checkout" in the "Cart" Component, we need to set our "onCancel" prop
// GO TO Cart.js
// CAME FROM Cart.js
// STEP: 6
// Let's work with Submit button.
// 6.1 Add new function "confirmHandler" where we get a "event" object and we will get that automatically because I bind this function to the "onSubmit" event. Add to "<form onSubmit={confirmHandler}>"
// 6.2 to ensure that the browser default which would be to send an HTTP request is prevented (this request is not sent). With that this button will triggered this form submission and will therefore trigger "confirmHandler" function.
//~~ ADDING A CHECKOUT FORM ~~

//~~ STYLING ~~
// STEP: 1
// Now make sure we do get the values the user entered. We then validate them however we want. And we then also either show an error message if something's wrong with entered data or we submit it to a server. Start with getting the entered data:
// 1.1 Use "useRef" to get the values only once the form is submitted. import "useRef"
// 1.2 Then we can create a reference by calling "useRef" and we'll get a reference for our "nameInputRef" and other for all inputs
// 1.3 Need to connect thise refs to the form elements in JSX code with special "ref={}" prop.
// Now this refs are connected and now we can use them to read whatever the user entered when the form is submitted.
// 1.4 Now for this, we've got our "confirmHandler" and here we can then get "enteredName" by reaching out to the "nameInputRef.current" - current always gives you access to the actual value stored in the ref. Since we can access to input element we can access ".value" because every input elements objects has a value property that holds the actual value entered in that input element. Now I can validate this.
//~~ STYLING ~~
