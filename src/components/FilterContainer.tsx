import React, { useState, useEffect } from "react"
import { effect_filter, recipe_filter } from "../scripts/data_model"

import TypeFilter from "./TypeFilter"
import PowerFilter from "./PowerFilter"
import LevelFilter from "./LevelFilter"

import PowerList from "../assets/data/powers.json"
import { TypeList } from "./TypeFilter"
import { LevelList } from "./LevelFilter"

import './notice_style.css'

const FilterContainer:React.FC<{ 
    filter:recipe_filter,
    setFilter:React.Dispatch<React.SetStateAction<recipe_filter>>
  }> = ({filter, setFilter}) => {

  // Filter parameters 
  const [effects, setEffects] = useState<{id:number, effect:effect_filter}[]>([]);
  const [power, setPower] = useState<string>(PowerList[0]);
  const [type, setType] = useState<string>(TypeList[0]);
  const [level, setLevel] = useState<number>(LevelList[0]);

  const [buyable, setBuyable] = useState<boolean>(true); // Enable buyable recipes 
  const [useHerbal, setUseHerbal] = useState<boolean>(true); // Enable hebal-used recipes 

  const [isAlert, setAlert] = useState<boolean>(false);
  const [alearMsg, setAlertMsg] = useState<string>("error_msg");

  const addEffect = (_effect:effect_filter) => {
    // Check the number of filters 
    if (effects.length >= 3) {
      setAlertMsg("Maximum is 3.")
      setAlert(true);
      return;
    }
    // Check if the power already added
    let canAdd = true;
    effects.map(
      (e) => {
        if (e.effect.power === _effect.power) {
          setAlertMsg("Cannot add the same power effect.")
          setAlert(true);
          canAdd = false
          return;
        }
      } 
    )
    if (canAdd ){
      if (_effect.power === "Egg Power")
        _effect.type = undefined;
      // Add the filter
      setEffects([...effects, {id:Date.now(), effect:_effect}] )
      setAlertMsg("");
      setAlert(false);
    }
  }
  const removeEffect = (id:number) => {
    setEffects(
      effects.filter(
        (effect) => id !== effect.id
      )
    )
    setAlertMsg("");
    setAlert(false);
  }

  useEffect(() => {
    setFilter({
      effect_filters:effects.map((e) => (e.effect)),
      showBuyable:buyable,
      showHerbal:useHerbal
    })
  }, [effects, buyable, useHerbal])


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
          onClick={() => addEffect({power:power, type:type, level:level})} >
          Add Filter
        </div>
        <div className="choice-container">
          <div 
          className={`power-box ${(buyable)?"level-select":"level"}`}
          onClick={()=>{setBuyable(!buyable)}}
          >Buyable Recipe</div>
          <div 
            className={`power-box ${(useHerbal)?"level-select":"level"}`}
            onClick={()=>{setUseHerbal(!useHerbal)}}
          >Herbal Recipe</div>
        </div>

        {
          effects.map(
            (e, index) => 
            <div
              key={index} 
              className="filter-box"
              onClick={() => removeEffect(e.id)}
              >
              <span>
              {e.effect.power}{`${(e.effect.type)?("("+e.effect.type+")"):""}`} Level : {e.effect.level} 
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