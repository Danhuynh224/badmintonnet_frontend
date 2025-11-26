import CategoryBreadcrumb from "@/app/(main)/tournaments/[id]/categories/[categoryId]/_components/category-breadcrumb";
import CategoryHeader from "@/app/(main)/tournaments/[id]/categories/[categoryId]/_components/category-header";
import CategoryStats from "@/app/(main)/tournaments/[id]/categories/[categoryId]/_components/category-stats";
import CategoryTabs from "@/app/(main)/tournaments/[id]/categories/[categoryId]/_components/category-tabs";
import tournamentApiRequest from "@/apiRequest/tournament";
import { CategoryDetail } from "@/schemaValidations/tournament.schema";
import { cookies } from "next/headers";

interface CategoryDetailProps {
  tournamentId: string;
  categoryId: string;
}

export default async function TournamentCategoryDetail({
  tournamentId,
  categoryId,
}: CategoryDetailProps) {
  let category: CategoryDetail | null = null;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  try {
    const response = await tournamentApiRequest.getCategoryDetail(
      categoryId,
      accessToken?.value
    );
    category = response.payload.data;
  } catch (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600 dark:text-gray-400">
          Không thể tải thông tin hạng mục
        </p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600 dark:text-gray-400">
          Không tìm thấy hạng mục
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CategoryBreadcrumb
        tournamentId={tournamentId}
        tournamentName={category.tournamentName}
        categoryLabel={category.category}
      />

      <CategoryHeader category={category} categoryId={categoryId} />

      <CategoryStats category={category} />

      {/* ⚠ Nếu CategoryTabs dùng hook → phải "use client" */}
      <CategoryTabs category={category} />
    </div>
  );
}
