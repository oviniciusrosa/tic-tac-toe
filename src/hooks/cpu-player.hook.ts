import { GameMode } from "@/enums/game-mode";
import { useGameStore } from "@/store/game.store";
import { useEffect, useMemo, useState } from "react";

export function useCpuPlayer() {
  const game = useGameStore();

  const [isCpuMoving, setIsCpuMoving] = useState(false);

  function generateRandomMove() {
    const randomPosition = Math.floor(Math.random() * 9);
    if (game.board[randomPosition] !== null) return generateRandomMove();

    game.move(game.turn, randomPosition);
    setIsCpuMoving(false);
  }

  useEffect(() => {
    const isCPUTurn = game.turn !== game.mainPlayer;
    const CPUMove = game.gameMode === GameMode.VSComputer && isCPUTurn;

    if (CPUMove && !game.isGameOver) {
      setIsCpuMoving(true);
      setTimeout(generateRandomMove, 400);
    }
  }, [game.turn, game.gameMode, game.mainPlayer, game.isGameOver]);

  return isCpuMoving;
}
