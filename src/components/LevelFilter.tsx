import React from "react"

export const LevelList:number[] = [1, 2, 3];

const LevelFilter:React.FC<{
  displayLevelChoices:boolean, 
  setDisplayLevelChoice: React.Dispatch<React.SetStateAction<boolean>>,
  filter:number, 
  setFilter:React.Dispatch<React.SetStateAction<number>>}> = ({displayLevelChoices, setDisplayLevelChoice, filter, setFilter}) => {
  return (
    <div 
      className={`filter-container ${(displayLevelChoices)?"":"hide"}`}
      >
      <div className="filter-title">Min Level: </div>
      <div className="choice-container">
      {
        LevelList.map(
          (_level:number) => (
          <div 
            key={_level}
            className={`level-box three-items ${(filter === _level)?"level-select":"level"}`}
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