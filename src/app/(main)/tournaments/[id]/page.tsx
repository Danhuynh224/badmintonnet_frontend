import tournamentApiRequest from "@/apiRequest/tournament";
import { cookies } from "next/headers";
import Image from "next/image";
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import {
  getCategoryLabel,
  getTournamentStatusInfo,
} from "@/schemaValidations/tournament.schema";
import { Calendar, MapPin, Users, Info, Trophy } from "lucide-react";
import Link from "next/link";
import ImagePreview from "@/components/image-preview";

interface TournamentDetailPageProps {
  params: Promise<{ id: string }>;
}

// Helper Component cho Nút Đăng Ký
const RegistrationButton = ({
  status,
}: {
  status:
    | "UPCOMING"
    | "REGISTRATION_OPEN"
    | "REGISTRATION_CLOSED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED";
}) => {
  const statusInfo = getTournamentStatusInfo(status);

  if (status === "REGISTRATION_OPEN") {
    return (
      <Link
        href="#" // Cập nhật link đăng ký thực tế ở đây
        className="w-full text-center block mt-4 px-6 py-3 rounded-lg font-semibold text-white bg-teal-600 hover:bg-teal-500 dark:bg-teal-600 dark:hover:bg-teal-500 transition-all duration-300 shadow-lg hover:shadow-teal-500/40"
      >
        Đăng Ký Ngay
      </Link>
    );
  }

  return (
    <button
      disabled
      className="w-full mt-4 px-6 py-3 rounded-lg font-semibold text-white bg-gray-600 dark:bg-gray-600 cursor-not-allowed flex items-center justify-center gap-2"
    >
      {statusInfo.label}
    </button>
  );
};

export default async function TournamentDetail({
  params,
}: TournamentDetailPageProps) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const { id } = await params;

  // Giả sử API call thành công và trả về dữ liệu
  const response = await tournamentApiRequest.getDetailBySlug(
    id,
    accessToken?.value || ""
  );
  const tournament = response.payload.data;
  const statusInfo = getTournamentStatusInfo(tournament.status);

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen">
      {/* === BANNER SECTION === */}
      <div className="relative w-full h-[40vh] md:h-[50vh]">
        {/* Ảnh banner hoặc khung nền */}
        {tournament.bannerUrl ? (
          <ImagePreview
            src={tournament.bannerUrl}
            alt={tournament.name}
            containerClassName="w-full h-full"
            className="rounded-none object-cover"
          />
        ) : (
          <div className="w-full h-full bg-slate-200 dark:bg-slate-800" />
        )}

        {/* Lớp mờ gradient — nằm dưới chữ */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-white/70 dark:via-slate-900/70 to-transparent z-10" /> */}

        {/* Tiêu đề giải đấu — nằm trên lớp mờ */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto z-20">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white drop-shadow-2xl text-center md:text-left">
            {tournament.name}
          </h1>
        </div>
      </div>

      {/* === MAIN CONTENT LAYOUT === */}
      <div className="max-w-7xl mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* === CỘT CHÍNH (BÊN TRÁI) === */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mô tả giải đấu */}
            {tournament.description && (
              <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-300 dark:border-slate-700">
                <h2 className="flex items-center gap-2 text-xl font-bold mb-4 text-teal-600 dark:text-teal-400">
                  <Info size={20} />
                  Giới Thiệu Giải Đấu
                </h2>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {tournament.description}
                </p>
              </div>
            )}

            {/* Các hạng mục thi đấu */}
            {tournament.categories && tournament.categories.length > 0 && (
              <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-300 dark:border-slate-700">
                <h2 className="flex items-center gap-2 text-xl font-bold mb-4 text-teal-600 dark:text-teal-400">
                  <Trophy size={20} />
                  Các Hạng Mục Thi Đấu
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tournament.categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="p-4 bg-slate-200 dark:bg-slate-700/40 rounded-lg border border-slate-300 dark:border-slate-600"
                    >
                      <p className="font-semibold text-lg text-slate-900 dark:text-white">
                        {getCategoryLabel(cat.category)}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-slate-600 dark:text-slate-400">
                        <Users size={14} />
                        <span>
                          Đã đăng ký: {cat.currentParticipantCount} /{" "}
                          {cat.maxParticipants || "Không giới hạn"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* === SIDEBAR (BÊN PHẢI) === */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8 bg-slate-100 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-300 dark:border-slate-700">
              {tournament.logoUrl && (
                <div className="relative w-28 h-28 mx-auto -mt-16 mb-4">
                  <Image
                    src={tournament.logoUrl}
                    alt={`Logo ${tournament.name}`}
                    fill
                    sizes="112px"
                    className="rounded-full object-cover border-4 border-slate-300 dark:border-slate-700 shadow-lg"
                  />
                </div>
              )}

              {/* Trạng thái giải đấu */}

              {/* Nút hành động chính */}
              <RegistrationButton status={tournament.status} />

              {/* Thông tin chi tiết */}
              <ul className="mt-6 space-y-4 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <MapPin
                    size={20}
                    className="mt-1 text-teal-600 dark:text-teal-400 flex-shrink-0"
                  />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Địa điểm
                    </span>
                    <p className="text-sm">
                      {tournament.location || "Chưa có thông tin"}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar
                    size={20}
                    className="mt-1 text-teal-600 dark:text-teal-400 flex-shrink-0"
                  />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Thời gian diễn ra
                    </span>
                    <p className="text-sm">
                      {format(tournament.startDate, "dd/MM/yyyy", {
                        locale: vi,
                      })}{" "}
                      -{" "}
                      {format(tournament.endDate, "dd/MM/yyyy", { locale: vi })}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar
                    size={20}
                    className="mt-1 text-teal-600 dark:text-teal-400 flex-shrink-0"
                  />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Thời gian đăng ký
                    </span>
                    <p className="text-sm">
                      {format(tournament.registrationStartDate, "dd/MM/yyyy", {
                        locale: vi,
                      })}{" "}
                      -{" "}
                      {format(tournament.registrationEndDate, "dd/MM/yyyy", {
                        locale: vi,
                      })}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
