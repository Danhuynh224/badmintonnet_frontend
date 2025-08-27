import CreateClubForm from "@/app/(main)/clubs/_components/create-club-form";

export default function CreateClubPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-6 py-12">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 -left-20 w-72 h-72 bg-green-400/25 dark:bg-green-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-16 -right-20 w-80 h-80 bg-blue-400/25 dark:bg-blue-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-gradient-to-r from-green-100 to-blue-100 text-green-700 dark:from-green-900/40 dark:to-blue-900/40 dark:text-green-300">
            Tạo cộng đồng riêng của bạn
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Tạo Câu Lạc Bộ Mới
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Hãy bắt đầu xây dựng câu lạc bộ cầu lông của bạn. Kết nối thành
            viên, tổ chức sự kiện và phát triển cộng đồng ngay hôm nay.
          </p>
        </div>

        {/* Form wrapper */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-12">
          <CreateClubForm />
        </div>
      </div>
    </main>
  );
}
