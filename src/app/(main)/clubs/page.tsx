import Image from "next/image";
import { MapPin, Users, Plus } from "lucide-react";
import { CreateClubButton } from "@/app/(main)/clubs/_components/create-club-button";
import { JoinClubButton } from "@/app/(main)/clubs/_components/join-club-button";

interface Club {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  location: string;
  members: number;
  tags: string[];
}

// Mock data cho các câu lạc bộ cầu lông
const mockClubs: Club[] = [
  {
    id: "1",
    name: "Câu Lạc Bộ Cầu Lông Sài Gòn",
    description:
      "CLB cầu lông hàng đầu tại TP.HCM với đội ngũ HLV chuyên nghiệp và sân tập hiện đại. Chúng tôi chào đón mọi trình độ từ người mới bắt đầu đến vận động viên chuyên nghiệp.",
    logoUrl:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=100&h=100&fit=crop&crop=face",
    location: "Quận 1, TP.HCM",
    members: 145,
    tags: ["Chuyên nghiệp", "Sân đẹp", "HLV giỏi"],
  },
  {
    id: "2",
    name: "Hanoi Badminton Club",
    description:
      "Nơi hội tụ những người yêu thích cầu lông tại thủ đô. Tổ chức giải đấu định kỳ và có chương trình đào tạo từ cơ bản đến nâng cao.",
    logoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    location: "Hoàn Kiếm, Hà Nội",
    members: 98,
    tags: ["Giải đấu", "Đào tạo", "Thân thiện"],
  },
  {
    id: "3",
    name: "Đà Nẵng Shuttlecock",
    description:
      "CLB cầu lông năng động tại miền Trung với không khí tập luyện sôi động và nhiều hoạt động giao lưu thể thao.",
    logoUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    location: "Hải Châu, Đà Nẵng",
    members: 76,
    tags: ["Năng động", "Giao lưu", "Miền Trung"],
  },
  {
    id: "4",
    name: "Victory Badminton Team",
    description:
      "Đội cầu lông chiến thắng với tinh thần thể thao cao và môi trường tập luyện tích cực. Chú trọng phát triển kỹ thuật và thể lực.",
    logoUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    location: "Quận 7, TP.HCM",
    members: 67,
    tags: ["Chiến thắng", "Kỹ thuật", "Thể lực"],
  },
  {
    id: "5",
    name: "Phoenix Badminton Club",
    description:
      'CLB cầu lông Phoenix với slogan "Vượt lên chính mình". Tập trung vào việc nâng cao trình độ và xây dựng tinh thần đồng đội.',
    logoUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face",
    location: "Thủ Đức, TP.HCM",
    members: 89,
    tags: ["Phoenix", "Đồng đội", "Nâng cao"],
  },
  {
    id: "6",
    name: "Cần Thơ Badminton Academy",
    description:
      "Học viện cầu lông Cần Thơ - nơi đào tạo vận động viên trẻ và phát triển phong trào cầu lông tại ĐBSCL.",
    logoUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
    location: "Ninh Kiều, Cần Thơ",
    members: 124,
    tags: ["Học viện", "Trẻ em", "ĐBSCL"],
  },
];

// Client Components for interactive elements

const ClubList = async () => {
  // Trong thực tế, bạn có thể fetch data từ API ở đây
  // const clubs = await fetchClubs();
  const clubs = mockClubs;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Câu Lạc Bộ Cầu Lông
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Tìm kiếm và tham gia các câu lạc bộ cầu lông phù hợp với bạn
          </p>

          {/* Create Club Button */}
          <CreateClubButton />
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clubs.map((club) => (
            <div
              key={club.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Card Header with Logo */}
              <div className="relative p-6 pb-4">
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-lg">
                    <Image
                      src={club.logoUrl}
                      alt={`${club.name} logo`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      priority={false}
                    />
                  </div>
                </div>

                {/* Club Name */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 pr-16">
                  {club.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                  {club.description}
                </p>

                {/* Location */}
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                  {club.location}
                </div>

                {/* Members Count */}
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                  <Users className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                  {club.members} thành viên
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {club.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        index % 2 === 0
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer with Join Button */}
              <div className="px-6 pb-6">
                <JoinClubButton clubId={club.id} clubName={club.name} />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no clubs) */}
        {clubs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Users className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Chưa có câu lạc bộ nào
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Hãy là người đầu tiên tạo một câu lạc bộ cầu lông!
            </p>
            <CreateClubButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubList;
