import React, { useEffect, useRef, useState } from "react";
import { InterfacePokemon } from "../../../helpers/interfaces";
import { createImgUrl } from "../../../helpers/Utility";

interface PokemonsProps {
  nextPage: (page: string) => void;
  pokemons: InterfacePokemon[] | undefined;
  usePicture: boolean;
}

export const Pokemons: React.FC<PokemonsProps> = ({
  nextPage,
  pokemons,
  usePicture,
}) => {
  const [showPokemons, setShowPokemons] = useState<boolean>();
  const cardsThatAreLoaded = useRef<number>(0);

  const imagesAreLoaded = () => {
    cardsThatAreLoaded.current += 1;
    if (cardsThatAreLoaded.current == pokemons?.length) {
      setShowPokemons(true);
      cardsThatAreLoaded.current = 0;
    }
  };

  useEffect(() => {
    if ((pokemons != undefined && pokemons?.length <= 0) || !usePicture) {
      setShowPokemons(true);
    } else {
      setShowPokemons(false);
    }
  }, []);

  return (
    <div className="version2-page-container">
      <button className="back-button" onClick={() => nextPage("search")}>
        &#60; &#60;
      </button>

      <h2 className="page2-title">Pokemons: {pokemons?.length}</h2>

      <div>
        <div
          className="pokemon-cards-loader2"
          style={{ display: showPokemons ? "none" : "block" }}
        ></div>

        <div
          style={{ display: showPokemons ? "" : "none" }}
          className={
            usePicture ? "pokemon-image-container" : "pokemon-name-container"
          }
        >
          {pokemons?.map((pokemon: InterfacePokemon, idx) => {
            return usePicture ? (
              <div key={idx} className="pokemon-image-card">
                <img
                  className="pokemon-img"
                  src={createImgUrl(pokemon)}
                  alt="img"
                  onLoad={imagesAreLoaded}
                />
                <p>{pokemon.name}</p>
              </div>
            ) : (
              <div key={idx}>
                <p className="pokemon-name">{pokemon.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
