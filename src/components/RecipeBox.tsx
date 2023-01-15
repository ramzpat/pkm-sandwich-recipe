import React from "react"
import { sandwich_recipe } from "../scripts/data_model";

import { get_type_css } from "./TypeFilter";

import '../styles/recipe-interface.css'
import '../styles/pokemon-type.css'

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
                  <div className="ingredient_box" key={index}>{filling}</div>
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
                  <div className="ingredient_box" key={index}>{condiment}</div>
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