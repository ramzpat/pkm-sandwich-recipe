import React from "react"
import TypeList from "../assets/data/types.json"

const TypeFilter: React.FC<{
  filter:string, 
  setFilter:React.Dispatch<React.SetStateAction<string>>}> = ({filter, setFilter}) => {
  return (
    <div className="filter-container">
      <span className="filter-title">Type: </span>
      <div className="choice-container">
      {
        TypeList.map(
          (type:string, index:number) => (
            <div
              key={index} 
              onClick={() => {setFilter(type)}}
              className={`type-box ${(filter === type)?"type-select":"type-unselect"}`}>
                {type}
            </div>
          )
        )
      }
      </div>
    </div>
  )
}

export default TypeFilter
