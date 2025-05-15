"use client";

import Image from "next/image";
import React from "react";
import { Animation } from "./animations";
import { useGameStore } from "@/store/game.store";

export function RestartGameButton() {
  const game = useGameStore();

  function resetGame() {
    if (!game.gameMode) return;

    game.restart(game.gameMode, game.mainPlayer);
  }

  return (
    <Animation.GrowEffect>
      <button
        type="button"
        className="flex items-center justify-center bg-neutral-silver-dark rounded-xl w-14 h-14 border-b-6 border-neutral-silver-border cursor-pointer"
        onClick={resetGame}
      >
        <Image
          src="/icons/icon-restart.svg"
          alt="Restart"
          width={20}
          height={20}
        />
      </button>
    </Animation.GrowEffect>
  );
}
