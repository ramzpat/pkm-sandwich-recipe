import React from "react"
import { sandwich_recipe } from "../scripts/data_model";

const RecipeBox:React.FC<{recipe:sandwich_recipe}> = ({recipe}) => {
  return (
    <div className="recipe-box">
      <span className="info">{recipe.name}</span>
      <div className="recipe_info">
        {/* <div className={`buyable_location ${
          (recipe.location && recipe.fillings.length === 0 && recipe.condiments.length === 0)?"":"hide"}`}>Shop Location: {recipe.location}</div> */}
        <div className={`ingredient ${(recipe.fillings.length > 0 && recipe.condiments.length > 0)?"":"hide"}`}>
          <div className="fillings filter_option">
            <div className="filter-title">Fillings: </div>
            <div className="ingre-container">
            {
              recipe.fillings.map(
                (filling, index) => (
                  <div className="ingredient-box" key={index}>{filling}</div>
                )
              )
            }
            </div>
          </div>
          <div className="condiments filter_option">
            <div className="filter-title">Condiments: </div>
            <div className="ingre-container">
            {
              recipe.condiments.map(
                (condiment, index) => (
                  <div className="ingredient-box" key={index}>{condiment}</div>
                )
              )
            }
            </div>
          </div>
        </div>
        <div className="effects filter_option">
          <div className="filter-title">Effects: </div>
          <div className="ingre-container">
          {
            recipe.effects.map(
              (effect, index) => (
                <div className="ingredient-box" key={index}>
                {effect.name.split(' ')[0]}{`${(effect.type)?("("+effect.type+")"):""}`} Level : {effect.level}   
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