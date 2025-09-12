"use client";

import Image from "next/image";
import { useAdmin } from "@/views/shared/admin-provider";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  appTitle: string;
}

const Navbar = ({ appTitle }: NavbarProps) => {
  const { isAdmin } = useAdmin();
  const router = useRouter();

  return (
    <div className="flex flex-row items-center justify-between h-12 mb-4">
      <span className="text-2xl font-bold text-center cursor-pointer">{appTitle}</span>
      <div className="flex flex-row items-center gap-2">
        {isAdmin && (
          <Button
            variant="secondary"
            className="cursor-pointer"
            onClick={() => router.push("/admin/write")}>
            <Plus />
            새로운 글
          </Button>
        )}
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
