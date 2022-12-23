import React from "react"

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
    type_img_icon: "https://raw.githubusercontent.com/ramzpat/pkm-assets/main/type_images/type-normal.jpeg"
  },
  {
    type_name: "Fighting",
    type_img_icon: "https://raw.githubusercontent.com/ramzpat/pkm-assets/main/type_images/type-fighting.jpeg"
  },
  {
    type_name: "Flying",
    type_img_icon: "https://raw.githubusercontent.com/ramzpat/pkm-assets/main/type_images/type-flying.jpeg"
  },
  {
    type_name: "Poison",
    type_img_icon: "https://raw.githubusercontent.com/ramzpat/pkm-assets/main/type_images/type-poison.jpeg"
  },
  {
    type_name: "Ground",
    type_img_icon: "https://raw.githubusercontent.com/ramzpat/pkm-assets/main/type_images/type-ground.jpeg"
  },
  {
    type_name: "Rock",
    type_img_icon: "https://raw.githubusercontent.com/ramzpat/pkm-assets/main/type_images/type-rock.jpeg"
  },
  {
    type_name: "Bug",
    type_img_icon: "https://raw.githubusercontent.com/ramzpat/pkm-assets/main/type_images/type-bug.jpeg"
  },
  {
    type_name: "Ghost",
    type_img_icon: "https://raw.githubusercontent.com/ramzpat/pkm-assets/main/type_images/type-ghost.jpeg"
  },
  {
    type_name: "Steel",
    type_img_icon: "https://raw.githubusercontent.com/ramzpat/pkm-assets/main/type_images/type-steel.jpeg"
  },
  {
    type_name: "Fire",
    type_img_icon: "https://raw.githubusercontent.com/ramzpat/pkm-assets/main/type_images/type-fire.jpeg"
  },
  {
    type_name: "Water",
    type_img_icon: "https://raw.githubusercontent.com/ramzpat/pkm-assets/main/type_images/type-water.jpeg"
  },
  {
    type_name: "Grass",
    type_img_icon: "https://raw.githubusercontent.com/ramzpat/pkm-assets/main/type_images/type-grass.jpeg"
  },
  {
    type_name: "Electric",
    type_img_icon: "https://raw.githubusercontent.com/ramzpat/pkm-assets/main/type_images/type-electric.jpeg"
  },
  {
    type_name: "Psychic",
    type_img_icon: "https://raw.githubusercontent.com/ramzpat/pkm-assets/main/type_images/type-psychic.jpeg"
  },
  {
    type_name: "Ice",
    type_img_icon: "https://raw.githubusercontent.com/ramzpat/pkm-assets/main/type_images/type-ice.jpeg"
  },
  {
    type_name: "Dragon",
    type_img_icon: "https://raw.githubusercontent.com/ramzpat/pkm-assets/main/type_images/type-dragon.jpeg"
  },
  {
    type_name: "Dark",
    type_img_icon: "https://raw.githubusercontent.com/ramzpat/pkm-assets/main/type_images/type-dark.jpeg"
  },
  {
    type_name: "Fairy",
    type_img_icon: "https://raw.githubusercontent.com/ramzpat/pkm-assets/main/type_images/type-fairy.jpeg"
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
