import React, { useEffect } from "react"
import { recipe_filter, sandwich_recipe } from "../scripts/data_model"
import { prepare_sandwiches_onLoad } from "../scripts/search_recipes"
import RecipeBox from "./RecipeBox"

const RecipeList:React.FC<{
  filter:recipe_filter, 
  recipes:sandwich_recipe[],
  setFilter:React.Dispatch<React.SetStateAction<recipe_filter>>}> = ({filter, recipes, setFilter}) => {
  useEffect(() => {
    // Prepare sandwiches onLoad
    prepare_sandwiches_onLoad();
    console.log("Sandwiches have been prepared")
  }, []);

  if (filter.effect_filters.length === 0) {
    return (
      <div id="recipe_list">
        <p>
        Please add at least 1 effect
        </p>
      </div>
    )
  } else if (recipes.length === 0){
    return (
      <div id="recipe_list">
        <p>
        Cannot find any recipe
        </p>
      </div>
    )
  } else {
    return (
      <div id="recipe_list">
      {
        recipes.map(
          (recipe, index) => (      
            <RecipeBox 
              key={index}    
              recipe={recipe} />
          )
        )
      }
      </div>)
  }
} 
export default RecipeList;