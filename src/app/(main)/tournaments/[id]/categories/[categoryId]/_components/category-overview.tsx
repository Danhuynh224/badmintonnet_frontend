import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CategoryDetail } from "@/schemaValidations/tournament.schema";
import { Trophy } from "lucide-react";

interface CategoryOverviewProps {
  category: CategoryDetail;
}

export default function CategoryOverview({ category }: CategoryOverviewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Mô tả hạng mục
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {category.description || "Chưa có mô tả cho hạng mục này."}
          </p>
        </CardContent>
      </Card>

      {category.rules && category.rules.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Thể lệ thi đấu
            </h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {category.rules.map((rule: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                >
                  <span className="w-6 h-6 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {category.firstPrize && (
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Cơ cấu giải thưởng
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {category.firstPrize && (
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 rounded-lg border-2 border-amber-300 dark:border-amber-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold text-amber-900 dark:text-amber-300">
                      Giải nhất
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                    {category.firstPrize}
                  </p>
                </div>
              )}
              {category.secondPrize && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border-2 border-gray-300 dark:border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-gray-600" />
                    <span className="font-semibold text-gray-900 dark:text-gray-300">
                      Giải nhì
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-700 dark:text-gray-400">
                    {category.secondPrize}
                  </p>
                </div>
              )}
              {category.thirdPrize && (
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg border-2 border-orange-300 dark:border-orange-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-orange-600" />
                    <span className="font-semibold text-orange-900 dark:text-orange-300">
                      Giải ba
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                    {category.thirdPrize}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
