"use client";

import Image from "next/image";

interface NavbarProps {
  appTitle: string;
}

const Navbar = ({ appTitle }: NavbarProps) => {
  return (
    <div className="flex flex-row items-center justify-between h-12 border-b border-b-muted-foreground/20 mb-4">
      <span className="text-2xl font-bold text-center cursor-pointer">{appTitle}</span>
      <div>
        <Image
          src="/api/favicon"
          alt="App Image"
          width={40}
          height={40}
          className="rounded-full p-1"
        />
      </div>
    </div>
  );
};

export default Navbar;
