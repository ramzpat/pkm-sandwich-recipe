import React from "react"

export const LevelList:number[] = [1, 2, 3];

const LevelFilter:React.FC<{
  displayLevelChoices:boolean, 
  setDisplayLevelChoice: React.Dispatch<React.SetStateAction<boolean>>,
  filter:number, 
  setFilter:React.Dispatch<React.SetStateAction<number>>}> = ({displayLevelChoices, setDisplayLevelChoice, filter, setFilter}) => {
  return (
    <div 
      className={`popup_container ${(displayLevelChoices)?"":"hide"}`}
      >
      <div className="filter_title">Min Level: </div>
      <div className="lvl_choice_container">
      {
        LevelList.map(
          (_level:number) => (
          <div 
            key={_level}
            className={`clickable_box level_box ${(filter === _level)?"active_box":""}`}
            onClick={() => { setFilter(_level);setDisplayLevelChoice(false) }}>
          {_level}
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default LevelFilter;