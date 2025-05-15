"use client";

import React from "react";
import { Tile } from "@/components/tile";
import { useGameStore } from "@/store/game.store";
import { Animation } from "@/components/animations";
import { useCpuPlayer } from "@/hooks/cpu-player.hook";

export function GameBoard() {
  const game = useGameStore();

  const isCpuMoving = useCpuPlayer();

  function handleUserMove(index: number) {
    if (game.board[index] !== null || isCpuMoving) return;

    game.move(game.turn, index);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {game.board.map((tile, index) => (
        <Animation.Entrance key={index} delay={index * 0.05}>
          <Tile
            value={tile}
            onChange={() => handleUserMove(index)}
            boardPosition={index}
          />
        </Animation.Entrance>
      ))}
    </div>
  );
}
