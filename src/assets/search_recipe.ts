
import condimentList from './data/condiments.json'
import fillingList from './data/fillings.json'
import tasteList from './data/flavors.json'
// import fillingMap from './data/fillings-map.json'
// let fillingMap = JSON.parse('ts_scripts/data/fillings-map.json')

export interface ingredient {
  name:string
}

export interface sandwich_ingredients {
  fillings:ingredient[];
  condiments:ingredient[];
}

const POWER_CANDIDATE_TASTES_MAP = [
  { power:"Humungo Power",
    candidates:[ "Hot", "Salty", "Sour"],
  }, {
    power:"Raid Power",
    candidates: ["Hot", "Sweet"]
  }, {
    power:"Item Drop Power",
    candidates: ["Bitter", "Sour", "Hot", "Sweet"]
  }, {
    power:"Exp. Point Power",
    candidates:["Bitter", "Salty"]
  }, {
    power:"Teensy Power",
    candidates:["Sour", "Salty", "Bitter", "Hot"]
  }, {
    power:"Catching Power",
    candidates:["Sour", "Sweet"]
  }, {
    power:"Encounter Power",
    candidates:["Salty", "Hot", "Sour", "Sweet"]
  }, {
    power:"Egg Power",
    candidates:["Sweet", "Salty"]
  }, {
    power: "Sparkling Power",
    candidates: ["Sparkling"]
  }, {
    power:"Title Power",
    candidates: ["Title"]
  }
]

export const POWER_ALIAS:Map<string, string> = new Map([
  ["Humungo Power", "Humungo"],
  ["Raid Power", "Raid"],
  ["Item Drop Power", "Item"],
  ["Exp. Point Power", "Exp"],
  ["Teensy Power", "Teensy"],
  ["Catching Power", "Catch"],
  ["Encounter Power", "Encounter"],
  ["Egg Power", "Egg"],
  ["Sparkling Power", "Sparkling"],
  ["Title Power", "Title"]
])


export function find_candidate_ingredients
  (level:number, type:string, powers:string[], useHerbal:boolean):sandwich_ingredients {
  const maxFillings = 6;
  const maxCondiments = 4;

  // Filter the candidates by type
  let candidateFillings = fillingList.filter(
    (filling) => (
      filling.types.filter((_type) => (_type.type === type)).length > 0
    )
  ).slice(0)

  // Sort the ingredients according to the amount
  candidateFillings = candidateFillings.sort(
    (a, b) => {
      let type_a = a.types.filter((t) => (t.type === type))[0]
      let type_b = b.types.filter((t) => (t.type === type))[0]
      return type_b.amount - type_a.amount;
    }
  ).slice(0)
  
  // Derive the target tastes that could be candidates for making a sandwich 
  let targetTastes = new Set();  
  powers.map(
    (power) => {
      POWER_CANDIDATE_TASTES_MAP.filter(
        (power_map) => (power_map.power === power)
      )[0].candidates.map(
        (taste) => {
          targetTastes.add(taste)
        }
      )
    }
  )

  // Filter ingredients by the target taste 
  candidateFillings = candidateFillings.filter(
    (filling) => {
      let hasTaste = false; 
      filling.tastes.map(
        (taste) => {
          if (targetTastes.has(taste.flavor)){
            hasTaste = true;
          }
        }
      )
      return hasTaste;
    }
  ).slice(0)

  // Filter herbal if they are not needed
  let candidateCondiments = condimentList.filter(
    (condiment) => (useHerbal || condiment.name.indexOf("Herba") <= -1)
  )
  
  // Remove the ingredient that have a negative effect on the desired powers 
  candidateCondiments = candidateCondiments.filter(
    (condiment) => {
      let removeThis = false;
      powers.map(
        (power) => {
          let condi = condiment.powers.filter((_power) => (_power.type === POWER_ALIAS.get(power)))[0];
          if (condi && condi.amount < 0) 
          {
            removeThis = true;
          }
        }
      )
      return !removeThis;
    }
  )
  candidateCondiments = candidateCondiments.filter(
    (filling) => (
      filling.types.filter((_type) => (_type.type === type)).length > 0
    )
  ).slice(0)

  candidateFillings = candidateFillings.filter(
    (filling) => {
      let removeThis = false;
      powers.map(
        (power) => {
          let condi = filling.powers.filter((_power) => (_power.type === POWER_ALIAS.get(power)))[0];
          if (condi && condi.amount < 0) 
          {
            removeThis = true;
          }
        }
      )
      return !removeThis;
    }
  )
  

  console.log(candidateCondiments)
  
  let _ret_filling:ingredient[] = []
  candidateFillings.map(
    (filling) => (
      _ret_filling.push(
        {name: filling.name}
      )
    )
  )

  let _ret_condiments:ingredient[] = []
  candidateCondiments.map(
    (condiment) => (
      _ret_condiments.push(
        {name: condiment.name}
      )
    )
  )

  return {
    fillings:_ret_filling,
    condiments:_ret_condiments
  }
};
