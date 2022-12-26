import React, { useState } from 'react';
import './App.css';

import { recipe_filter } from './scripts/data_model';

import FilterContainer from './components/FilterContainer';
import RecipeList from './components/RecipeList';

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

          <div 
            className="closebtn"
          >[x]</div>
        </div>

        <RecipeList filter={filter}/>
        <FilterContainer
          filter={filter}
          setFilter={setFilter}
          setAlert={setAlert}
          setAlertMsg={setAlertMsg}
          />
      </header>
    </div>
  );
}

export default App;
