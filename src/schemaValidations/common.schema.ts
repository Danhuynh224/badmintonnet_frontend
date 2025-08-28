import z from "zod";

export const MessageRes = z
  .object({
    message: z.string(),
  })
  .strict();

export type MessageResType = z.TypeOf<typeof MessageRes>;

export const FileRes = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    fileName: z.string(),
  }),
});

export type FileResType = z.TypeOf<typeof FileRes>;
