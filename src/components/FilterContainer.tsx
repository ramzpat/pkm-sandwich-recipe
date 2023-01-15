import React, { useState, useEffect } from "react"
import { effect_filter, recipe_filter } from "../scripts/data_model"

import TypeFilter from "./TypeFilter"
import PowerFilter from "./PowerFilter"
import LevelFilter from "./LevelFilter"

import PowerList from "../assets/data/powers.json"
import { TypeList, get_type_css } from "./TypeFilter"
import { LevelList } from "./LevelFilter"

import {GoSync} from "react-icons/go"

import {BiXCircle} from "react-icons/bi"

import '../styles/filter-interface.css'
import '../styles/pokemon-type.css'

const FilterContainer:React.FC<{ 
    filter:recipe_filter,
    setFilter:React.Dispatch<React.SetStateAction<recipe_filter>>,
    setAlertMsg:React.Dispatch<React.SetStateAction<string>>,
    setAlert:React.Dispatch<React.SetStateAction<boolean>>
  }> = ({filter, setFilter, setAlertMsg, setAlert}) => {

  // Filter parameters 
  const [effects, setEffects] = useState<{id:number, effect:effect_filter}[]>([]);
  const [power, setPower] = useState<string>(PowerList[0]);
  const [type, setType] = useState<string>(TypeList[0]);
  const [level, setLevel] = useState<number>(LevelList[0]);

  // eslint-disable-next-line
  const [buyable, setBuyable] = useState<boolean>(false); // Enable buyable recipes 
  const [useHerbal, setUseHerbal] = useState<boolean>(true); // Enable hebal-used recipes 

  const [displayEffectChoices, setDisplayEffectChoice] = useState<boolean>(false);
  const [displayTypeChoices, setDisplayTypeChoice] = useState<boolean>(false);
  const [displayLevelChoices, setDisplayLevelChoice] = useState<boolean>(false);

  const addEffect = (_effect:effect_filter) => {
    // Check the number of filters 
    if (effects.length >= 3) {
      setAlertMsg("Maximum is 3.")
      setAlert(true);
      return;
    }
    // Check if the power already added
    let canAdd = true;
    effects.forEach(
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
  }, [setFilter, effects, buyable, useHerbal])

  return (
    <div id="filter_container">
      <div id="recipe_option">
        <div className="filter_title">Recipe Option: </div>
        {/* <div 
        className={`clickable_box ${(buyable)?"active_box":""}`}
        onClick={()=>{setBuyable(!buyable)}}
        >Buyable</div> */}
        <div 
          className={`clickable_box ${(useHerbal)?"active_box":""}`}
          style={{marginTop:"0px", marginBottom:"0px"}}
          onClick={()=>{setUseHerbal(!useHerbal)}}
        >Herbal
        </div>
      </div>

      <div className="row_container">
        <div className="filter_title">Effect List:</div>
        <div className="effect-list">
        {
          effects.map(
            (e, index) => 
            <div
              key={index} 
              className={`clickable_box active_box ${(e.effect.type)?get_type_css(e.effect.type):""}`}
              style={{marginTop:"0px", marginBottom:"5px"}}
              onClick={() => removeEffect(e.id)}
              >
              <span>
              {e.effect.power.split(' ')[0]}{`${(e.effect.type)?("("+e.effect.type+")"):""}`} Lv: {e.effect.level} 
              </span>
              <BiXCircle className="box_closebtn" size={20}/>
            </div>
          )
        }
        </div>
      </div>

      <div className="row_container">
        <div className="filter_title">Add Effect: </div>
        <div 
          className="clickable_box active_box" 
          style={{marginTop:"0px", marginBottom:"5px"}}
          onClick={()=>{setDisplayEffectChoice(true)}}>
          {power.split(' ')[0]}<GoSync className="react-icons" size={20}/></div>
        <div 
          className={`clickable_box active_box ${get_type_css(type)}`}
          style={{marginTop:"0px", marginBottom:"5px"}}
          onClick={()=>{setDisplayTypeChoice(true)}}
          >{type}<GoSync className="react-icons" size={20}/></div>
        <div 
          className="clickable_box active_box"
          style={{marginTop:"0px", marginBottom:"5px", paddingTop:"0px", paddingBottom:"0px"}}
          onClick={()=>{setDisplayLevelChoice(true)}}>
          Level&#8805; {level}<GoSync className="react-icons" size={20}/></div>
      </div>
      <div 
        className="add_effect_button" 
        onClick={() => addEffect({power:power, type:type, level:level})} >
        Add Effect
      </div>

      <PowerFilter
        displayEffectChoices={displayEffectChoices}
        setDisplayEffectChoice={setDisplayEffectChoice}
        filter={power}
        setFilter={setPower}
        />
      <TypeFilter
        displayTypeChoices={displayTypeChoices}
        setDisplayTypeChoice={setDisplayTypeChoice}
        filter={type}
        setFilter={setType}
        />
      <LevelFilter
        displayLevelChoices={displayLevelChoices}
        setDisplayLevelChoice={setDisplayLevelChoice}
        filter={level}
        setFilter={setLevel}
        />

      
    </div>
  )
}

export default FilterContainer;