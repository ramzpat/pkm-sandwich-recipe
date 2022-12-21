import React from "react"
import { sandwich_recipe } from "../scripts/data_model";

const RecipeBox:React.FC<{recipe:sandwich_recipe}> = ({recipe}) => {
  return (
    <div className="recipe-box">
      <span className="info">{recipe.name}</span>
      <div className="fillings">
        {
          recipe.fillings.map(
            (filling, index) => (
              <li key={index}>{filling}</li>
            )
          )
        }
      </div>
      <div className="condiments">
        {
          recipe.condiments.map(
            (condiment, index) => (
              <li key={index}>{condiment}</li>
            )
          )
        }
      </div>
    </div>
  )
}

export default RecipeBox;