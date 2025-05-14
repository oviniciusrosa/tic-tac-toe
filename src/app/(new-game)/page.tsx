"use client";

import { Animation } from "@/components/animations";
import { Button } from "@/components/button";
import { Logo } from "@/components/logo";
import { PlayerSelect } from "@/components/player-select";
import Link from "next/link";

export default function NewGamePage() {
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
          {/* <Link href="/game"> */}
          <Button variant="primary">Novo Jogo (VS CPU)</Button>
          {/* </Link> */}
        </Animation.Entrance>

        <Animation.Entrance delay={0.1}>
          <Link href="/game">
            <Button variant="secondary">Novo Jogo (VS PLAYER)</Button>
          </Link>
        </Animation.Entrance>
      </div>
    </>
  );
}
