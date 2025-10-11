"use client";

import {
  Calendar,
  DollarSign,
  Trophy,
  Clock,
  MapPin,
  Tag,
  Users,
  ClipboardList,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  getCategoryLabel,
  TournamentDetail,
} from "@/schemaValidations/tournament.schema";

export default function OverviewSection({
  tournament,
}: {
  tournament: TournamentDetail;
}) {
  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mt-6 shadow-sm">
      {/* --- Header --- */}
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-green-600 dark:text-green-400" />
          Giới thiệu giải đấu
        </h2>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* --- Description --- */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {tournament.description || "Chưa có mô tả cho giải đấu này."}
        </p>

        {/* --- Thông tin chi tiết --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-200">
          <InfoItem
            icon={
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
            }
            label="Lệ phí"
            value={
              tournament.fee
                ? tournament.fee.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                : "Miễn phí"
            }
          />

          <InfoItem
            icon={
              <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            }
            label="Địa điểm"
            value={tournament.location || "Chưa cập nhật"}
          />

          <InfoItem
            icon={
              <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
            }
            label="Đăng ký"
            value={`${format(tournament.registrationStartDate, "dd/MM/yyyy", {
              locale: vi,
            })} - ${format(tournament.registrationEndDate, "dd/MM/yyyy", {
              locale: vi,
            })}`}
          />

          <InfoItem
            icon={
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            }
            label="Thi đấu"
            value={`${format(tournament.startDate, "dd/MM/yyyy", {
              locale: vi,
            })} - ${format(tournament.endDate, "dd/MM/yyyy", { locale: vi })}`}
          />
        </div>

        {/* --- Hạng mục thi đấu --- */}
        {tournament.categories && tournament.categories.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Tag className="h-5 w-5 text-green-600 dark:text-green-400" />
              Các hạng mục thi đấu
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tournament.categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20 hover:shadow transition-all"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {getCategoryLabel(category.category)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Cấp độ: {category.minLevel} - {category.maxLevel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- Rules (đặt cuối) --- */}
        {tournament.rules && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Điều lệ giải đấu
            </h3>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-700">
              <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                {tournament.rules}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* --- Component phụ gọn hơn cho phần thông tin --- */
function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-700">
      {/* Cố định icon, không bị co */}
      <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 mt-0.5">
        {icon}
      </div>

      {/* Text linh hoạt, có thể xuống dòng */}
      <div className="flex-1 text-sm text-gray-700 dark:text-gray-300">
        <strong>{label}:</strong> <span className="break-words">{value}</span>
      </div>
    </div>
  );
}
