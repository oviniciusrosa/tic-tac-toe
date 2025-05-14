import { Player } from "@/enums/player";
import { GameBoard } from "@/store/game.store";

const WIN_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function itWins(board: GameBoard, player: Player): boolean {
  return WIN_CONDITIONS.some((condition) =>
    condition.every((index) => board[index] === player)
  );
}

export function itsWinnerSequence(
  board: GameBoard,
  player: Player,
  tiePosition: number
): boolean {
  let winnerSequence: number[] = [];

  WIN_CONDITIONS.some((condition) => {
    const playerWon = condition.every((index) => board[index] === player);

    if (playerWon) {
      winnerSequence = condition;
      return true;
    }
  });

  return winnerSequence.includes(tiePosition);
}

export const WinCondition = {
  itWins,
  itsWinnerSequence,
};
