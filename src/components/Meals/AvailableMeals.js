import { useState, useEffect } from "react";

import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformMeals = (mealsObj) => {
      const loadedMeals = [];

      for (const mealKey in mealsObj) {
        loadedMeals.push({
          id: mealKey,
          name: mealsObj[mealKey].name,
          description: mealsObj[mealKey].description,
          price: mealsObj[mealKey].price,
        });
      }

      setMeals(loadedMeals);
    };
    fetchMeals(
      {
        url: "https://react-http-499de-default-rtdb.europe-west1.firebasedatabase.app/meals.json",
      },
      transformMeals
    );
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let context = <p>Found no meals.</p>;

  if (isLoading) {
    context = (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    context = (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }

  if (meals.length > 0) {
    context = (
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    );
  }

  return <section className={classes.meals}>{context}</section>;
};

export default AvailableMeals;
