import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {ingredient, sandwich_ingredients, find_candidate_ingredients, POWER_ALIAS} from './ts_scripts/search_recipe'

import TypeList from './ts_scripts/data/types.json'
import PowerList from './ts_scripts/data/powers.json'

function App() {
  // const TypeList = ["Normal", "Fire", "Water", "Grass"];
  const [typeFilter, setTypeFilter] = useState<string>("Normal");

  const LevelList = [2,3];
  const [levelFilter, setLevelFilter] = useState<number>(2);

  // const PowerList = ["Sparkling", "Encounter", "Egg", "Raid"];
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
        (_power) => _power !== power
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
  
  const [useHerbal, setUseHerbal] = useState<boolean>(false);
  const toggleUseHerbal = () => {
    setUseHerbal(!useHerbal)
  }

  const [recipe, setRecipe] = useState<sandwich_ingredients | null>(null);

  const prepare_recipe = () => {
    const _recipe = find_candidate_ingredients(levelFilter, typeFilter, powerFilters, useHerbal);
    setRecipe(_recipe)
  }

  useEffect(() => {
    const _recipe = find_candidate_ingredients(levelFilter, typeFilter, powerFilters, useHerbal);
    setRecipe(_recipe)
  }
  , [typeFilter, powerFilters, useHerbal])
  

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <div id="filter-container-id">
          <div className="filter-container">
            <span className="filter-title">Type: </span>
            <div className="choice-container">
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
          </div>

          {/* <div className="filter-container">
            <div className="filter-title">Level: </div>

            <div className="choice-container">
            {
              LevelList.map(
                (level:number) => (
                <div 
                  key={level}
                  className={`level-box ${(levelFilter === level)?"level-select":"level"}`}
                  onClick={() => { setLevelFilter(level) }}>
                {level}
                </div>
              ))
            }
            </div>
          </div> */}

          <div className="filter-container">
            <span className="filter-title">Powers: </span>
            <div className="choice-container">
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
          <div className="filter-container">
            <span className="filter-title">Herbal: </span>
            <div className="herbal-container">
            {
              <div 
              onClick={() => {toggleUseHerbal()}}
              className={`power-box ${(useHerbal)?"power-select":"power-unselect"}`}>
                {
                `${(useHerbal)?"Use":"Unuse"}` 
                }
              </div>
            }
            </div>
          </div>
        </div>

        <div className="result-container">
          <input type="button" value="Search" onClick={() =>{ prepare_recipe() }} />
          <div className="recipe-box">
            {
              recipe?.fillings.map(
                (ingre:ingredient, index:number) => (
                  <div key={index} className="ingredient">
                    {ingre.name}
                  </div>
                )
              )
            }
            {
              recipe?.condiments.map(
                (ingre:ingredient, index:number) => (
                  <div key={index} className="ingredient">
                    {ingre.name}
                  </div>
                )
              )
            }
          </div>
          
        </div>
      </header>
    </div>
  );
}

export default App;
