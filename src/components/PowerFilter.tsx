import React from "react"
import PowerList from "../assets/data/powers.json"

const PowerFilter: React.FC<{
  filter:string, 
  setFilter:React.Dispatch<React.SetStateAction<string>>}> = ({filter, setFilter}) => {
  return (
    <div className="filter-container">
      <span className="filter-title">Power: </span>
      <div className="choice-container">
      {
        PowerList.map(
          (power:string, index:number) => (
            <div
              key={index} 
              onClick={() => {setFilter(power)}}
              className={`power-box ${(filter === power)?"power-select":"power-unselect"}`}>
                {power}
            </div>
          )
        )
      }
      </div>
    </div>
  )
}

export default PowerFilter
