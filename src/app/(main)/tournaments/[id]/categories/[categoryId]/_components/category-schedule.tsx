import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

interface CategoryScheduleProps {
  category: any;
}

export default function CategorySchedule({ category }: CategoryScheduleProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Lịch thi đấu
        </h3>
      </CardHeader>
      <CardContent>
        {category.matches && category.matches.length > 0 ? (
          <div className="space-y-4">
            {category.matches.map((match: any) => (
              <div
                key={match.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs">
                    {match.round}
                  </Badge>
                  <Badge
                    className={
                      match.status === "SCHEDULED"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : ""
                    }
                  >
                    {match.status === "SCHEDULED"
                      ? "Sắp diễn ra"
                      : match.status}
                  </Badge>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {match.player1}
                    </span>
                  </div>
                  <div className="text-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                    VS
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {match.player2}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {match.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {match.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {match.court}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            Chưa có lịch thi đấu
          </p>
        )}
      </CardContent>
    </Card>
  );
}
