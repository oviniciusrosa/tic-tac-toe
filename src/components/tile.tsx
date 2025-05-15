import { Player } from "@/enums/player";
import React, { useMemo } from "react";
import IconX from "./icons/icon-x";
import IconO from "./icons/icon-o";
import { cn } from "@/lib/utils";
import { Animation } from "./animations";
import { useGameStore } from "@/store/game.store";
import { WinCondition } from "@/entities/win-condition";

type Props = {
  boardPosition: number;
  value: Player | null;
  onChange: () => void;
};

export function Tile({ boardPosition, value, onChange }: Props) {
  const game = useGameStore();
  const PlayerIcon = value === Player.X ? IconX : IconO;

  const winnerTile = useMemo(() => {
    const itsTie = game.winner === Player.None;
    if (value === null || itsTie) return false;

    return WinCondition.itsWinnerSequence(game.board, value, boardPosition);
  }, [game.winner, value]);

  const iconColor = useMemo(() => {
    if (winnerTile) return "fill-neutral-sm-dark-navy";

    return value === Player.X ? "fill-primary" : "fill-secondary";
  }, [value, winnerTile]);

  const winnerBg = useMemo(() => {
    if (!winnerTile) return null;

    if (game.winner === Player.X) return "!bg-primary";

    return "!bg-secondary";
  }, [winnerTile, game.winner]);

  return (
    <Animation.GrowEffect>
      <button
        type="button"
        className={cn(
          "flex items-center justify-center h-36 w-36 max-[448px]:max-h-[calc(100vw-71vw)] max-[448px]:max-w-[calc(100vw-71vw)] bg-neutral-sm-dark-navy rounded-xl border-b-6 border-neutral cursor-pointer",
          winnerBg
        )}
        onClick={onChange}
      >
        {value !== null && (
          <PlayerIcon className={cn("h-16 w-16", iconColor)} />
        )}
      </button>
    </Animation.GrowEffect>
  );
}
