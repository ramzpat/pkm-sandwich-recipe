import { effect_filter, recipe_filter, sandwich_recipe } from "./data_model";

import standard_sandwiches from '../assets/data/sandwiches.json'
import shop_sandwiches from '../assets/data/sandwiches_shop.json'
import creative_sandwiches from '../assets/data/sandwiches_creative.json'
import cre_sim_sandwiches from '../assets/data/sandwiches_cre_sim.json'
import gen_teensy from "../assets/data/sandwiches_gen_teensy.json"
import gen_humungo from "../assets/data/sandwiches_gen_humungo.json"
import gen_catching_1 from "../assets/data/sandwiches_gen_catching_1.json"
import gen_catch_steel from "../assets/data/sandwiches_gen_catch_steel_tmp.json"
import gen_raid_2 from "../assets/data/sandwiches_raid2.json"

let _standard_sandwiches:sandwich_recipe[] = []
let _shop_sandwiches:sandwich_recipe[] = []
let _creative_sandwiches:sandwich_recipe[] = []

export function prepare_sandwiches_onLoad() {
  // Prepare standard sandwiches 
  // These are sandwiches that are available in the game
  standard_sandwiches.forEach(sandwich => {
    _standard_sandwiches.push({
      name: "#" + sandwich.number + ": " + sandwich.name,
      description: sandwich.description,
      fillings: sandwich.fillings,
      condiments: sandwich.condiments,
      imgSrc: sandwich.imageUrl,
      location: sandwich.location,
      effects: sandwich.effects
    });
  });
  
  // Prepare shop sandwiches
  // These are sandwiches that are available in the shop
  shop_sandwiches.forEach((sandwich) => {
    _shop_sandwiches.push({
        name: "Buyable",
        description:"-",
        fillings:[],
        condiments:[],
        location:sandwich.location,
        effects: sandwich.effects
    })
  });
  
  // Prepare creative sandwiches
  creative_sandwiches.forEach(
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
  );
  
  cre_sim_sandwiches.forEach(
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
  gen_teensy.forEach(
    (e) => {
      _creative_sandwiches.push(
        {
          name: "(Auto-gen) Creative mode",
          description: "This is not checked yet.",
          fillings:e.fillings,
          condiments:e.condiments,
          effects: e.effects
        })
    }
  )
  gen_humungo.forEach(
    (e) => {
      _creative_sandwiches.push(
        {
          name: "(Auto-gen) Creative mode",
          description: "This is not checked yet.",
          fillings:e.fillings,
          condiments:e.condiments,
          effects: e.effects
        })
    }
  )
  gen_catching_1.forEach(
    (e) => {
      _creative_sandwiches.push(
        {
          name: "(Auto-gen) Creative mode",
          description: "This is not checked yet.",
          fillings:e.fillings,
          condiments:e.condiments,
          effects: e.effects
        })
    }
  )
  gen_catch_steel.forEach(
    (e) => {
      _creative_sandwiches.push(
        {
          name: "(Auto-gen) Creative mode",
          description: "This is not checked yet.",
          fillings:e.fillings,
          condiments:e.condiments,
          effects: e.effects
        })
    }
  )
  gen_raid_2.forEach(
    (e) => {
      _creative_sandwiches.push(
        {
          name: "Creative mode",
          description: "",
          fillings:e.fillings,
          condiments:e.condiments,
          effects: e.effects
        })
    }
  )
  console.log("Sandwiches are loaded")
}

const sandwich_match_condition = (recipe:sandwich_recipe, _filter:effect_filter):boolean => {
  // Declare a boolean variable
  let is_match:boolean = false;
  // Loop through each effect in the recipe
  recipe.effects.forEach(
    (effect) => {
      // Check if the filter matches the effect
      if (effect.name === _filter.power 
        && (+effect.level) >= _filter.level) {
        // Check if the power is egg power
        if (effect.name === "Egg Power")
          // Set the variable to true
          is_match = true;
        else
          // Set the variable to true if the effect type matches the filter type
          is_match = (effect.type === _filter.type)
      }
    }
  )
  // Return the variable
  return is_match;
}

export function search_recipes(
  _filter:recipe_filter, 
  creativeMode?:boolean, 
  recipeMode?:boolean): sandwich_recipe[] {
  
  let all_sandwiches:sandwich_recipe[] = [];
  // Load standard sandwiches 
  if (!recipeMode || recipeMode){   
    all_sandwiches = _standard_sandwiches.slice(0);
  }
  // Load buyable sandwich
  if (_filter.showBuyable) {
    all_sandwiches = all_sandwiches.concat(_shop_sandwiches.slice(0)).slice(0)
  }
  // Load creative sandwich
  if (!creativeMode || creativeMode) {
    all_sandwiches = all_sandwiches.concat(_creative_sandwiches.slice(0)).slice(0)
  }

  // Remove sandwich that uses herbal mystica
  if (!_filter.showHerbal) {
    all_sandwiches = all_sandwiches.filter((sandwich) => {
        return !sandwich.condiments.find((condi) => {
            return condi.indexOf("Herba") >= 0;
          })
      })
  }
  
  // Filter sandwich based on the selected effects
  _filter.effect_filters.forEach(
    (filter) => {
      all_sandwiches = all_sandwiches.filter(
        (sandwich) => sandwich_match_condition(sandwich, filter)
      ).slice(0)
    }
  )
  // Return the sorted result according to the number of fillings because it is better if we can use toppings as less as possible.
  return all_sandwiches.sort((a, b) => 
    (a.fillings.length - b.fillings.length) || 
    (a.condiments.length - b.condiments.length) 
  );
}