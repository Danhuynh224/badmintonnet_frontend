import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Calendar, Users, Share2, Download } from "lucide-react";
import {
  CategoryDetail,
  getCategoryLabel,
} from "@/schemaValidations/tournament.schema";
import JoinCategoryButton from "../../../_components/join-category-button";
import { toast } from "sonner";

interface CategoryHeaderProps {
  category: CategoryDetail;
  categoryId: string;
}

export default function CategoryHeader({
  category,
  categoryId,
}: CategoryHeaderProps) {
  const filledPercent =
    (category.currentParticipantCount / category.maxParticipants) * 100;
  const spotsLeft = category.maxParticipants - category.currentParticipantCount;
  const isFull = category.currentParticipantCount >= category.maxParticipants;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Đã sao chép link!");
  };

  return (
    <Card className="bg-gradient-to-br from-teal-500 to-blue-600 text-white border-0 shadow-xl">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-8 h-8" />
              <h1 className="text-3xl sm:text-4xl font-bold">
                {getCategoryLabel(category.category)}
              </h1>
            </div>
            <p className="text-teal-50 text-lg mb-4">
              {category.tournamentName}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(category.startDate).toLocaleDateString("vi-VN")} -{" "}
                  {new Date(category.endDate).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>
                  {category.currentParticipantCount}/{category.maxParticipants}{" "}
                  người chơi
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <JoinCategoryButton
              categoryId={categoryId}
              isDisabled={isFull}
              className="bg-white text-teal-600 hover:bg-teal-50"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-teal-50">Tiến độ đăng ký</span>
            <span className="font-semibold">{spotsLeft} chỗ còn trống</span>
          </div>
          <Progress value={filledPercent} className="h-3 bg-white/20" />
        </div>
      </CardContent>
    </Card>
  );
}
