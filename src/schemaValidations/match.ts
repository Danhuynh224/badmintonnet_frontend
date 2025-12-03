import { z } from "zod";

export const MatchStatus = z.enum([
  "NOT_STARTED",
  "IN_PROGRESS",
  "FINISHED",
  "CANCELLED",
]);

export type MatchStatus = z.infer<typeof MatchStatus>;

export const TournamentMatchSchema = z.object({
  matchId: z.string(),
  round: z.number(),
  matchIndex: z.number(),
  player1Id: z.string().nullable(),
  player2Id: z.string().nullable(),
  player1Name: z.string().nullable(),
  player2Name: z.string().nullable(),
  setScoreP1: z.array(z.number()).nullable(),
  setScoreP2: z.array(z.number()).nullable(),
  scoreP2: z.number().nullable(),
  winnerId: z.string().nullable(),
  winnerName: z.string().nullable(),
  status: MatchStatus,
});

export type TournamentMatchSchemaType = z.infer<typeof TournamentMatchSchema>;

export const GenerateBracketResponse = z.object({
  status: z.number(),
  message: z.string(),
  data: z.array(TournamentMatchSchema),
});

export type GenerateBracketResponseType = z.infer<
  typeof GenerateBracketResponse
>;

export const SetScoreSchema = z.object({
  p1: z.number().nullable(),
  p2: z.number().nullable(),
});

export const UpdateMatchResultBody = z.object({
  sets: z.array(SetScoreSchema),
});

export type UpdateMatchResultBodyType = z.infer<typeof UpdateMatchResultBody>;

export const BracketRoundSchema = z.object({
  round: z.number(),
  matches: z.array(TournamentMatchSchema),
});

export type BracketRoundSchemaType = z.infer<typeof BracketRoundSchema>;

export const BracketTreeSchema = z.object({
  categoryId: z.string(),
  categoryName: z.string(),
  totalRounds: z.number(),
  rounds: z.array(BracketRoundSchema),
});

export type BracketTreeSchemaType = z.infer<typeof BracketTreeSchema>;

export const BracketTreeResponse = z.object({
  status: z.number(),
  message: z.string(),
  data: BracketTreeSchema,
});

export type BracketTreeResponseType = z.infer<typeof BracketTreeResponse>;
