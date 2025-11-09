import Link from "next/link";
import { getCategoryLabel } from "@/schemaValidations/tournament.schema";

interface CategoryBreadcrumbProps {
  tournamentId: string;
  tournamentName?: string;
  categoryLabel: string;
}

export default function CategoryBreadcrumb({
  tournamentId,
  tournamentName,
  categoryLabel,
}: CategoryBreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      <Link
        href="/tournaments"
        className="hover:text-teal-600 dark:hover:text-teal-400 transition"
      >
        Giải đấu
      </Link>
      <span>/</span>
      <Link
        href={`/tournaments/${tournamentId}`}
        className="hover:text-teal-600 dark:hover:text-teal-400 transition"
      >
        {tournamentName || "Chi tiết giải đấu"}
      </Link>
      <span>/</span>
      <span className="text-gray-900 dark:text-white font-medium">
        {getCategoryLabel(categoryLabel)}
      </span>
    </div>
  );
}
