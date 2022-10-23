import React, {useState } from "react";
import WorkoutButton from "./WorkoutButton";

function App() {
  const chestWorkout = ["Bench Press (5x5)", "Declined Bench Press (3x8)", "Inclined Bench Press (3x8)", "Dips (3x8)", "Tricep Pulls (3x8)"];
  const backWorkout = ["Deadlift (5x5)", "Shrugs (3x8)", "Lat Pulldowns (3x8)", "Rows (3x8)", "Tricep Pulls (3x8)"];
  const legWorkout = ["Squat (5x5)", "Lunges (3x8)", "Calf Raises (3x8)"];
  const [chestCollapsed, setChest] = useState(false);
  const [backCollapsed, setBack] = useState(false);
  const [legCollapsed, setLeg] = useState(false);

  const handleClick = (day) => {
    if (day === "Chest"){
      setChest(!chestCollapsed);
      setBack(false);
      setLeg(false);
    } else if (day === "Back"){
      setChest(false);
      setBack(!backCollapsed);
      setLeg(false);
    } else if (day === "Leg"){
      setChest(false);
      setBack(false);
      setLeg(!legCollapsed);
    } else {
      console.log("ERROR");
    }
  }

  var chest = localStorage.getItem("Chest") ? JSON.parse(localStorage.getItem("Chest")).length : 0;
  var back = localStorage.getItem("Back") ? JSON.parse(localStorage.getItem("Back")).length : 0;
  var leg = localStorage.getItem("Leg") ? JSON.parse(localStorage.getItem("Leg")).length : 0;
  
  var streak = (chest + back + leg)/2;
  return (
    <div className="App ">
      <header className="App-header bg-gradient-to-r from-white to-green-400">
        
        <div className="overflow-scroll border-t-2 border-red-400/70 bg-gradient-to-b from-red-400/70 to-red-400/20 h-screen bg-opacity-0">

          <div className="flex flex-col items-center ">
            <h1 className="text-6xl mt-[3%] text-green-100/80 font-bold">Workout Tracker</h1>
            <h2 className="text-2xl text-green-100/80 font-bold">You're on a <span className="text-4xl text-green-200">{streak}</span> day streak!</h2>
          </div>
        
          <div className="grid grid-cols-3 mt-[5%]">
            <div className=""></div>
            <WorkoutButton day="Chest" workout={chestWorkout} onClick={handleClick} collapsed={chestCollapsed} />
            <div className=""></div>  
          </div>
          <div></div>

          <div className="grid grid-cols-3 mt-[5%]">
            <div></div>
            <WorkoutButton day="Back" workout={backWorkout} onClick={handleClick} collapsed={backCollapsed} />
            <div></div>  
          </div>
          <div></div>

          <div className="grid grid-cols-3 mt-[5%]">
            <div></div>
            <WorkoutButton day="Leg" workout={legWorkout} onClick={handleClick} collapsed={legCollapsed} />
            <div></div>  
          </div>


        </div>
      </header>
    </div>
  );
}

export default App;
