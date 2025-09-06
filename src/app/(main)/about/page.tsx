import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white">
        {/* lớp overlay để làm nền dịu hơn */}
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Chào mừng đến với{" "}
              <span className="text-yellow-300">BadmintonNet</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Kết nối cộng đồng cầu lông Việt Nam – Tạo CLB, tham gia hoạt động,
              chinh phục giải đấu và xây dựng thành tích của riêng bạn
            </p>
            {/* thanh gạch trang trí */}
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-white/50 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section */}
        <section className="py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-8">
                Câu Chuyện Khởi Đầu
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mb-8"></div>
              <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  Xuất phát từ tình yêu dành cho môn cầu lông, chúng tôi nhận ra
                  rằng việc tìm kiếm đối thủ phù hợp, tham gia các câu lạc bộ
                  chất lượng và theo dõi tiến bộ cá nhân đang là những thách
                  thức lớn đối với cộng đồng người chơi cầu lông tại Việt Nam.
                </p>
                <p>
                  Với kinh nghiệm nhiều năm trong lĩnh vực thể thao và công
                  nghệ, đội ngũ của chúng tôi đã quyết định xây dựng một nền
                  tảng toàn diện, nơi mọi người từ người mới bắt đầu đến các vận
                  động viên chuyên nghiệp đều có thể tìm thấy không gian phù hợp
                  để phát triển đam mê của mình.
                </p>
                <p>
                  Chúng tôi tin rằng cầu lông không chỉ là một môn thể thao, mà
                  còn là cầu nối gắn kết mọi người, giúp xây dựng những mối quan
                  hệ bền vững và tạo ra những kỷ niệm đáng nhớ trong cuộc sống.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-slate-700 dark:to-slate-600 rounded-3xl overflow-hidden">
                <Image
                  src="/aboutUs/about1.png" // thay bằng đường dẫn ảnh của bạn
                  alt="Câu chuyện thành lập"
                  fill
                  className="object-cover rounded-3xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              Sứ Mệnh & Tầm Nhìn
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="group">
              <div className="h-full bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:scale-105">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">
                    Sứ Mệnh
                  </h3>
                </div>
                <div className="space-y-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    Kết nối những người yêu thích cầu lông từ mọi trình độ, tạo
                    ra một cộng đồng năng động nơi mọi người có thể học hỏi, thi
                    đấu và phát triển kỹ năng trong môi trường thân thiện và
                    chuyên nghiệp.
                  </p>
                  <p>
                    Chúng tôi cam kết xây dựng một hệ sinh thái hoàn chỉnh, từ
                    việc tìm kiếm đối thủ phù hợp, tham gia các hoạt động câu
                    lạc bộ đến việc theo dõi và ghi nhận thành tích cá nhân một
                    cách công bằng và minh bạch.
                  </p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="h-full bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:scale-105">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                    Tầm Nhìn
                  </h3>
                </div>
                <div className="space-y-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    Trở thành nền tảng hàng đầu Việt Nam cho cộng đồng cầu lông,
                    nơi mọi người từ nghiệp dư đến chuyên nghiệp đều tìm được
                    niềm vui, bạn đồng hành và cơ hội phát triển bản thân.
                  </p>
                  <p>
                    Trong tương lai, chúng tôi hướng đến việc mở rộng ra khu vực
                    Đông Nam Á, góp phần nâng cao chất lượng và sự phổ biến của
                    môn cầu lông trong toàn khu vực.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              Giá Trị Cốt Lõi
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-700 hover:-translate-y-2">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">
                    Cộng Đồng
                  </h3>
                  <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>
                      Xây dựng môi trường gắn kết, nơi mọi người cùng chia sẻ
                      đam mê và hỗ trợ lẫn nhau phát triển. Chúng tôi tin rằng
                      sức mạnh của cộng đồng sẽ giúp mỗi cá nhân đạt được những
                      thành tựu vượt xa mong đợi.
                    </p>
                    <p>
                      Khuyến khích văn hóa tương trợ, chia sẻ kinh nghiệm và học
                      hỏi lẫn nhau giữa các thành viên từ những người mới bắt
                      đầu đến những vận động viên kỳ cựu.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-700 hover:-translate-y-2">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                    Công Bằng
                  </h3>
                  <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>
                      Đảm bảo cơ hội bình đẳng cho tất cả thành viên, từ người
                      mới bắt đầu đến vận động viên chuyên nghiệp. Hệ thống phân
                      loại trình độ minh bạch giúp mọi người tìm được đối thủ và
                      môi trường thi đấu phù hợp.
                    </p>
                    <p>
                      Áp dụng các tiêu chuẩn đánh giá khách quan và công khai
                      trong tất cả các hoạt động, từ việc xếp hạng thành viên
                      đến tổ chức các giải đấu.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-700 hover:-translate-y-2">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-6">
                    Phát Triển Cá Nhân
                  </h3>
                  <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>
                      Khuyến khích và hỗ trợ mỗi thành viên không ngừng cải
                      thiện kỹ năng và đạt được mục tiêu cá nhân. Cung cấp các
                      công cụ theo dõi tiến bộ và phân tích chi tiết để giúp
                      người chơi hiểu rõ điểm mạnh, điểm yếu của mình.
                    </p>
                    <p>
                      Tạo ra những cơ hội thử thách phù hợp với trình độ, giúp
                      mọi người vượt qua giới hạn và khám phá tiềm năng chưa
                      được khai phá.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              Tính Năng Nổi Bật
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto"></div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 shadow-2xl border border-slate-100 dark:border-slate-700">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">
                  Quản Lý Câu Lạc Bộ
                </h3>
                <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    Hệ thống quản lý câu lạc bộ toàn diện cho phép người dùng dễ
                    dàng thành lập và điều hành CLB riêng. Từ việc tuyển thành
                    viên, lên lịch tập luyện, đến quản lý tài chính và tổ chức
                    các sự kiện nội bộ.
                  </p>
                  <p>
                    Các công cụ báo cáo chi tiết giúp ban quản lý theo dõi hoạt
                    động của CLB, đánh giá hiệu quả các chương trình và đưa ra
                    những quyết định phù hợp để phát triển câu lạc bộ.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[16/9] bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-slate-700 dark:to-slate-600 rounded-3xl overflow-hidden">
                  <Image
                    src="/aboutUs/about2.png"
                    alt="Badminton-Net Trang web kết nối cộng đồng cầu lông"
                    fill
                    className="object-cover rounded-3xl"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-12">
              <div className="relative order-2 md:order-1">
                <div className="aspect-[16/9] bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-slate-700 dark:to-slate-600 rounded-3xl overflow-hidden">
                  <Image
                    src="/aboutUs/about3.png"
                    alt="Badminton-Net Trang web kết nối cộng đồng cầu lông"
                    fill
                    className="object-cover rounded-3xl"
                  />
                </div>
              </div>

              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                  Hệ Thống Giải Đấu
                </h3>
                <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    Nền tảng tổ chức giải đấu chuyên nghiệp với nhiều format
                    khác nhau từ giải đấu loại trực tiếp, round-robin đến các
                    giải đấu theo hệ thống Swiss. Hỗ trợ đầy đủ các hạng mục đơn
                    nam, đơn nữ, đôi nam, đôi nữ và đôi nam nữ.
                  </p>
                  <p>
                    Tích hợp hệ thống streaming trực tiếp, ghi nhận kết quả
                    real-time và tự động cập nhật bảng xếp hạng. Người xem có
                    thể theo dõi các trận đấu quan trọng và tương tác với cộng
                    đồng qua tính năng chat trực tiếp.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-6">
                  Theo Dõi Thành Tích
                </h3>
                <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    Hệ thống phân tích thành tích cá nhân chi tiết với các biểu
                    đồ trực quan, giúp người chơi theo dõi tiến bộ theo thời
                    gian. Bao gồm các chỉ số như tỷ lệ thắng/thua, điểm ranking,
                    phong độ gần đây và so sánh với các đối thủ cùng trình độ.
                  </p>
                  <p>
                    Tính năng AI phân tích lối chơi giúp đưa ra những gợi ý cải
                    thiện kỹ thuật cá nhân, dựa trên dữ liệu từ các trận đấu đã
                    thi đấu và xu hướng của các vận động viên top đầu.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[16/9] bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-slate-700 dark:to-slate-600 rounded-3xl overflow-hidden">
                  <Image
                    src="/aboutUs/about4.png"
                    alt="Badminton-Net Trang web kết nối cộng đồng cầu lông"
                    fill
                    className="object-cover rounded-3xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              Đội Ngũ Của Chúng Tôi
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
                Cam Kết & Tầm Nhìn
              </h3>
              <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  Đội ngũ phát triển của chúng tôi bao gồm những chuyên gia có
                  kinh nghiệm lâu năm trong lĩnh vực công nghệ thông tin và
                  những người yêu thích cầu lông từ nhiều năm. Chúng tôi hiểu
                  sâu sắc nhu cầu của cộng đồng và không ngừng nỗ lực để mang
                  đến những giải pháp tốt nhất.
                </p>
                <p>
                  Với triết lý Người dùng là trung tâm, mọi quyết định phát
                  triển sản phẩm đều dựa trên phản hồi thực tế từ cộng đồng.
                  Chúng tôi cam kết lắng nghe, học hỏi và cải thiện không ngừng
                  để xứng đáng với niềm tin mà người dùng đã dành cho chúng tôi.
                </p>
                <p>
                  Bên cạnh việc phát triển công nghệ, chúng tôi cũng tích cực
                  tham gia vào các hoạt động của cộng đồng cầu lông, từ việc tài
                  trợ các giải đấu địa phương đến tổ chức các chương trình đào
                  tạo kỹ năng cho người mới bắt đầu.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-slate-700 dark:to-slate-600 rounded-3xl overflow-hidden">
                <Image
                  src="/aboutUs/about5.png" // thay bằng đường dẫn ảnh của bạn
                  alt="Câu chuyện thành lập"
                  fill
                  className="object-cover rounded-3xl"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-12 border border-emerald-100 dark:border-slate-600">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white text-center mb-8">
              Những Cam Kết Cốt Lõi
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h4 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">
                  Đổi Mới Liên Tục
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Cập nhật và phát triển tính năng mới thường xuyên dựa trên xu
                  hướng công nghệ và nhu cầu thực tế của người dùng.
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  Hỗ Trợ Tận Tình
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Đội ngũ customer support chuyên nghiệp sẵn sàng hỗ trợ 24/7,
                  đảm bảo mọi thắc mắc được giải đáp nhanh chóng và hiệu quả.
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                  Bảo Mật Tuyệt Đối
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Áp dụng các tiêu chuẩn bảo mật cao nhất trong ngành, đảm bảo
                  thông tin cá nhân và dữ liệu người dùng được bảo vệ an toàn.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
