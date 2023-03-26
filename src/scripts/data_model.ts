// Path: src/scripts/data_model.ts

// This is the data model for the sandwich effects
export interface effect_filter{
  power:string;
  type?:string;
  level:number;
}

// This is the data model for filtering the sandawich recipes
export interface recipe_filter{
  effect_filters:effect_filter[];
  showBuyable:boolean;  // Buyable recipes 
  showHerbal:boolean;   // Recipes that use Mystic Herbal
}

// This is the data model for storing a sandwich recipe
export interface sandwich_recipe {
  name?:string;
  description:string;
  fillings:string[];
  condiments:string[];
  
  imgSrc?:string; 
  location?:string;

  effects:{
    name:string;
    type:string;
    level:string;
  }[];
}