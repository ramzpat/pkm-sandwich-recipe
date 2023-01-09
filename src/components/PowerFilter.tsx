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
      className={`popup_container ${(displayEffectChoices)?"":"hide"}`}
      >
      <span className="filter_title">Power: </span>
      <div className="column_container">
      {
        PowerList.map(
          (power:string, index:number) => (
            <div
              key={index} 
              onClick={() => {setFilter(power);setDisplayEffectChoice(false);}}
              className={`clickable_box ${(filter === power)?"active_box":""}`}>
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
