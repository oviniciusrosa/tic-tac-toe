"use client";

import { Animation } from "@/components/animations";
import { Button } from "@/components/button";
import { Logo } from "@/components/logo";
import { PlayerSelect } from "@/components/player-select";
import { GameMode } from "@/enums/game-mode";
import { useGameStore } from "@/store/game.store";
import Link from "next/link";
import { useEffect } from "react";

export default function NewGamePage() {
  const game = useGameStore();

  function selectGameMode(gameMode: GameMode) {
    return () => game.setGameMode(gameMode);
  }

  useEffect(game.restart, []);

  return (
    <>
      <Logo />

      <div className="w-full">
        <Animation.Entrance>
          <PlayerSelect />
        </Animation.Entrance>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <Animation.Entrance delay={0.05}>
          <Link href="/game">
            <Button
              variant="primary"
              onClick={selectGameMode(GameMode.VSComputer)}
            >
              Novo Jogo (VS CPU)
            </Button>
          </Link>
        </Animation.Entrance>

        <Animation.Entrance delay={0.1}>
          <Link href="/game">
            <Button
              variant="secondary"
              onClick={selectGameMode(GameMode.VSHuman)}
            >
              Novo Jogo (VS PLAYER)
            </Button>
          </Link>
        </Animation.Entrance>
      </div>

      <footer className="absolute bottom-[20px] left-0 w-full flex items-center justify-center">
        <p className="text-neutral-silver-dark text-xs">
          Desenvolvido com {"<3"} por{" "}
          <a
            href="https://github.com/oviniciusrosa"
            className="text-primary hover:text-shadow-primary-600 transition-colors"
          >
            Vinicius Rosa
          </a>
        </p>
      </footer>
    </>
  );
}
