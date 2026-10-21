"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Program } from "@/types/program";
import { useAdminPrograms } from "@/hooks/useAdminPrograms";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStatCards from "@/components/admin/AdminStatCards";
import AdminFilters from "@/components/admin/AdminFilters";
import AdminTable from "@/components/admin/AdminTable";
import AdminPagination from "@/components/admin/AdminPagination";
import EditProgramDrawer from "@/components/admin/EditProgramDrawer";
import CreateProgramDrawer from "@/components/admin/CreateProgramDrawer";

export default function AdminListingPage() {
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const isEditOpen = Boolean(editingProgram);
  const isDrawerOpen = isEditOpen || isCreateOpen;

  const {
    programs,
    totalPages,
    counts,
    loading,
    error,
    search,
    setSearch,
    type,
    setType,
    educationLevel,
    setEducationLevel,
    verification,
    setVerification,
    sort,
    setSort,
    page,
    setPage,
    selectedIds,
    toggleRow,
    toggleSelectAll,
    isAllSelected,
    exportList,
    updateProgramLocally,
    refetch,
  } = useAdminPrograms();

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
  };

  const handleSaveSuccess = (updated: Program) => {
    updateProgramLocally(updated);
    refetch();
  };

  const handleCreateSuccess = () => {
    refetch();
  };

  const handleDelete = (program: Program) => {
    toast.error("Konfirmasi Hapus", {
      description: `Program "${program.name}" akan dihapus.`,
      action: {
        label: "Hapus",
        onClick: () => {
          toast.success("Program berhasil dihapus");
        },
      },
    });
  };

  return (
    <>
      <div
        className={`w-full flex flex-col pt-6 px-4 pb-8 lg:pt-[94px] lg:pr-[61px] lg:pb-[36px] lg:pl-[48px] transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-35 pointer-events-none select-none" : "opacity-100"
        }`}
        style={{ fontFamily: "var(--font-Inter), Inter, sans-serif" }}
      >
        {/* 1. Header (Title & Subtitle) */}
        <AdminHeader />

        {/* 2. Stat Summary Cards */}
        <AdminStatCards counts={counts} />

        {/* 3. Search and Filters */}
        <AdminFilters
          search={search}
          setSearch={setSearch}
          type={type}
          setType={setType}
          educationLevel={educationLevel}
          setEducationLevel={setEducationLevel}
          verification={verification}
          setVerification={setVerification}
          sort={sort}
          setSort={setSort}
          onExport={exportList}
          onAddListing={() => setIsCreateOpen(true)}
        />

        {/* 4. Data Table */}
        <AdminTable
          programs={programs}
          loading={loading}
          error={error}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          onToggleSelectAll={toggleSelectAll}
          onToggleRow={toggleRow}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* 5. Pagination */}
        <AdminPagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>

      {/* 6. Edit Program Slide-over Drawer */}
      <EditProgramDrawer
        program={editingProgram}
        isOpen={isEditOpen}
        onClose={() => setEditingProgram(null)}
        onSuccess={handleSaveSuccess}
      />

      {/* 7. Create Program Slide-over Drawer */}
      <CreateProgramDrawer
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </>
  );
}
