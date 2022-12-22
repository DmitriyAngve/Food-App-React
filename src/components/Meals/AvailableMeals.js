import { useEffect } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
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
// 1.4.1 Import "useEffect()"
// ~~ FETCHING MEALS VIA HTTP ~~
