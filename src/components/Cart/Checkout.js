import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) =>
  value.trim().length === 5 || value.trim().length === 6;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
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

//

// ~~ ADDING FORM VALIDATION ~~
// I wanna check that all my values are not empty and "enteredPostalCode" ihave five digits long
// STEP: 1
// For this I'll add helper functions outside of the Component function.
// 1.1 First function: "const isEmpty = (value) => value.trim() === "" " - return "true" if "value" is empty.
// 1.2 Second function: "const isFiveChars = value =>  value.trim().length === 5"
// This two helper func can be used to now validate those entered values.
// 1.3 We can add a new constant "enteredNameIsValid", inside of "confirmHandler", and that should be true if we can call "isEmpty(enteredName)" and pass in the "enteredName" and that then returns "false" (if it's not empty). "const enteredNameIsValid = !isEmpty(enteredName)" => if the "enteredName" is not empty, this is valid.
// 1.4 Repeat this for the street.
// 1.5 Repeat this for the city.
// 1.6 For Postal Code => "const enteredPostalCodeIsValid = isFiveChars(enteredCity)"
// Now we can check if the overall form is valid, by combining all these values. Only if all four constants here have a value of true, the overall form is valid.
// 1.7 Add constant "const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;"
// 1.8 Add "ifcheck" "if(!formIsValid) {}". i'll check if not "formIsValid" and then I wanna set an error and give some feedback to the user regarding what went wrong.
// For that, I will return to here to not continue with code execution because later I will submit the cart data here and I don't wanna reach that code if the form is invalid. But before we make it ti this "ifcheck" I wanna update some state to give the user some feedback.
// Let's use "useState"
// STEP: 2
// Now I will register a new state here with "useState()". We could use four individual state slices or one combined slice (I choose 1 combined)
// 2.1 Import useState
// 2.2 Call "useState()"
// 2.3 "const [formInputValidity, setFormInputsValidity] = useState({})" initial state of "useState({})" - object, where I have a name field, a street field, postalCode and city. I wanna have true of false as values here, determining whether the field is valid or not, innitially, I'll treat them as valid event though they technically aren't but I don't wanna show error messages at the beginning
// Now, we could work with the touched state in addition to the validity state. The goal is to update the correct field for the defferent inputs here when we submitted the form to update those true values with the actual validity after we tried to submit the form.
// 2.4 Before we even derive "formIsValid" set the "setFormInputsValidity" state to new object ("setFormInputsValidity({});"). And here I wanna set the name field to enteredNameIsValid: "name: enteredNameIsValid" and so on
// I'll use those inferred validities, which we infer as new values for the different keys in this state object. We don't need the function form of this state updating function for updating here, because I am overriding the entire state with a brand new object where I do assign new values to all my keys.
// 2.5 We can now utilize that in the JSX code. For example. to show an error message. For name we could check if "formInputsValidity.name" (so if we dive into the name field), if that is NOT true than we wanna show a paragraph "{!formInputValidity.name && <p>Please enter a valid name!</p>}"
// 2.6 Add this check to each inputs
// In Checkout.module.css add invalid class, let's use it. If an input is invalid to show extra error styles
// 2.7 In name input instead of just adding the control class, set up a template literal to always inject the control class into the sting, but to also inject another class if that input should be invalid. If "formInputsValidity.name" is true, I don't wanna add ane extra string, but if it false, I wanna add classes.invalid here. With that we add the extra invalid class to that list of classes if that input is not valid.
// 2.8 Add new variables: "const nameControlClasses = `${classes.control} ${ formInputsValidity.name ? "" : classes.invalid}`" and use it in all inputs. we just point at "nameControlClasses".
// ~~ ADDING FORM VALIDATION ~~

//

// ~~ SUBMITTING AND SENDING CART DATA ~~
// CAME FROM Cart.js
// STEP: 2
// "onConfirm" as the prop name hance in here (in Checkout.js) in "confirmHandler". Once we validated everything down here, we now wanna call "props.onConfirm" - that prop name we're expecting from Cart.js and now forward that userData, which should be an object, because I'm not expecting multiple arguments (because I expecting only one argument - the collected "userData").
// 2.1 let's group that "userData" into an object: "name: enteredName," and so on
// With that we pass the data from the "Checkout" Component to the "Cart" Component.
// GO TO Checkout.js --->>>
// ~~ SUBMITTING AND SENDING CART DATA ~~
