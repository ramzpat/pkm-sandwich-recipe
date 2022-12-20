import React, { useState } from "react"
import { recipe_filter } from "../scripts/data_model"

import TypeFilter from "./TypeFilter"
import PowerFilter from "./PowerFilter"
import LevelFilter from "./LevelFilter"

import PowerList from "../assets/data/powers.json"
import TypeList from "../assets/data/types.json"
import { LevelList } from "./LevelFilter"

const FilterContainer:React.FC<{ 
    filters:{id:number, filter:recipe_filter}[],
    setFilters:React.Dispatch<React.SetStateAction<{id:number, filter:recipe_filter}[]>>
  }> = ({filters, setFilters}) => {

  // Filter parameters 
  const [power, setPower] = useState<string>(PowerList[0]);
  const [type, setType] = useState<string>(TypeList[0]);
  const [level, setLevel] = useState<number>(LevelList[0]);

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
    <div id="filter-container-id">
      <TypeFilter
        filter={type}
        setFilter={setType}
        />
      <PowerFilter
        filter={power}
        setFilter={setPower}
        />
      <LevelFilter
        filter={level}
        setFilter={setLevel}
        />

      <div className="filter-container">
        <input 
          type="button" 
          value="Add filter" 
          onClick={() => addFilter({power:power, type:type, level:level})} 
        />
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
    </div>
  )
}

export default FilterContainer;