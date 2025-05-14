"use client";

import React from "react";
import { Player } from "@/enums/player";
import { PlayerSelectButton } from "./player-select-button";
import { useGameStore } from "@/store/game.store";

export function PlayerSelect() {
  const game = useGameStore();
  const ref = React.useRef<HTMLDivElement>(null);

  function toggleSelectedPlayer() {
    if (!ref.current) return;

    ref.current.classList.toggle("left-[calc(50%-8px)]");

    game.setMainPlayer(game.mainPlayer === Player.X ? Player.O : Player.X);
  }

  return (
    <div className="p-4 bg-neutral-sm-dark-navy rounded-xl border-b-6 border-neutral">
      <h1 className="text-neutral-silver-dark text-md text-center uppercase font-bold mb-4">
        Selecione sua marca
      </h1>

      <button
        type="button"
        className="h-20 flex gap-2 p-2 items-center flex-wrap w-full bg-neutral-dark-navy rounded-xl relative cursor-pointer"
        onClick={toggleSelectedPlayer}
      >
        <PlayerSelectButton
          isSelected={game.mainPlayer === Player.X}
          value={Player.X}
        />

        <PlayerSelectButton
          isSelected={game.mainPlayer === Player.O}
          value={Player.O}
        />

        <div
          ref={ref}
          className="absolute left-2 w-[50%] h-16 bg-neutral-silver-dark rounded-xl transition-all duration-200 ease-in-out"
        />
      </button>

      <p className="text-neutral-silver-dark text-[12px] text-center uppercase font-bold opacity-45 mt-4">
        Lembre-se: X joga primeiro
      </p>
    </div>
  );
}
