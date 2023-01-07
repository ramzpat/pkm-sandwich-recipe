import React, { useState } from 'react';
import './App.css';

import { recipe_filter } from './scripts/data_model';

import FilterContainer from './components/FilterContainer';
import RecipeList from './components/RecipeList';
import {BiXCircle} from 'react-icons/bi'

function App() {
  // Filters for recipes 

  const [isAlert, setAlert] = useState<boolean>(false);
  const [alearMsg, setAlertMsg] = useState<string>("error_msg");
  
  const [filter, setFilter] = useState<recipe_filter>({
    effect_filters:[],
    showBuyable:true,
    showHerbal:true
  });
  return (
    <div className="App">
      <header className="App-header">
        <div 
          className={`alert error ${(isAlert)?"":"hide"}`}
          onClick={() => {setAlert(false); setAlertMsg("")}}
          >
          {alearMsg}
          <BiXCircle
            className="closebtn"
            size={30}
          />
        </div>
        <RecipeList filter={filter}/>
        <FilterContainer
          filter={filter}
          setFilter={setFilter}
          setAlert={setAlert}
          setAlertMsg={setAlertMsg}
          />
        <div className="footer">
          <small>
          <a href="https://github.com/ramzpat/pkm-sandwich-recipe">Source code</a>
          </small>
          <span> | </span>
          <small>
          Last update: 2023-01-08
          </small>
        </div>
      </header>
    </div>
  );
}

export default App;
