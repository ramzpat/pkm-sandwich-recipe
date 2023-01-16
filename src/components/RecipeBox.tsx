import React from "react"
import { sandwich_recipe } from "../scripts/data_model";

import { get_type_css } from "./TypeFilter";

import filling_map from '../assets/data/fillings.json'
import condi_map from '../assets/data/condiments.json'

import '../styles/recipe-interface.css'
import '../styles/pokemon-type.css'

const get_filling_img = (filling_name:string) => {
  const filling = filling_map.find((e) => (e.name === filling_name))
  if (filling) {
    return (
      <img 
        src={filling.imageUrl} 
        alt={filling_name} 
        width="18px" 
        height="18px" />
    );
  } else {
    return <div></div>;
  }
}

const get_condi_img = (condi_name:string) => {
  const condi = condi_map.find((e) => (e.name === condi_name))
  if (condi) {
    return (
      <img 
        src={condi.imageUrl} 
        alt={condi_name} 
        width="18px" 
        height="18px" />
    );
  } else {
    return <div></div>;
  }
}


const RecipeBox:React.FC<{recipe:sandwich_recipe}> = ({recipe}) => {
  return (
    <div className="recipe-box">
      <div className="recipe_name">{recipe.name}</div>
      <div className="recipe_info">
        {/* <div className={`buyable_location ${
          (recipe.location && recipe.fillings.length === 0 && recipe.condiments.length === 0)?"":"hide"}`}>Shop Location: {recipe.location}</div> */}
        
        {/* Ingredient */}
        <div className={`${(recipe.fillings.length > 0 && recipe.condiments.length > 0)?"":"hide"}`}>
          <div 
            className="row_container"
            style={{marginTop:"0px", marginBottom:"0px"}}
          >
            {/* <div className="filter_title"></div> */}
            <div className="ingre_container">
            {
              recipe.fillings.map(
                (filling, index) => (
                  <div className="ingredient_box" key={index}>{get_filling_img(filling)}{filling}</div>
                )
              )
            }
            </div>
          {/* </div> */}
          {/* <div 
            className="row_container"
            style={{marginTop:"3px", marginBottom:"0px"}}
            > */}
            {/* <div className="filter_title"></div> */}
            <div className="ingre_container">
            {
              recipe.condiments.map(
                (condiment, index) => (
                  <div className="ingredient_box" key={index}>{get_condi_img(condiment)}{condiment}</div>
                )
              )
            }
            </div>
          </div>
        </div>
        <div 
          className="row_container"
          style={{marginTop:"3px", marginBottom:"0px"}}
          >
          {/* <div className="filter_title"></div> */}
          <div className="ingre_container">
          {
            recipe.effects.map(
              (effect, index) => (
                <div 
                  key={index}
                  className={`ingredient_box ${get_type_css(effect.type)}`}>
                {effect.name.split(' ')[0]}{`${(effect.type)?("("+effect.type+")"):""}`} Lv:{effect.level}   
                </div>
              )
            )
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeBox;