"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FacilitiesTable } from "./facilities-table";
import { CreateFacilityDialog } from "./create-facility-dialog";
import { FacilityType } from "@/schemaValidations/event.schema";

interface FacilitiesClientProps {
  facilities: FacilityType[];
  totalPages: number;
  currentPage: number;
  totalElements: number;
}

export default function FacilitiesClient({
  facilities,
  totalPages,
  currentPage,
  totalElements,
}: FacilitiesClientProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Quản lý các sân
          </h1>
          <p className="text-muted-foreground text-gray-500 dark:text-gray-400">
            Quản lý thông tin các sân trong hệ thống
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm mới
        </Button>
      </div>

      <FacilitiesTable
        facilities={facilities}
        totalPages={totalPages}
        currentPage={currentPage}
        totalElements={totalElements}
      />

      <CreateFacilityDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
