import React from "react"

export const LevelList:number[] = [1, 2, 3];

const LevelFilter:React.FC<{
  filter:number, 
  setFilter:React.Dispatch<React.SetStateAction<number>>}> = ({filter, setFilter}) => {
  return (
    <div className="filter-container">
      <div className="filter-title">Level at least: </div>
      <div className="choice-container">
      {
        LevelList.map(
          (_level:number) => (
          <div 
            key={_level}
            className={`level-box ${(filter === _level)?"level-select":"level"}`}
            onClick={() => { setFilter(_level) }}>
          {_level}
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default LevelFilter;