"use client";

import React from "react";
import { useGameStore } from "@/store/game.store";
import { Player } from "@/enums/player";
import IconX from "./icons/icon-x";
import IconO from "./icons/icon-o";

export function TurnIndicator() {
  const game = useGameStore();

  const PlayerIcon = game.turn === Player.X ? IconX : IconO;

  return (
    <div className="flex items-center gap-2 w-min h-14 px-6 py-2 bg-neutral-sm-dark-navy rounded-xl border-b-6 border-neutral">
      <PlayerIcon className="h-6 w-6 fill-neutral-silver-dark" />
      <h1 className="text-neutral-silver-dark font-bold uppercase">Joga</h1>
    </div>
  );
}
