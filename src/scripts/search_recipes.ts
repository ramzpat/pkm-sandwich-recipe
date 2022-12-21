import { recipe_filter, sandwich_recipe } from "./data_model";

import standard_sandwiches from '../assets/data/sandwiches.json'
import shop_sandwiches from '../assets/data/sandwiches_shop.json'
import creative_sandwiches from '../assets/data/sandwiches_creative.json'

let _standard_sandwiches:sandwich_recipe[] = []
let _shop_sandwiches:sandwich_recipe[] = []
let _creative_sandwiches:sandwich_recipe[] = []

export function prepare_sandwiches_onLoad() {
  // Prepare standard sandwiches 
  standard_sandwiches.map(
    (e) => {
      _standard_sandwiches.push(
        {
          name: "#" + e.number + ": " + e.name,
          description:e.description,
          fillings:e.fillings,
          condiments:e.condiments,
          imgSrc:e.imageUrl,
          location:e.location,
          effects: e.effects
        }
      )
    }
  )
  shop_sandwiches.map(
    (e) => {
      _shop_sandwiches.push(
        {
          name: "Buyable",
          description:"-",
          fillings:[],
          condiments:[],
          // imgSrc:e.imageUrl,
          location:e.location,
          effects: e.effects
        }
      )
    }
  )
  creative_sandwiches.map(
    (e) => {
      _creative_sandwiches.push(
        {
          name: "Creative mode",
          description: "Creative sandwich",
          fillings:e.fillings,
          condiments:e.condiments,
          effects: e.effects
        })
    }
  )
  console.log("Sandwiches are loaded")
}

const sandwich_match_condition = (recipe:sandwich_recipe, _filter:recipe_filter):boolean => {
  let is_match:boolean = false;
  recipe.effects.map(
    (effect) => {
      if (effect.name === _filter.power 
        && (+effect.level) >= _filter.level) {
        if (effect.name === "Egg Power")
          is_match = true;
        else
          is_match = (effect.type === _filter.type)
      }
    }
  )
  return is_match;
}

export function search_recipes(
  _filters:recipe_filter[], 
  creativeMode?:boolean, 
  shopMode?:boolean, 
  recipeMode?:boolean): sandwich_recipe[] {
  
  // TODO: Derive all recipes from JSON files 
  let all_sandwiches:sandwich_recipe[] = [];

  // Load: Standard sandwiches 
  if (!recipeMode || recipeMode){   
    all_sandwiches = _standard_sandwiches.slice(0);
  }

  if (!shopMode || shopMode) {
    all_sandwiches = all_sandwiches.concat(_shop_sandwiches.slice(0)).slice(0)
  }

  if (!creativeMode || creativeMode) {
    all_sandwiches = all_sandwiches.concat(_creative_sandwiches.slice(0)).slice(0)
  }

  _filters.map(
    (filter) => {
      all_sandwiches = all_sandwiches.filter(
        (sandwich) => sandwich_match_condition(sandwich, filter)
      ).slice(0)
    }
  )

  return all_sandwiches.sort((a, b) => (a.fillings.length - b.fillings.length) )
}