"use client";

import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 relative">
            <Image 
              src="/logo.png" 
              alt="ColdChain Logo" 
              fill
              sizes="48px"
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Secure ColdChain Tracker
            </h1>
            <p className="text-sm text-muted-foreground">Encrypted Temperature Monitoring with FHE</p>
          </div>
        </div>
        <ConnectButton />
      </div>
    </header>
  );
};
