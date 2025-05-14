"use client";

import React from "react";
import { GameBoard } from "@/components/game-board";
import { Logo } from "@/components/logo";
import { TurnIndicator } from "@/components/turn-indicator";
import { Animation } from "@/components/animations";
import { RestartGameButton } from "@/components/restart-game-button";

export default function GamePage() {
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
    </section>
  );
}
