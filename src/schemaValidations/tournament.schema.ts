import { z } from "zod";

// Enum giống backend (nên đồng bộ với BadmintonCategoryEnum)
export const BadmintonCategoryEnum = z.enum([
  "MEN_SINGLE",
  "WOMEN_SINGLE",
  "MEN_DOUBLE",
  "WOMEN_DOUBLE",
  "MIXED_DOUBLE",
]);
export type BadmintonCategory = z.infer<typeof BadmintonCategoryEnum>;
// Enum trạng thái giải đấu (giống backend TournamentStatus)
export const TournamentStatusEnum = z.enum([
  "UPCOMING",
  "REGISTRATION_OPEN",
  "REGISTRATION_CLOSED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
]);
export function getTournamentStatusInfo(status: TournamentStatusEnum) {
  switch (status) {
    case "UPCOMING":
      return {
        label: "Sắp diễn ra",
        color: "text-yellow-500 dark:text-yellow-400",
      };
    case "REGISTRATION_OPEN":
      return {
        label: "Đang mở đăng ký",
        color: "text-green-500 dark:text-green-400",
      };
    case "REGISTRATION_CLOSED":
      return {
        label: "Đã đóng đăng ký",
        color: "text-orange-500 dark:text-orange-400",
      };
    case "IN_PROGRESS":
      return { label: "Đang diễn ra", color: "text-sky-500 dark:text-sky-400" };
    case "COMPLETED":
      return { label: "Hoàn thành", color: "text-gray-500 dark:text-gray-400" };
    case "CANCELLED":
      return { label: "Đã hủy", color: "text-red-500 dark:text-red-400" };
    default:
      return {
        label: "Không xác định",
        color: "text-gray-500 dark:text-gray-400 ",
      };
  }
}
export type TournamentStatusEnum = z.infer<typeof TournamentStatusEnum>;
// Schema cho từng hạng mục thi đấu (TournamentCategoryRequest)
export const TournamentCategoryRequest = z.object({
  categoryType: BadmintonCategoryEnum,
  minLevel: z
    .number()
    .min(0, "Trình độ tối thiểu phải >= 0")
    .max(5, "Trình độ tối thiểu không được vượt quá 5"),
  maxLevel: z
    .number()
    .min(0, "Trình độ tối đa phải >= 0")
    .max(5, "Trình độ tối đa không được vượt quá 5"),
  maxParticipants: z
    .number()
    .int()
    .positive("Số lượng người tham gia phải là số dương"),
});
export type TournamentCategoryRequest = z.infer<
  typeof TournamentCategoryRequest
>;

// Schema cho TournamentCreateRequest
export const TournamentCreateRequest = z.object({
  name: z
    .string()
    .min(1, "Tên giải đấu là bắt buộc")
    .max(255, "Tên giải đấu không được quá 255 ký tự"),
  description: z
    .string()
    .max(2000, "Mô tả không được vượt quá 2000 ký tự")
    .optional(),
  location: z.string().max(255, "Địa điểm không được quá 255 ký tự").optional(),
  bannerUrl: z.string().optional(),
  logoUrl: z.string().optional(),

  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Ngày bắt đầu không hợp lệ",
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Ngày kết thúc không hợp lệ",
  }),
  registrationStartDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Ngày bắt đầu đăng ký không hợp lệ",
  }),
  registrationEndDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Ngày kết thúc đăng ký không hợp lệ",
  }),

  // Danh sách category (phải có ít nhất 1)
  categories: z
    .array(TournamentCategoryRequest)
    .min(1, "Giải đấu phải có ít nhất một hạng mục thi đấu"),
});

export type TournamentCreateRequest = z.infer<typeof TournamentCreateRequest>;

export const TournamentCategoryResponse = z.object({
  id: z.string(),
  category: BadmintonCategoryEnum,
  maxParticipants: z.number().nullable().optional(),
  currentParticipantCount: z.number(),
});

export type TournamentCategoryResponse = z.infer<
  typeof TournamentCategoryResponse
>;
export const TournamentResponse = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  slug: z.string().nullable().optional(),

  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  registrationStartDate: z.coerce.date(),
  registrationEndDate: z.coerce.date(),

  logoUrl: z.string().nullable().optional(),
  bannerUrl: z.string().nullable().optional(),

  createdAt: z.coerce.date(),

  status: TournamentStatusEnum,
  createdBy: z.string().nullable().optional(),

  categories: z.array(TournamentCategoryResponse).optional(),
});

export type TournamentResponse = z.infer<typeof TournamentResponse>;

export const PagedTournamentResponse = z.object({
  status: z.number(),
  message: z.string(),
  data: z.object({
    content: z.array(TournamentResponse),
    page: z.number(),
    size: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
    last: z.boolean(),
  }),
});
export type PagedTournamentResponse = z.infer<typeof PagedTournamentResponse>;
