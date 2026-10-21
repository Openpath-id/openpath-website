"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface AdminPaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export default function AdminPagination({ page, totalPages, setPage }: AdminPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8 select-none">
      {/* Previous Page Button */}
      <button
        type="button"
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Halaman sebelumnya"
        className="w-8 h-8 rounded-full flex items-center justify-center text-[#17221F] hover:bg-neutral-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        const pageNum = i + 1;
        const isActive = page === pageNum;

        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => setPage(pageNum)}
            aria-label={`Ke halaman ${pageNum}`}
            aria-current={isActive ? "page" : undefined}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all cursor-pointer ${
              isActive ? "bg-[#176B5B] text-white shadow-sm" : "text-[#17221F] hover:bg-neutral-200"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {totalPages > 5 && (
        <>
          <span className="px-1 text-neutral-400">...</span>
          <button
            type="button"
            onClick={() => setPage(totalPages)}
            aria-label={`Ke halaman ${totalPages}`}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all cursor-pointer ${
              page === totalPages
                ? "bg-[#176B5B] text-white shadow-sm"
                : "text-[#17221F] hover:bg-neutral-200"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Page Button */}
      <button
        type="button"
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Halaman berikutnya"
        className="w-8 h-8 rounded-full flex items-center justify-center text-[#17221F] hover:bg-neutral-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
