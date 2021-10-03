import React, { useState } from "react";
import Chart from "./components/chart.js";
import Details from "./components/details.js";
import "./App.css";

function App() {
  // TODO: Create a state variable to hold the five numbers to track. This should be an object with five properties: steps, water, food, exercise, and net. They should each be initialized with with a zero value (as a number).  Notice the hook you need has been imported at the top.
  const [userInput, setUserInput] = useState({
    enteredSteps: 0,
    enteredWater: 0,
    enteredFood: 0,
    enteredExercise: 0,
    enteredNet: 0,
  });

  // TODO: Create a state variable to track which tab should be displayed.
  // Initialize it to the string "net".
  const [type, setType] = useState("net");

  // TODO: Inside each of the following handlers, update the corresponding numbers property from state.
  const handleUpdateSteps = (amount) => {
    // You can use your setter to update the state variable directly with the new amount.
    setUserInput((prevState) => {
      return { ...prevState, enteredSteps: amount };
    });
  };
  const handleUpdateWater = (amount) => {
    // You can use your setter to update the state variable directly with the new amount
    setUserInput((prevState) => {
      return { ...prevState, enteredWater: amount };
    });
  };
  const handleUpdateFood = (amount) => {
    // You'll need to update both the food calories and the net calories here (add calories consumed). Use prevState to ensure you are adding the new amount to the existing total.
    setUserInput((prevState) => {
      return {
        ...prevState,
        enteredFoodCalories: prevState.enteredFoodCalories + amount,
        enteredNet: prevState.enteredNet + amount,
      };
    });

  };
  const handleUpdateExercise = (amount) => {
    // You'll need to update both the food calories and the net calories here (subtract calories burned). Use prevState to ensure you are adding the new amount to the existing total.
    // setUserInput((prevState) => {
    //     return{...prevState, enteredStepsExerciseCalories: amount};
    //  });
    //  setUserInput((prevState) => {
    //     return{...prevState, enteredExerciseDescription: amount};
    //  });
  };

  // TODO: Change the current type of details to be displayed.
  const handleCurrTypeChange = (type) => {
    // Use the setter from state.
    setType(type);
  };

  // JSX to display all content on page
  return (
    <div className="app">
      <header className="app-header">
        <h1>Healthy Habits</h1>
      </header>

      {/* TODO: Pass the numbers object into the Chart component as a prop */}
      <Chart numbers={userInput} />

      <div className="tabs-container">
        <div
          className="tab net-bkg"
          onClick={() => handleCurrTypeChange("net")}
        >
          INFO
        </div>

        <div
          className="tab water-bkg"
          onClick={() => handleCurrTypeChange("water")}
        >
          WATER+
        </div>

        <div
          className="tab steps-bkg"
          onClick={() => handleCurrTypeChange("steps")}
        >
          STEPS+
        </div>

        <div
          className="tab food-bkg"
          onClick={() => handleCurrTypeChange("food")}
        >
          FOOD+
        </div>

        <div
          className="tab exercise-bkg"
          onClick={() => handleCurrTypeChange("exercise")}
        >
          EXERCISE+
        </div>
      </div>

      {/* TODO: Pass the current type into the Details component */}
      {/* TODO: Pass the four update handler functions to the Details component below. Check the propTypes object at the bottom of Details.js to get the prop names, then look just below the state variables in this file to get the names of the handler functions. */}
      <Details
        type={type}
        updateSteps={handleUpdateSteps}
        updateWater={handleUpdateWater}
        updateFood={handleUpdateFood}
        updateExercise ={handleUpdateExercise}
      />
    </div>
  );
}

export default App;
