import React, { useEffect, useState } from "react"
import { recipe_filter, sandwich_recipe } from "../scripts/data_model"
import { prepare_sandwiches_onLoad, search_recipes } from "../scripts/search_recipes"
import RecipeBox from "./RecipeBox"

const RecipeList:React.FC<{filter:recipe_filter}> = ({filter}) => {
  useEffect(() => {
    // Prepare sandwiches onLoad
    prepare_sandwiches_onLoad();
  }, []);

  const [recipes, setRecipes] = useState<sandwich_recipe[]>([]);

  useEffect(()=> {
    setRecipes(search_recipes(filter))
  }, [filter])

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