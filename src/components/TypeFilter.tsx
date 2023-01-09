import React from "react"

import '../styles/pokemon-type.css'

export const TypeList:string[] = [
  "Normal",
  "Fighting",
  "Flying",
  "Poison",
  "Ground",
  "Rock",
  "Bug",
  "Ghost",
  "Steel",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Psychic",
  "Ice",
  "Dragon",
  "Dark",
  "Fairy"
];

const pokemon_types:{type_name:string, type_css:string}[] = [
  {
    type_name: "Normal",
    type_css: "bg_normal"
  },
  {
    type_name: "Fighting",
    type_css: "bg_fighting"
  },
  {
    type_name: "Flying",
    type_css: "bg_flying"
  },
  {
    type_name: "Poison",
    type_css: "bg_poison"
  },
  {
    type_name: "Ground",
    type_css: "bg_ground"
  },
  {
    type_name: "Rock",
    type_css: "bg_rock"
  },
  {
    type_name: "Bug",
    type_css: "bg_bug"
  },
  {
    type_name: "Ghost",
    type_css: "bg_ghost"
  },
  {
    type_name: "Steel",
    type_css: "bg_steel"
  },
  {
    type_name: "Fire",
    type_css: "bg_fire"
  },
  {
    type_name: "Water",
    type_css: "bg_water"
  },
  {
    type_name: "Grass",
    type_css: "bg_grass"
  },
  {
    type_name: "Electric",
    type_css: "bg_electric"
  },
  {
    type_name: "Psychic",
    type_css: "bg_psychic"
  },
  {
    type_name: "Ice",
    type_css: "bg_ice"
  },
  {
    type_name: "Dragon",
    type_css: "bg_dragon"
  },
  {
    type_name: "Dark",
    type_css: "bg_dark"
  },
  {
    type_name: "Fairy",
    type_css: "bg_fairy"
  },
]

export const get_type_css = (type_name:string):string => {
  let filtered_types = pokemon_types.filter(
    (pkm_type) => (pkm_type.type_name === type_name)
  );
  if (filtered_types.length > 1) {
    console.log('There is an error.');
    return "";
  } else if (filtered_types.length === 1) {
    return filtered_types[0].type_css;
  } else {
    return "";
  }
}

const TypeFilter: React.FC<{
  displayTypeChoices:boolean, 
  setDisplayTypeChoice: React.Dispatch<React.SetStateAction<boolean>>,
  filter:string, 
  setFilter:React.Dispatch<React.SetStateAction<string>>}> = ({displayTypeChoices, setDisplayTypeChoice, filter, setFilter}) => {
  return (
    <div 
      className={`popup_container ${(displayTypeChoices)?"":"hide"}`}>
      <div className="filter_title">Type: </div>
      <div>
        <div className="column_container">
          {
          pokemon_types.map(
            (pkm_type, index:number) => (
              <div
                key={index}
                onClick={() => {setFilter(pkm_type.type_name);setDisplayTypeChoice(false)}}
                className={`clickable_box ${(filter === pkm_type.type_name)?"active_box":""} ${pkm_type.type_css}`}>
                  {pkm_type.type_name}
              </div>
            )
          )}
        </div>  
      </div>
    </div>
  )
}

export default TypeFilter
