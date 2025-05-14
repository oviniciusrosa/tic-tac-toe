import React, { useMemo } from "react";
import { Animation } from "./animations";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game.store";
import { useWinHistory } from "@/store/win-history.store";

export function GameStats() {
  const game = useGameStore();
  const wins = useWinHistory();

  const totalWins = useMemo(() => {
    if (!game.gameMode) return { x: 0, o: 0, none: 0 };

    return wins[game.gameMode];
  }, [wins, game.gameMode]);

  return (
    <Animation.Entrance>
      <footer className="flex gap-4 mt-4 text-neutral">
        <StatBox title="Jogadas" value={totalWins.x} variant="primary" />
        <StatBox title="Derrotas" value={totalWins.none} variant="tertiary" />
        <StatBox title="Vitórias" value={totalWins.o} variant="secondary" />
      </footer>
    </Animation.Entrance>
  );
}

type StatBoxProps = {
  title: string;
  value: number;
  variant: "primary" | "secondary" | "tertiary";
};

function StatBox(props: StatBoxProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl w-full p-4 text-sm uppercase",
        props.variant === "primary" && "bg-primary",
        props.variant === "secondary" && "bg-secondary",
        props.variant === "tertiary" && "bg-neutral-silver"
      )}
    >
      <p>{props.title}</p>
      <p className="font-bold text-2xl">
        {props.value.toString().padStart(2, "0")}
      </p>
    </div>
  );
}
