import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const TypeList = ["Normal", "Fire", "Water", "Grass"];
  const [typeFilter, setTypeFilter] = useState<string>("Normal");

  const LevelList = [1,2,3];
  const [levelFilter, setLevelFilter] = useState<number>(2);

  const PowerList = ["Sparkling", "Encounter", "Egg", "Raid"];
  const [powerFilters, setPowerFilters] = useState<string[]>([PowerList[0]])
  const addPower = (power:string) => {
    if (powerFilters.length >= 3) {
      console.log("Maximum is 3.")
      return;
    }
    setPowerFilters([...powerFilters, power])
  }
  const removePower = (power:string) => {
    setPowerFilters(
      powerFilters.filter(
        (_power) => _power != power
      )
    )
  }
  const togglePowerHandler = (power:string) => {
    if (powerFilters.indexOf(power) > -1){
      removePower(power);
    } else {
      addPower(power)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <div id="filter-container">
          <div className="filter-container">
            <span className="filter-title">Type: </span>
            {
              TypeList.map(
                (type:string, index:number) => (
                  <div
                    key={index} 
                    onClick={() => {setTypeFilter(type)}}
                    className={`type-box ${(typeFilter === type)?"type-select":"type-unselect"}`}>
                      {type}
                  </div>
                )
              )
            }
          </div>

          <div className="filter-container">
            <div className="filter-title">Level: </div>
            {
              LevelList.map(
                (level:number) => (
                <div 
                  key={level}
                  className={`level-box ${(levelFilter == level)?"level-select":"level"}`}
                  onClick={() => { setLevelFilter(level) }}>
                {level}
                </div>
              ))
            }
          </div>

          <div className="filter-container">
            <span className="filter-title">Powers: </span>
            {
              PowerList.map(
                (power:string, index:number) => (
                  <div
                  key={index} 
                  onClick={() => {togglePowerHandler(power)}}
                  className={`power-box ${(powerFilters.indexOf(power) > -1)?"power-select":"power-unselect"}`}>
                    {power}
                  </div>
                )
              )
            }
          </div>
        </div>

        <div className="result-container">
          <div className="recipe-box">
            <li>
              <span className="ingredient">Hamberger: </span>
              <span className="ingred-amont">2</span>
            </li>
            <li>
              <span className="ingredient">Hamberger: </span>
              <span className="ingred-amont">2</span>
            </li>
          </div>
          
        </div>
      </header>
    </div>
  );
}

export default App;
