import { Card, CardContent } from "@/components/ui/card";
import { CategoryDetail } from "@/schemaValidations/tournament.schema";
import { Trophy, Target, Clock } from "lucide-react";

interface CategoryStatsProps {
  category: CategoryDetail;
}

const getFormatLabel = (format: string) => {
  const formatLabels: Record<string, string> = {
    LOAI_TRUC_TIEP: "Loại trực tiếp",
    VONG_TRON: "Vòng tròn",
    VONG_BANG: "Vòng bảng",
    KET_HOP: "Kết hợp",
  };
  return formatLabels[format] || format;
};

export default function CategoryStats({ category }: CategoryStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-l-4 border-l-teal-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lệ phí</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {category.registrationFee || "Miễn phí"}
              </p>
            </div>
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-amber-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Giải thưởng
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {category.firstPrize || "Chưa có"}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hạn đăng ký
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                {new Date(category.registrationDeadline).toLocaleDateString(
                  "vi-VN"
                )}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-purple-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Thể thức
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                {getFormatLabel(category.format)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
