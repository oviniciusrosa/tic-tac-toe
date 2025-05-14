"use client";

import React, { useEffect } from "react";
import { GameBoard } from "@/components/game-board";
import { Logo } from "@/components/logo";
import { TurnIndicator } from "@/components/turn-indicator";
import { Animation } from "@/components/animations";
import { RestartGameButton } from "@/components/restart-game-button";
import { GameStats } from "@/components/game-stats";
import { useGameStore } from "@/store/game.store";
import { useRouter } from "next/navigation";

export default function GamePage() {
  const game = useGameStore();
  const router = useRouter();

  useEffect(() => {
    if (game.gameMode === null) router.push("/");
  }, [game.gameMode]);

  return (
    <section>
      <Animation.SlideUpEntrance>
        <header className="flex items-center justify-between mb-4">
          <Logo />
          <TurnIndicator />
          <RestartGameButton />
        </header>
      </Animation.SlideUpEntrance>

      <GameBoard />
      <GameStats />
    </section>
  );
}
