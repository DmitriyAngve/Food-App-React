import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      // setIsLoading(true); // in case if useState(false)

      const response = await fetch(
        // "https://react-project-angve-3-default-rtdb.firebaseio.com/meals.json"
        "https://react-project-angve-3-default-rtdb.firebaseio.com/meals.json" // simulate the error
      );

      if (!response.ok) {
        throw new Error("Something wen wrong!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return <section className={classes.MealsError}>{httpError}</section>;
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

// ~~ FETCHING MEALS VIA HTTP ~~
// STEP: 1
// 1.1 ADD data for fetching from data base (Firebase in my case)
// 1.2 Delete "DUMMY_MEALS" array.
// 1.3 Let's change the code: add "fetch()".
// 1.4 need to fetch meals data from data-base, when "AvailableMeals" Component is loaded. I can utilize the "useEffect" hook for this.
// 1.4.1 Import "useEffect()" from React to trigger a side effect like fetching data from the web, when some data changes (or, as a mention above, when that Component is loaded for the first time).
// 1.4.2 Inside "useEffect" we put "fetch()" function (1.1)
// 1.4.2 In "fetch()" we wanna send an HTTP request to meals from data-base. Default "GET" request.
// Fetch returns a promise - dont forget! And HTTP request is a asynchronous task. I can add "then()" after request tp provide a function: "....then(() => {})", which is triggered when the request is done (received from Firebase), once we got a response. Or I can use async await.
// The function you pass to "useEffect" should not return a promise. That the function you pass to "useEffect" may return a cleanup function which can be executed. That cleanup function should run senchronously though. It should not retun a promise or anything like this. Overall function which we pass to "useEffect" must not be turned into a sync function. Instead, if I wanna use async await in the "useEffect" simply create a new function: "fetchMeals" and execute "fetchmeals" as a part of "useEffect". This function is still executed and I can still use "async-await". USEEFFECT DOES NOW NOT RETURN A PROMISE. It's now not an async function! because we have not added async.
// 1.5 Get a "response" for fetching our meals. Store fetching to const.
// 1.6 Now we can parse data: "responseData" by calling "const responseData = response.json()", which also returns a promise.
// Now we can utilize "responseData". Firebase specific: will always be an object where these ids (m1-m4) will be keys, and then the values for those keys will be nested objects with properties (look at Firebase).
// "responseData" will be an objects, and I want an array. Let's transorm this.
// 1.7 For transform we create a new constant "const loadedMeals = []" which is an empty array, and then I use a for/in loop to go through al lthe keys in "responseData" object (keys will be ids from Firebase and values will then be the nested objects)
// 1.8 Then wanna reach out to "loadedMeals" and "push" a new object into this initially empty array where we set the id property. We need to set id here, because we do expect our meals to have an id field ("id={meal.id}"). So we should make sure that we transform the loaded data such that we do have an id field. The "key" will be the "id" (from Firebase) of the individual meals we-re fetching.
// 1.9 "name: responseData" name can be pulled out of the "responseData" for the given "key" with that, we access the nested object in there and then that nested object will have a name field: "name: responseData[key].name,".
// 1.10 "description" the same.
// 1.11 (1.7 - 1.10) That was transforming the fetch data.
// Need to expose the fetching data to the rest of our Component, and we wanna re-render the Component once the fetching is done, because that's an asyncchronous task, which is only started after the Component loaded for the first time and initially, there will be no data and we wanna update the Component once the  data is there. Now, when we have data that changes and where a Component should be re-evaluated once it did change, whanever we have a use case like this, we need state.
// STEP: 2 (useState)
// 2.1 Import "useState".
// 2.2 Set up some state in this Component. In this case initially state will be an empty array because this state will be our meals (from data-base) and "setMeals" state-updating function. It's now the meals which I wanna use down -> instead of "DUMMY_MEALS" to render "MealsItems". "const mealsList = meals.map((meal) => (..." and initially, that's an empty array but that will change once the loaded data.
// After "for-loop" once we filled our "loadedMeals" helper constant with the transformed data, I wanna call "setMeals".
// 2.3 So I wanna call that state-updating function and pass in the "loadedMeals". So that array which we populated. With that, we're setting the data, and therefore then this Component ("MealItem") should update.
// For this "useEffect" dependency array is an empty array. We have no dependencies, which means this "useEffect" function will only run when the Component was first loaded. It will never run again thereafter.
// ~~ FETCHING MEALS VIA HTTP ~~

//

// ~~ HANDLING THE LOADING STATE ~~
// Now we add loading and error state. To achieve this, we need to manage more our state (useReducer or several useState's)
// STEP: 1
// 1.1 Add new state: "const [isLoading, setIsLoading] = useState(false)" and initially we're not loading (false).
// 1.2 Set initial state to true. Because we know that we always will start with loading data in this Component when the Component is rendered. If a have a Component where that's not necessarily the case, where you're not necessarily loading just because the Component was created for the first time, there you might not want to set this to "true"
// 1.3 After "setMeals(loadedMeals)" add "setIsLoading(false)" because we now definitel are done loading. And nowwe can use "setIsLoading" to control what we render
// We could say, that we don't wanna render our meals at all. So "<section className={classes.meals}..." this entire section should not be rendered at all if we're loading. I can check, if "isLoading" is true.
// STEP: 2
// 2.1 Add "ifcheck" check if "isLoading" is true. And if it true, I will return: "if (isLoading) {return (<section></section>..."
// 2.2 Let's stylled by adding a "<section className={classes.MealsLoading}>"
// 2.3 in CSS add a "MealsLoading"
// ~~ HANDLING THE LOADING STATE ~~

//

// ~~ HANDLING THE ERROR ~~
// STEP: 1
// For handling the error we need a third state that determines whether we have an error or not.
// 1.1 Add "const [httpError, setHttpError] = useState(false)" and initially set to null. (may be undefined or false - one of falsey). Set it to null to be more explicit about my goal of not having any value initially.
// 1.2 Set error. For this a wanna add "ifcheck" my "response" okay is falsey. ("if (!response.ok) {...}") If it's not ok!
// If we have some error status code reported back by the server. If that should be the case I wanna "throw" a new error here where I say "Something wen wrong". We could also look into the error response and see if the server gave us a more useful error string.
// 1.3 Go to the place where we call "fetchMeals", which is still inside of "useEffect()" but outside of the "fetchMeals" function and wrap this with try-catch. So we try calling "fetchMeals", but if inside of that function an error is thrown, as I wrote above, then we make it into this catch block, which is still inside the effect function but outside of the "fetchMeals" function.
// 1.4 For "catch" I wanna set "setIsLoading(false)" to false because we're not loading anymore. Even if it's an erro, we're done loading. And then I wanna "setHttpError" to the error we caught. '...}catch (error) { setIsLoading(false);setHttpError(error.message);}. So we do get access to that error here when using "try-catch" I can set "setHttpError(error)" to error.message.
// With that we should be setting this error state. Now we can also utilize that and can check (add "ifcheck").
// STEP 2:
// 2.1 Add "ifcheck" after "if(isLoading)". We can check if "httpError" is truthy, so if it has a string with some text inside of it. In that case return yet another state. Let's return a section with a text of "httpError" so where I output my error text.
// 2.2 Add a class "MealsError" to this <section>
// 2.3 Add appropriate CSS class.
// 2.4 Add await because "fetchMeals" is acyns function! It also returns a promise. Now, if we throw an error istead of a promise that error will cause that promise to reject. So I can't use "try-catch" to wrap it unless we also await for which we would need to turn our "useEffect" function into an async function, which were not allowed to do.
// I could still work around that, by putting that into a separete function, which I call thereafter. Need one more function - for error handling, but simply use ".catch()" method.
// 2.5 Since that returns a promise, I can add ".then()" to handle success cases when the promise fulfills successfully. And add ".catch()" to handle errors coming up inside of the promise
// 2.6 I wanna catch the error we're getting and move code "setIsLoading(false);setHttpError(error.message)" into catch block
// ~~ HANDLING THE ERROR ~~

//~~ ADDING A CHECKOUT FORM ~~
//
//~~ ADDING A CHECKOUT FORM ~~
