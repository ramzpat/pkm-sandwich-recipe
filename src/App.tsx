import React, { useState } from 'react';
import './App.css';

import { recipe_filter } from './scripts/data_model';

import FilterContainer from './components/FilterContainer';
import RecipeList from './components/RecipeList';

function App() {
  // Filters for recipes 
  
  const [filters, setFilters] = useState<{id:number, filter:recipe_filter}[]>([]);
  return (
    <div className="App">
      <header className="App-header">
        <FilterContainer
          filters={filters}
          setFilters={setFilters}
          />
        <RecipeList filters={filters}/>
      </header>
    </div>
  );
}

export default App;
