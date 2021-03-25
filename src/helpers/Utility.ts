import PokemonData from "./Pokemons.json";
import { InterfacePokemon } from "./interfaces";
import typeColors from "./TypeColor";

// create the path to the pokemon-image
export const createImgUrl = (pokeData: InterfacePokemon) => {
    const suffix =
    pokeData.spriteSuffix === undefined ? "" : pokeData.spriteSuffix;
  return "sprites/normal/" + pokeData.dexNr + suffix + ".png";
}

// capitalize the first letter
export const craeteTypeName = (name: string) => {
    return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
};

// set Ativation to true if the name is equal to one of the elements in the array
export const setActivation = (name: string, array: string[]) => {
  let b = false;

  array.forEach((el) => {
    if (name.toLocaleLowerCase() === el.toLocaleLowerCase()) {
      b = true;
      return;
    }
  })

  return b;
}

export const setActivationGeneration = (generation: number, array: number[]) => {
  let b = false;

  array.forEach((genNumber) => {
    if (generation === genNumber) {
      b = true;
      return;
    }
  })

  return b;
}

// updates text when onKeyDown on input is fired on the Length Component
export const setText = (event: React.KeyboardEvent<HTMLInputElement>, index: number, guess: string, setFunction: React.Dispatch<React.SetStateAction<string>>) => {
  let key = event.key;
  
  if (key === "Backspace" || key === " ") {
    // create new text = replace character
    let newText =
      guess.substring(0, index) + " " + guess.substring(index + 1);

    // set new text
    setFunction(newText);
  } else if (key.length === 1 && ( /^[a-zA-Z]*$/.test(key) || key === "-")) {
        // create new text = replace character
        let newText =
        guess.substring(0, index) + key + guess.substring(index + 1);
  
      // set new text
      setFunction(newText);
  }
}

export const setText2 = (event: React.ChangeEvent<HTMLInputElement>, index: number, guess: string, setFunction: React.Dispatch<React.SetStateAction<string>>) => {
  let key = event.target.value;
  console.log(event);
  
  if (key === "Backspace" || key === " ") {
    // create new text = replace character
    let newText =
      guess.substring(0, index) + " " + guess.substring(index + 1);

    // set new text
    setFunction(newText);
  } else if (key.length === 1 && ( /^[a-zA-Z]*$/.test(key) || key === "-")) {
        // create new text = replace character
        let newText =
        guess.substring(0, index) + key + guess.substring(index + 1);
  
      // set new text
      setFunction(newText);
  }
}

/*  ==================================
          search for the Pokemon
    ==================================  */
export const pokeSearch = (types: string[], colors: string[], generations: number[], guess: string, setPokemons: any) => {
  /* Debug - search criteria*/
  // console.log(types);
  // console.log(colors);
  // console.log(generations);
  // console.log(guess);

  // array that stores all the pokemon that fullfill the search criteria
  let filterdPokemons: any = [];

  PokemonData.forEach((pokemon: InterfacePokemon) => {
    if (criteriaLength(pokemon, guess) && criteriaTypes(pokemon, types) && 
    criteriaColors(pokemon, colors) && criteriaGeneration(pokemon, generations) && 
      criteriaName(pokemon, guess)) {
      filterdPokemons.push(pokemon);
    }
  })

  /* Debug - search criteria*/
  // console.log(filterdPokemons)

  setPokemons(filterdPokemons);
}

/*  ==================================
            search - criteria
    ==================================  */
const criteriaLength = (pokemon: InterfacePokemon, guess: string) => {
  return pokemon.name.length === guess.length;
}

const criteriaTypes = (pokemon: InterfacePokemon, types: string[]) => {
  let b: boolean = false;

  types.forEach(type => {
    pokemon.types.forEach(pokeType => {
      if (type.toLocaleLowerCase() === pokeType.toLocaleLowerCase()) {
        b = true;
        return;
      }
    })
  })

  return b;
}

const criteriaColors = (pokemon: InterfacePokemon, colors: string[]) => {
  let b: boolean = false;

  colors.forEach(color => {
    if (color.toLocaleLowerCase() === pokemon.color.toLocaleLowerCase()) {
      b = true;
      return;
    }
  })

  return b;
}

const criteriaGeneration = (pokemon: InterfacePokemon, generations: number[]) => {
  let b: boolean = false;

  generations.forEach(gen => {
    if (gen === pokemon.generation) {
      b = true;
      return;
    }
  })

  return b;
}

const criteriaName = (pokemon: InterfacePokemon, guess: string) => {
  for (let i = 0; i < guess.length; i++) {
      if (guess.charAt(i) === " " || pokemon.name.charAt(i).toLocaleLowerCase() === guess.charAt(i).toLocaleLowerCase()) {
        continue;
      }
      else {
        return false;
      }
  }

  return true;
}