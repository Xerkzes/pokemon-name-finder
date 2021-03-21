import React, { useState } from "react";
import { PokeGuess } from "./version1/PokeGuess";
import { PokeGuess2 } from "./version2/PokeGuess2";

interface WebsiteProps {}

export const Website: React.FC<WebsiteProps> = ({}) => {
  const [showVersion, setShowVersion] = useState<string>("v1");

  return (
    <div>
      <div className="page-title">
        <h1>Poke-Name-Finder</h1>
        <div className="page-versions-div">
          <p className="page-version" onClick={() => setShowVersion("v1")}>
            v1
          </p>
          <p className="page-version-seperator">/</p>
          <p className="page-version" onClick={() => setShowVersion("v2")}>
            v2
          </p>
        </div>
      </div>

      {showVersion === "v1" ? (
        <PokeGuess />
      ) : showVersion === "v2" ? (
        <PokeGuess2 />
      ) : (
        <div>Nothing to see</div>
      )}
    </div>
  );
};
