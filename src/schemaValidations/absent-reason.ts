import z from "zod";
const RequestStatusEnum = z.enum(["PENDING", "APPROVED", "REJECTED"]);
export const CreateAbsentReasonBody = z.object({
  idEvent: z.string(),
  reason: z.string(),
});
export type CreateAbsentReasonBodyType = z.infer<typeof CreateAbsentReasonBody>;

export const AbsentReason = z.object({
  id: z.string(),
  reason: z.string(),
  status: RequestStatusEnum,
  createdAt: z.coerce.date(),
  reviewedAt: z.coerce.date(),
});
export type AbsentReasonType = z.infer<typeof AbsentReason>;

export const AbsentReasonRes = z.object({
  status: z.number(),
  message: z.string(),
  data: AbsentReason,
});

export type AbsentReasonResType = z.infer<typeof AbsentReasonRes>;
