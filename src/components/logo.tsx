import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <div className="cursor-pointer">
        <Image
          src="/icons/logo.svg"
          alt="Logo"
          width={65}
          height={65}
          className="!pointer-events-none"
        />
      </div>
    </Link>
  );
}
