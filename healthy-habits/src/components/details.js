import React, {useState} from "react";
import PropTypes from "prop-types";
import uuid from "react-uuid"; // Universally Unique ID generator
import "../App.css";

const Details = (props) => {

    // TODO: Create state variables to hold values of form input fields.
    // Initialize them as empty strings.
    // Don't forget to import the hook you need.
    const [inputWater, setInputWater] = useState("");
    const [inputSteps, setInputSteps] = useState("");
    const [inputFoodDescription, setInputFoodDescription] = useState("");
    const [inputFoodCalories, setInputFoodCalories] = useState("");
    const [inputExerciseCalories, setInputExerciseCalories] = useState("");
    const [inputExerciseDescription, setInputExerciseDescription] = useState("");


    // TODO: Create state variables to hold full lists of food and exercise
    // Initialize them as empty arrays.
const [foodList, setFoodList] = useState([]);
const [exerciseList, setExerciseList] = useState([]);

    // Steps input handler (note e = event)
    const handleStepsChange = e => {
        e.preventDefault();
        let amount = Number(e.target.value);
        // TODO: set the new value in state
        setInputSteps(amount);
        // TODO: call the update handler via props and pass in the amount
        props.updateSteps(amount);
    }

    // Water input handler
    const handleWaterChange = e => {
        e.preventDefault();
        let amount = Number(e.target.value);
        // TODO: set the new value in state
        setInputWater(amount);
        // TODO: call the update handler via props and pass in the amount
        props.updateWater(amount)
    }

    // Food input handlers
    const handleFoodDescChange = e => {
        e.preventDefault();
        let desc = e.target.value;
        // TODO: set the new value in state
       setInputFoodDescription(desc);
    }
    const handleFoodCalChange = e => {
        e.preventDefault();
        let amount = Number(e.target.value);
        // TODO: set the new value in state
        setInputFoodCalories(amount);
    }
    const handleSubmitFood = e => {
        e.preventDefault();
        let newFoodEntry = {
            id: uuid(), 
            desc: handleFoodDescChange,
            cal: handleFoodCalChange,
            // TODO: Add desc & cal properties with values from state
            desc: inputFoodDescription,
            cal: inputFoodCalories
        }
        // TODO: use prevState to add the new entry to the food list (once you've created it later)
        setFoodList(prevState => [...prevState, newFoodEntry]);
        // TODO: call the update handler via props and pass in the calories
        props.updateFood(inputFoodCalories)
        // TODO: reset the food desc and cal input values to an empty string
        setInputFoodCalories("");
        setInputFoodDescription("");
    }

    // Exercise input handlers
    const handleExerciseDescChange = e => {
        e.preventDefault();
        let desc = e.target.value;
        // TODO: set the new value in state
        setInputExerciseDescription(desc);
    }
    const handleExerciseCalChange = e => {
        e.preventDefault();
        let amount = Number(e.target.value);
        // TODO: set the new value in state
        setInputExerciseCalories(amount);
    }
    const handleSubmitExercise = e => {
        e.preventDefault();
        let newExerciseEntry = {
            id: uuid(),
            // TODO: Add desc & cal properties with values from state
            desc: inputExerciseDescription,
            cal: inputExerciseCalories
        }
        // TODO: use prevState to add the new entry to the exercise list (once you've created it later)
        setExerciseList(prevState => [...prevState, newExerciseEntry]);
        // TODO: call the update handler via props and pass in the calories from newExerciseEntry
        props.updateExercise(inputExerciseCalories)
        // TODO: reset the exercise desc and cal input values to an empty string
        setInputExerciseCalories("");
        setInputExerciseDescription("");
    }

    // Small helper components like this don't need a separate file
    const DetailsTable = params => {
        // This creates table rows for each object in the list passed in
        const rows = params.list.map(item => {
            return (
                <tr id={item.id} key={item.id}>
                    <td className="desc-cell">{item.desc}</td>
                    <td className="cal-cell">{item.cal} cal</td>
                </tr>
            );
        });
        // This returns the whole table with the rows inserted
        return(
            <table className="details-table">
                <thead className="subheader">
                    <tr>
                        <th className="desc-cell">Description</th>
                        <th className="cal-cell">Calories</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    };

    // Final JSX for the whole Details component
    return (
        <div className={`details-container ${props.type}-bkg`}>

            {props.type === "net" && <div>
                <p className="label">MANAGE YOUR HEALTHY LIFESTYLE!</p>
                <p>Select a tab to view details and update your numbers.</p>
            </div>}

            {props.type === "water" && <div>
                <form id="water-form" onSubmit={(e) => e.preventDefault() }>
                    <p className="label">TOTAL GLASSES OF WATER</p>
                    {/* TODO: Add two-way binding for the input below */}
                    <input type="number" placeholder="Total" min="0" value= {inputWater} onChange={handleWaterChange}/>           
                </form>
                <p className="list subheader">How much water should you drink each day?</p>
                <p className="info">In general, you should drink between &frac12; - 1 ounce for every pound you weigh. That's 5-10 glasses per day for a 160-lb person.</p>
            </div>}

            {props.type === "steps" && <div> 
                <form id="steps-form" onSubmit={(e) => e.preventDefault() }>
                    <p className="label">TOTAL STEPS</p>
                    {/* TODO: Add two-way binding for the input below */}
                    <input type="number" placeholder="Total" min="0" value= {inputSteps} onChange={handleStepsChange}/>
                </form>
                <p className="subheader steps-subheader">What's your daily steps goal?</p>
                <table className="steps-table">
                    <tbody>
                        <tr>
                            <td className="steps-cell-left">Low Active</td>
                            <td className="steps-cell-right">5,000-7,500</td>
                        </tr>
                        <tr>
                            <td className="steps-cell-left">Somewhat Active</td>
                            <td className="steps-cell-right">7,500-10,000</td>
                        </tr>
                        <tr>
                            <td className="steps-cell-left">Active</td>
                            <td className="steps-cell-right">10,000-12,500</td>
                        </tr>
                        <tr>
                            <td className="steps-cell-left">Highly Active</td>
                            <td className="steps-cell-right">12,500+</td>
                        </tr>
                    </tbody>
                </table>
            </div>}

            {props.type === "food" && <div>
                <form id="food-form">
                    <p className="label">ADD CALORIES CONSUMED</p>
                    {/* TODO: Add two-way binding for each of the two inputs below */}
                    <input type="text" className="wide" placeholder="Description of food or beverage" maxLength="32" value= {inputFoodDescription} onChange = {handleFoodDescChange}/>
                    <input type="number" placeholder="Calories" min="0" value= {inputFoodCalories} onChange = {handleFoodCalChange}/>
                    {/* TODO: BONUS! Make the button disabled if either field is empty */}
                    <button type="submit" onClick={handleSubmitFood}>Add</button>
                </form>
                {/* TODO: BONUS! Make the log & table appear only when the first entry is submitted */}
                <div>
                    <p className="details-header">FOOD & BEVERAGE LOG</p>
                    {/* TODO: Add the DetailsTable component and pass in the food list using the attribute 'list' */}
                    <DetailsTable list = {foodList} />
                </div>
            </div>}

            {props.type === "exercise" && <div>
                <form id="exercise-form">
                    <p className="label">ADD CALORIES BURNED</p>
                    {/* TODO: Add two-way binding for each of the two inputs below */}
                    <input type="text" className="wide" placeholder="Description of exercise activity" maxLength="32" value= {inputExerciseDescription} onChange={handleExerciseDescChange}/>
                    <input type="number" placeholder="Calories" min="0" value= {inputExerciseCalories} onChange={handleExerciseCalChange} />
                    {/* TODO: BONUS! Make the button disabled if either field is empty */}
                    <button type="submit" onClick={handleSubmitExercise}>Update</button>
                </form>
                {/* TODO: BONUS! Make the log & table appear only when the first entry is submitted */}
                <div>
                    <p className="details-header">EXERCISE LOG</p>
                    <DetailsTable list = {exerciseList} />
                    
                </div>
            </div>}

        </div>
    );
};

// This provides validation of data types for all props
Details.propTypes = {
    type: PropTypes.string.isRequired,
    updateSteps: PropTypes.func.isRequired,
    updateWater: PropTypes.func.isRequired,
    updateFood: PropTypes.func.isRequired,
    updateExercise: PropTypes.func.isRequired,
};

export default Details;