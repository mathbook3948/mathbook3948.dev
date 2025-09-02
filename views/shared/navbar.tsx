"use client";

interface NavbarProps {
  appTitle: string;
}

const Navbar = ({ appTitle }: NavbarProps) => {
  return (
    <div className="flex flex-row items-center h-12 border-b border-b-muted-foreground/20 mb-4">
      <span className="text-2xl font-bold text-center cursor-pointer">{appTitle}</span>
    </div>
  );
};

export default Navbar;
