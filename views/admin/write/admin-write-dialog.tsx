"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AdminWriteDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AdminWriteDialog = ({ isOpen, setIsOpen }: AdminWriteDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시글 설정</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AdminWriteDialog;
