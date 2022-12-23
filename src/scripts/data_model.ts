export interface effect_filter{
  power:string;
  type?:string;
  level:number;
}

export interface recipe_filter{
  effect_filters:effect_filter[];
  showBuyable:boolean;  // Buyable recipes 
  showHerbal:boolean;   // Recipes that use Mystic Herbal
}

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