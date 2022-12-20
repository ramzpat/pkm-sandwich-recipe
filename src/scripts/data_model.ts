export interface recipe_filter{
  power:string;
  type?:string;
  level:number;
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