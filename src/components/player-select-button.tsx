import { Player } from "@/enums/player";

import React from "react";
import IconO from "./icons/icon-o";
import IconX from "./icons/icon-x";
import { cn } from "@/lib/utils";

type Props = {
  isSelected: boolean;
  value: Player;
};

export function PlayerSelectButton({ isSelected, value }: Props) {
  const PlayerIcon = value === Player.X ? IconX : IconO;

  return (
    <div className="flex items-center justify-center flex-1">
      <PlayerIcon
        className={cn(
          "h-8 w-8 z-10",
          isSelected ? "fill-neutral-dark-navy" : "fill-neutral-silver-dark"
        )}
      />
    </div>
  );
}
