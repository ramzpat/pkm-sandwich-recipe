export interface recipe_filter{
  power:string;
  type?:string;
  level:number;
}

export interface sandwich_recipe {
  isShop:boolean;         // Must buy from a shop
  isRecipe:boolean;       // There is a recipe in the game
  isCreative:boolean;     // Must create from creative mode 

  name?:string;
  description:string;
  fillings:string[];
  condiments:string[];
  
  imgSrc?:string; 
  location?:string;
  
}