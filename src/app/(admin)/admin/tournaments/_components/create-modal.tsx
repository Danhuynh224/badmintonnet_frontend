"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TournamentCreateForm from "@/app/(admin)/admin/tournaments/_components/create-form";

export default function TournamentCreateModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Nút mở modal */}
      <DialogTrigger asChild>
        <Button>+ Tạo giải đấu mới</Button>
      </DialogTrigger>

      {/* Nội dung Modal */}
      <DialogContent
        className="
    sm:max-w-[70vw] 
    max-w-[70vw] 
    w-full 
    max-h-[90vh] 
    overflow-y-auto 
    dark:bg-gray-900 
    rounded-2xl 
    p-6 
    border border-gray-300 dark:border-gray-700
  "
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Tạo Giải Đấu Mới
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <TournamentCreateForm onCreated={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
