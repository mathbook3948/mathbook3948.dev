"use client";

import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const AdminWriteSave = () => {
  return (
    <Button type="submit" className="absolute right-4 bottom-4">
      <Save />
    </Button>
  );
};

export default AdminWriteSave;
