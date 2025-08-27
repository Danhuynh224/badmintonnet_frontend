import {
  Calendar,
  MapPin,
  Users,
  Lock,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
interface Event {
  id: number;
  title: string;
  club: string;
  type: string;
  date: string;
  location: string;
  participants: number;
  maxParticipants: number;
  isPublic: boolean;
  imageUrl: string;
}

const ClubEvents = () => {
  const events: Event[] = [
    {
      id: 1,
      title: "Giải Cầu lông mùa xuân 2025",
      club: "CLB Cầu lông Thanh Xuân",
      type: "Đơn nam",
      date: "2025-09-15 09:00",
      location: "Sân cầu lông Hà Nội",
      participants: 24,
      maxParticipants: 32,
      isPublic: true,
      imageUrl:
        "https://images.unsplash.com/photo-1611250188496-e966746f6bc7?w=400&h=200&fit=crop",
    },
    {
      id: 2,
      title: "Giải Tennis nữ nghiệp dư",
      club: "Tennis Club Saigon",
      type: "Đôi nữ",
      date: "2025-09-20 14:00",
      location: "Sân tennis Landmark 81",
      participants: 16,
      maxParticipants: 20,
      isPublic: false,
      imageUrl:
        "https://images.unsplash.com/photo-1544717684-20a7a0b36c77?w=400&h=200&fit=crop",
    },
    {
      id: 3,
      title: "Giao hữu Bóng bàn cuối tuần",
      club: "CLB Bóng bàn Việt Nam",
      type: "Đôi nam nữ",
      date: "2025-09-18 10:30",
      location: "Nhà thi đấu Phan Đình Phùng",
      participants: 30,
      maxParticipants: 30,
      isPublic: true,
      imageUrl:
        "https://images.unsplash.com/photo-1609710461115-46c0a5d7b45a?w=400&h=200&fit=crop",
    },
    {
      id: 4,
      title: "Giải Pickleball mở rộng",
      club: "Pickleball Hanoi",
      type: "Vãng lai",
      date: "2025-09-25 08:00",
      location: "Sân thể thao Mỹ Đình",
      participants: 45,
      maxParticipants: 64,
      isPublic: true,
      imageUrl:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=200&fit=crop",
    },
    {
      id: 5,
      title: "Tập luyện Cầu lông nội bộ",
      club: "CLB Cầu lông Thanh Xuân",
      type: "Đơn nữ",
      date: "2025-09-12 19:00",
      location: "Sân cầu lông Hà Nội",
      participants: 8,
      maxParticipants: 16,
      isPublic: false,
      imageUrl:
        "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=200&fit=crop",
    },
    {
      id: 6,
      title: "Giải Squash phong trào",
      club: "Squash Elite Club",
      type: "Đôi nam",
      date: "2025-09-28 16:00",
      location: "Squash Center TPHCM",
      participants: 12,
      maxParticipants: 24,
      isPublic: true,
      imageUrl:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop",
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) +
      " - " +
      date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Đơn nam":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Đơn nữ":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300";
      case "Đôi nam":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300";
      case "Đôi nữ":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Đôi nam nữ":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Vãng lai":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Sự kiện Câu lạc bộ
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Khám phá và tham gia các sự kiện thể thao hấp dẫn
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => {
          const isFull = event.participants >= event.maxParticipants;

          return (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col"
            >
              {/* Header Image */}
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-green-500 overflow-hidden">
                <Image
                  src={event.imageUrl || "/fallback.jpg"}
                  alt={event.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="hidden absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                  <ImageIcon className="w-16 h-16 text-white opacity-50" />
                </div>

                {/* Public/Private Badge */}
                <div className="absolute top-3 right-3">
                  {event.isPublic ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                      Public
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white">
                      <Lock className="w-3 h-3" />
                      Private
                    </span>
                  )}
                </div>

                {/* Type Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                      event.type
                    )}`}
                  >
                    {event.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {event.club}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      {formatDate(event.date)}
                    </div>

                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4 mr-2 text-green-500" />
                      <span className="truncate">{event.location}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Users className="w-4 h-4 mr-2 text-purple-500" />
                      <span
                        className={`${
                          isFull ? "text-red-500 font-medium" : ""
                        }`}
                      >
                        {event.participants}/{event.maxParticipants} người
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  disabled={isFull}
                  className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                    isFull
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                      : "bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 hover:shadow-lg transform hover:scale-105 active:scale-95"
                  }`}
                >
                  {isFull ? "Đã đầy" : "Đăng ký"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Tổng cộng {events.length} sự kiện đang diễn ra
        </p>
      </div>
    </div>
  );
};

export default ClubEvents;
