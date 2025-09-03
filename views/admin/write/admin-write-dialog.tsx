"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AdminWriteDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AdminWriteDialog = ({ isOpen, setIsOpen }: AdminWriteDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <div>게시판 설정</div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminWriteDialog;
