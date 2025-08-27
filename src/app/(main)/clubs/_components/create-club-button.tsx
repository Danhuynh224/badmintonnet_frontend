import Link from "next/link";
import { Plus } from "lucide-react";

export const CreateClubButton = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <Link
      href="/clubs/create"
      className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 dark:from-green-600 dark:to-teal-600 dark:hover:from-green-500 dark:hover:to-teal-500 ${className}`}
    >
      <Plus className="w-5 h-5 mr-2 animate-pulse" />
      Tạo CLB Cầu Lông Của Bạn
    </Link>
  );
};
