import React from "react"

export const PowerList = [
  "Encounter Power",
  "Egg Power",
  "Catching Power",
  "Sparkling Power",
  "Title Power",
  "Raid Power",
  "Exp. Point Power",
  "Item Drop Power",
  "Humungo Power",
  "Teensy Power"
];


const PowerFilter: React.FC<{
  displayEffectChoices:boolean, 
  setDisplayEffectChoice: React.Dispatch<React.SetStateAction<boolean>>,
  filter:string, 
  setFilter:React.Dispatch<React.SetStateAction<string>>}> = ({displayEffectChoices, setDisplayEffectChoice, filter, setFilter}) => {
  return (
    <div 
      className={`filter-container ${(displayEffectChoices)?"":"hide"}`}
      >
      <span className="filter-title">Power: </span>
      <div className="power-container">
      {
        PowerList.map(
          (power:string, index:number) => (
            <div
              key={index} 
              onClick={() => {setFilter(power);setDisplayEffectChoice(false);}}
              className={`power-box ${(filter === power)?"power-select":"power-unselect"}`}>
                {power.split(' ')[0]}
            </div>
          )
        )
      }
      </div>
    </div>
  )
}

export default PowerFilter
