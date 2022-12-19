import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {ingredient, sandwich_ingredients, find_candidate_ingredients, POWER_ALIAS} from './ts_scripts/search_recipe'

import { recipe_filter } from './data_model';

import TypeList from './ts_scripts/data/types.json'
import PowerList from './ts_scripts/data/powers.json'

function App() {
  const [powerFilter, setPowerFilter] = useState<string>(PowerList[0]);
  const [typeFilter, setTypeFilter] = useState<string>(TypeList[0]);
  const LevelList = [1, 2,3];
  const [levelFilter, setLevelFilter] = useState<number>(2);

  const [filters, setFilters] = useState<{id:number, filter:recipe_filter}[]>([]);

  const addFilter = (_filter:recipe_filter) => {
    // Check the number of filters 
    if (filters.length >= 3) {
      console.log("Maximum is 3.")
      return;
    }
    // Check if the power already added
    let canAdd = true;
    filters.map(
      (e) => {
        if (e.filter.power === _filter.power) {
          console.log("Cannot add the same power.")
          canAdd = false
          return;
        }
      } 
    )
    if (canAdd ){
      if (_filter.power === "Egg Power")
        _filter.type = undefined;
      // Add the filter
      setFilters([...filters, {id:Date.now(), filter:_filter}])
    }
  }
  const removeFilter = (id:number) => {
    setFilters(
      filters.filter(
        (filter) => id !== filter.id
      )
    )
  }
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


          <div className="filter-container">
            <span className="filter-title">Power: </span>
            <div className="choice-container">
            {
              PowerList.map(
                (power:string, index:number) => (
                  <div
                  key={index} 
                  onClick={() => {setPowerFilter(power)}}
                  className={`power-box ${(powerFilter === power)?"power-select":"power-unselect"}`}>
                    {POWER_ALIAS.get(power)}
                  </div>
                )
              )
            }
            </div>
          </div>

          <div className="filter-container">
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
          </div>
        </div>
        <div className="filter-container">
          <input 
            type="button" 
            value="Add filter" 
            onClick={() => 
              addFilter({power:powerFilter, type:typeFilter, level:levelFilter})}  />
          {
            filters.map(
              (e, index) => 
              <div
                key={index} 
                className="filter-box"
                onClick={() => removeFilter(e.id) }
                >
                {e.filter.power}:{e.filter.type}:{e.filter.level} 
              </div>
            )
          }
        </div>
        <div className="result-container">

          {/* <div className="recipe-box">
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
          </div> */}
          
        </div>
      </header>
    </div>
  );
}

export default App;
