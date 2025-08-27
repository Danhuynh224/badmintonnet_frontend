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
  logoUrl: z.string().url("Logo phải là một URL hợp lệ").optional(),
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
