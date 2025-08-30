import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Users, Clock, DollarSign, Badge } from "lucide-react";
import { Badge as BadgeComponent } from "@/components/ui/badge";

interface EventClubCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    image: string;
    location: string;
    date: string;
    startTime: string;
    endTime: string;
    totalMember: number;
    categories: string[];
    status: string;
    clubId: string;
    fee: number;
    deadline: string;
    openForOutside: boolean;
    maxClubMembers: number;
    maxOutsideMembers: number;
    createdAt: string;
    createdBy: string;
  };
}

export const EventClubCard = ({ event }: EventClubCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCategoryLabel = (category: string) => {
    const categoryLabels: { [key: string]: string } = {
      MEN_SINGLE: "Đơn nam",
      WOMEN_SINGLE: "Đơn nữ",
      MEN_DOUBLE: "Đôi nam",
      WOMEN_DOUBLE: "Đôi nữ",
      MIXED_DOUBLE: "Đôi nam nữ",
    };
    return categoryLabels[category] || category;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      UPCOMING: { label: "Sắp diễn ra", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
      ONGOING: { label: "Đang diễn ra", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
      COMPLETED: { label: "Đã kết thúc", color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" },
      CANCELLED: { label: "Đã hủy", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return null;

    return (
      <BadgeComponent className={`${config.color} border-0`}>
        {config.label}
      </BadgeComponent>
    );
  };

  return (
    <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300">
      <div className="flex items-start gap-6">
        {/* Hình ảnh */}
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-100 dark:border-gray-700 group-hover:border-emerald-200 dark:group-hover:border-emerald-700 transition-colors">
            <Image
              src={event.image || "/default-event.jpg"}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Nội dung */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                {event.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Tạo bởi: {event.createdBy}
              </p>
            </div>
            <div className="flex-shrink-0 ml-4">
              {getStatusBadge(event.status)}
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>

          {/* Thông tin chi tiết */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>{event.location}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>{formatDate(event.date)}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4 text-purple-500" />
              <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Users className="w-4 h-4 text-orange-500" />
              <span>{event.totalMember} người tham gia</span>
            </div>
            
            {event.fee > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span>{event.fee.toLocaleString("vi-VN")} VNĐ</span>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Badge className="w-4 h-4 text-red-500" />
              <span>Hạn đăng ký: {formatDate(event.deadline)}</span>
            </div>
          </div>

          {/* Loại hình cầu lông */}
          <div className="flex flex-wrap gap-2 mb-4">
            {event.categories.map((category, index) => (
              <BadgeComponent
                key={index}
                variant="secondary"
                className="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
              >
                {getCategoryLabel(category)}
              </BadgeComponent>
            ))}
          </div>

          {/* Thông tin thành viên */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              CLB: {event.maxClubMembers} người
            </span>
            {event.openForOutside && (
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                Ngoài: {event.maxOutsideMembers} người
              </span>
            )}
            {!event.openForOutside && (
              <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                🔒 Chỉ thành viên CLB
              </span>
            )}
          </div>

          {/* Thông tin tạo */}
          <div className="text-xs text-gray-400 dark:text-gray-500">
            Tạo lúc: {new Date(event.createdAt).toLocaleString("vi-VN")}
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex-shrink-0">
          <Link
            href={`/my-clubs/events/${event.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg group/btn"
          >
            Chi tiết
            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
