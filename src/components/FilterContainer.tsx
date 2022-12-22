import React, { useState } from "react"
import { recipe_filter } from "../scripts/data_model"

import TypeFilter from "./TypeFilter"
import PowerFilter from "./PowerFilter"
import LevelFilter from "./LevelFilter"

import PowerList from "../assets/data/powers.json"
import { TypeList } from "./TypeFilter"
import { LevelList } from "./LevelFilter"

import './notice_style.css'
// import { 
//   Alert,
//   AlertIcon,
//   AlertTitle,
//   AlertDescription } from "@chakra-ui/alert";



const FilterContainer:React.FC<{ 
    filters:{id:number, filter:recipe_filter}[],
    setFilters:React.Dispatch<React.SetStateAction<{id:number, filter:recipe_filter}[]>>
  }> = ({filters, setFilters}) => {

  // Filter parameters 
  const [power, setPower] = useState<string>(PowerList[0]);
  const [type, setType] = useState<string>(TypeList[0]);
  const [level, setLevel] = useState<number>(LevelList[0]);

  const [isAlert, setAlert] = useState<boolean>(false);
  const [alearMsg, setAlertMsg] = useState<string>("error_msg");

  const addFilter = (_filter:recipe_filter) => {
    // Check the number of filters 
    if (filters.length >= 3) {
      setAlertMsg("Maximum is 3.")
      setAlert(true);
      return;
    }
    // Check if the power already added
    let canAdd = true;
    filters.map(
      (e) => {
        if (e.filter.power === _filter.power) {
          setAlertMsg("Cannot add the same power.")
          setAlert(true);
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

      setAlertMsg("");
      setAlert(false);
    }
  }
  const removeFilter = (id:number) => {
    setFilters(
      filters.filter(
        (filter) => id !== filter.id
      )
    )
    setAlertMsg("");
    setAlert(false);
  }

  return (
    <div id="filter-container-id">
      <PowerFilter
        filter={power}
        setFilter={setPower}
        />
      <TypeFilter
        filter={type}
        setFilter={setType}
        />
      <LevelFilter
        filter={level}
        setFilter={setLevel}
        />

      
      <div className="filter-list">

        <div 
          className={`alert error ${(isAlert)?"":"hide"}`}
          onClick={() => {setAlert(false); setAlertMsg("")}}
          >
          {alearMsg}

          <div 
            className="closebtn"
          >[x]</div>
        </div>

        <div 
          className="button" 
          onClick={() => addFilter({power:power, type:type, level:level})} >
          Add Filter
        </div>

        {
          filters.map(
            (e, index) => 
            <div
              key={index} 
              className="filter-box"
              onClick={() => removeFilter(e.id)}
              >
              <span>
              {e.filter.power}{`${(e.filter.type)?("("+e.filter.type+")"):""}`} Level : {e.filter.level} 
              </span>
              <div 
                className="closebtn"
              >[x]</div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default FilterContainer;