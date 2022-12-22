import React from "react"

// Load images 
import type_img_normal from '../assets/images/type-normal.jpeg'
import type_img_fighting from '../assets/images/type-fighting.jpeg'
import type_img_flying from '../assets/images/type-flying.jpeg'
import type_img_poison from '../assets/images/type-poison.jpeg'
import type_img_ground from '../assets/images/type-ground.jpeg'
import type_img_rock from '../assets/images/type-rock.jpeg'
import type_img_bug from '../assets/images/type-bug.jpeg'
import type_img_ghost from '../assets/images/type-ghost.jpeg'
import type_img_steel from '../assets/images/type-steel.jpeg'
import type_img_fire from '../assets/images/type-fire.jpeg'
import type_img_water from '../assets/images/type-water.jpeg'
import type_img_grass from '../assets/images/type-grass.jpeg'
import type_img_electric from '../assets/images/type-electric.jpeg'
import type_img_psychic from '../assets/images/type-psychic.jpeg'
import type_img_ice from '../assets/images/type-ice.jpeg'
import type_img_dragon from '../assets/images/type-dragon.jpeg'
import type_img_dark from '../assets/images/type-dark.jpeg'
import type_img_fairy from '../assets/images/type-fairy.jpeg'

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

export const pokemon_types:{type_name:string, type_img_icon:string}[] = [
  {
    type_name: "Normal",
    type_img_icon: type_img_normal
  },
  {
    type_name: "Fighting",
    type_img_icon: type_img_fighting
  },
  {
    type_name: "Flying",
    type_img_icon: type_img_flying
  },
  {
    type_name: "Poison",
    type_img_icon: type_img_poison
  },
  {
    type_name: "Ground",
    type_img_icon: type_img_ground
  },
  {
    type_name: "Rock",
    type_img_icon: type_img_rock
  },
  {
    type_name: "Bug",
    type_img_icon: type_img_bug
  },
  {
    type_name: "Ghost",
    type_img_icon: type_img_ghost
  },
  {
    type_name: "Steel",
    type_img_icon: type_img_steel
  },
  {
    type_name: "Fire",
    type_img_icon: type_img_fire
  },
  {
    type_name: "Water",
    type_img_icon: type_img_water
  },
  {
    type_name: "Grass",
    type_img_icon: type_img_grass
  },
  {
    type_name: "Electric",
    type_img_icon: type_img_electric
  },
  {
    type_name: "Psychic",
    type_img_icon: type_img_psychic
  },
  {
    type_name: "Ice",
    type_img_icon: type_img_ice
  },
  {
    type_name: "Dragon",
    type_img_icon: type_img_dragon
  },
  {
    type_name: "Dark",
    type_img_icon: type_img_dark
  },
  {
    type_name: "Fairy",
    type_img_icon: type_img_fairy
  },
]

const TypeFilter: React.FC<{
  filter:string, 
  setFilter:React.Dispatch<React.SetStateAction<string>>}> = ({filter, setFilter}) => {
  return (
    <div className="filter-container">
      <span className="filter-title">Type: </span>
      <div className="type-container">
      {
        pokemon_types.map(
          (pkm_type, index:number) => (
            <div
              key={index} 
              onClick={() => {setFilter(pkm_type.type_name)}}
              className={`type-box ${(filter === pkm_type.type_name)?"type-select":""}`}>
                <img className="type-img" src={pkm_type.type_img_icon} />
            </div>
          )
        )
      }
      </div>
    </div>
  )
}

export default TypeFilter
