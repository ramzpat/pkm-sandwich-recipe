import React, { useState } from 'react';
import './App.css';

import { recipe_filter } from './scripts/data_model';

import FilterContainer from './components/FilterContainer';
import RecipeList from './components/RecipeList';

function App() {
  // Filters for recipes 
  
  const [filter, setFilter] = useState<recipe_filter>({
    effect_filters:[],
    showBuyable:true,
    showHerbal:true
  });
  return (
    <div className="App">
      <header className="App-header">
        <FilterContainer
          filter={filter}
          setFilter={setFilter}
          />
        <RecipeList filter={filter}/>
      </header>
    </div>
  );
}

export default App;
