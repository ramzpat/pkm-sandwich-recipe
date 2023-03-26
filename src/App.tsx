import React, { useState } from 'react';
import './App.css';
import './styles/alert-msg.css'
import './styles/app-interface.css'

import { recipe_filter } from './scripts/data_model';

import FilterContainer from './components/FilterContainer';
import RecipeList from './components/RecipeList';
import {BiXCircle} from 'react-icons/bi'
import { sandwich_recipe } from './scripts/data_model';

function App() {
  // Alert messages 
  const [isAlert, setAlert] = useState<boolean>(false);
  const [alearMsg, setAlertMsg] = useState<string>("");
  const AlearMsg:React.FC = () => {
    return (
      <div className={`alert_msg error ${(isAlert)?"":"hide"}`}
           onClick={() => {setAlert(false); setAlertMsg("")}} >
        {alearMsg}
        <BiXCircle className="closebtn" size={30} />
      </div>
    )
  }

  // Footer component
  const Footer:React.FC = () => {
    return (
      <div id='footer'>
        <small>
        <a href="https://github.com/ramzpat/pkm-sandwich-recipe">Source code</a>
        </small>
        <span> | </span>
        <small>
        Last update: 2023-01-19
        </small>
      </div>
    )
  }

  // Filter 
  const [filter, setFilter] = useState<recipe_filter>({
    effect_filters:[],
    showBuyable:false,
    showHerbal:true
  });

  const [recipes, setRecipes] = useState<sandwich_recipe[]>([]);

  
  return (
    <div className="App">
      <header className="App-header">
        <div id="app-interface">
          <RecipeList filter={filter} setFilter={setFilter} recipes={recipes}/>
          <FilterContainer
            filter={filter}
            setFilter={setFilter}
            setAlert={setAlert}
            setAlertMsg={setAlertMsg}
            setRecipes={setRecipes}
            />
        </div>
        <Footer/>
        <AlearMsg />
      </header>
    </div>
  );
  
}

export default App;
