"use client";

import { Player } from "@/enums/player";
import { useGameStore } from "@/store/game.store";
import { motion } from "motion/react";
import IconX from "./icons/icon-x";
import IconO from "./icons/icon-o";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import { Button } from "./button";
import { Animation } from "./animations";
import { useRouter } from "next/navigation";
import { useWinHistory } from "@/store/win-history.store";

const DEFAULT_DELAY = 0.2;

export function WinnerIndicatorBanner() {
  const game = useGameStore();
  const history = useWinHistory();

  const router = useRouter();

  function closeGame() {
    router.push("/");
    game.restart();
  }

  function nextGame() {
    if (game.gameMode) game.restart(game.gameMode);
  }

  useEffect(() => {
    if (game.isGameOver && game.winner && game.gameMode) {
      history.upadteWinCount(game.winner, game.gameMode);
    }
  }, [game.isGameOver, game.winner, game.gameMode]);

  if (!game.isGameOver) return <></>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: DEFAULT_DELAY }}
      className="absolute top-0 left-0 w-full bg-[rgba(0,0,0,0.4)] h-full z-100 transition-all flex items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "tween",
          ease: [0.4, 0, 0.1, 1],
          duration: 0.25,
          delay: DEFAULT_DELAY + 0.2,
        }}
        className="flex flex-col items-center justify-center w-full h-64 bg-neutral-sm-dark-navy text-white text-xl font-bold"
      >
        <WinnerIndicatorTitle />

        <div className="flex mt-6 gap-4">
          <Animation.Entrance delay={DEFAULT_DELAY + 0.45}>
            <Button variant="tertiary" onClick={closeGame}>
              Sair
            </Button>
          </Animation.Entrance>

          <Animation.Entrance delay={DEFAULT_DELAY + 0.5}>
            <Button variant="secondary" onClick={nextGame}>
              Próximo Round
            </Button>
          </Animation.Entrance>
        </div>
      </motion.div>
    </motion.div>
  );
}

function WinnerIndicatorTitle() {
  const game = useGameStore();
  const PlayerIcon = game.winner === Player.X ? IconX : IconO;

  const { textColor, message } = useMemo(() => {
    if (game.winner === Player.None)
      return {
        textColor: "text-neutral-silver-dark",
        message: "Empate!",
      };

    if (game.winner === Player.X)
      return {
        textColor: "text-primary",
        message: "levou o round",
      };

    return {
      textColor: "text-secondary",
      message: "levou o round",
    };
  }, [game.winner]);

  return (
    <div className="flex items-center justify-center gap-4 w-full">
      {game.winner !== Player.None && (
        <PlayerIcon
          className={cn(
            "h-12 w-12",
            game.winner === Player.X ? "fill-primary" : "fill-secondary"
          )}
        />
      )}
      <h1 className={cn("text-4xl font-bold uppercase", textColor)}>
        {message}
      </h1>
    </div>
  );
}
