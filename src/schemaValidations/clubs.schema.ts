import z from "zod";

const ClubVisibilityEnum = z.enum(["PRIVATE", "PUBLIC"]);

// Schema for the club creation request
export const CreateClubBody = z.object({
  name: z
    .string()
    .min(1, "Tên câu lạc bộ là bắt buộc")
    .max(256, "Tên câu lạc bộ không được vượt quá 256 ký tự"),
  description: z
    .string()
    .max(5000, "Mô tả câu lạc bộ không được vượt quá 5000 ký tự")
    .optional(),
  logoUrl: z.string().optional(),
  location: z
    .string()
    .max(256, "Vị trí câu lạc bộ không được vượt quá 256 ký tự")
    .optional(),
  maxMembers: z
    .number()
    .int()
    .positive("Số thành viên tối đa phải lớn hơn 0")
    .optional(),
  visibility: ClubVisibilityEnum,
  tags: z
    .array(z.string().max(50, "Mỗi tag không được vượt quá 50 ký tự"))
    .max(20, "Không được nhập quá 20 tags")
    .optional(),
});
export type CreateClubBodyType = z.infer<typeof CreateClubBody>;

export const ClubSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  logoUrl: z.string().optional(),
  location: z.string(),
  maxMembers: z.int(),
  visibility: ClubVisibilityEnum,
  tags: z.array(z.string()),
  ownerName: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date(),
});

export const PagedClubResponse = z.object({
  content: z.array(ClubSchema),
  page: z.number(),
  size: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
  last: z.boolean(),
});

export const ClubRes = z.object({
  status: z.number(),
  message: z.string(),
  data: ClubSchema,
});
export type ClubResType = z.TypeOf<typeof ClubRes>;

export const ClubPageRes = z.object({
  status: z.number(),
  message: z.string(),
  data: PagedClubResponse,
});

export type ClubPageResType = z.infer<typeof ClubPageRes>;
