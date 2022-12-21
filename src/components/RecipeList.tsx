import React, { useEffect, useState } from "react"
import { recipe_filter, sandwich_recipe } from "../scripts/data_model"
import { prepare_sandwiches_onLoad, search_recipes } from "../scripts/search_recipes"
import RecipeBox from "./RecipeBox"

const RecipeList:React.FC<{filters:{id:number, filter:recipe_filter}[]}> = ({filters}) => {
  useEffect(() => {
    // Prepare sandwiches onLoad
    prepare_sandwiches_onLoad();
  }, []);

  const [recipes, setRecipes] = useState<sandwich_recipe[]>([]);

  useEffect(()=> {
    let _filters:recipe_filter[] = [];
    filters.map(
      (e) => {
        _filters.push(e.filter)
      }
    )
    setRecipes(search_recipes(_filters))
  }, [filters])

  if (filters.length === 0) {
    return (
      <div className="recipe-list-container">
        Please choose at least 1 power
      </div>
    )
  } else if (recipes.length === 0){
    return (
      <div className="recipe-list-container">
        Cannot find any recipe
      </div>
    )
  } else {
    return (
      <div className="recipe-list-container">
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