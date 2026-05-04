import { z } from "zod";
import { TournamentStatusEnum } from "./tournament.schema";

export const ClubResultPodiumItem = z.object({
  ranking: z.number(),
  prize: z.string().nullable().optional(),
  participantId: z.string(),
  clubId: z.string().nullable().optional(),
  clubName: z.string(),
  clubLogoUrl: z.string().nullable().optional(),
  representativeName: z.string().nullable().optional(),
  representativeAvatarUrl: z.string().nullable().optional(),
});
export type ClubResultPodiumItemType = z.infer<typeof ClubResultPodiumItem>;

export const ClubResultMatchParticipant = z.object({
  participantId: z.string(),
  clubId: z.string().nullable().optional(),
  clubName: z.string(),
  clubLogoUrl: z.string().nullable().optional(),
  memberId: z.string().nullable().optional(),
  memberName: z.string().nullable().optional(),
  memberAvatarUrl: z.string().nullable().optional(),
});
export type ClubResultMatchParticipantType = z.infer<
  typeof ClubResultMatchParticipant
>;

export const ClubResultMatchSummary = z.object({
  matchId: z.string(),
  label: z.string(),
  round: z.number(),
  matchIndex: z.number(),
  player1: ClubResultMatchParticipant.nullable().optional(),
  player2: ClubResultMatchParticipant.nullable().optional(),
  setScoreP1: z.array(z.number()).nullable().optional(),
  setScoreP2: z.array(z.number()).nullable().optional(),
  winnerId: z.string().nullable().optional(),
  winnerName: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
});
export type ClubResultMatchSummaryType = z.infer<typeof ClubResultMatchSummary>;

export const ClubResultClubStat = z.object({
  participantId: z.string(),
  clubId: z.string().nullable().optional(),
  clubName: z.string(),
  clubLogoUrl: z.string().nullable().optional(),
  played: z.number(),
  wins: z.number(),
  losses: z.number(),
  setsWon: z.number(),
  setsLost: z.number(),
});
export type ClubResultClubStatType = z.infer<typeof ClubResultClubStat>;

export const ClubTournamentResultData = z.object({
  tournamentId: z.string(),
  tournamentName: z.string(),
  status: TournamentStatusEnum.nullable().optional(),
  finished: z.boolean(),
  totalClubs: z.number(),
  podium: z.array(ClubResultPodiumItem),
  ranking: z.array(ClubResultPodiumItem),
  keyMatches: z.array(ClubResultMatchSummary),
  clubStats: z.array(ClubResultClubStat),
});
export type ClubTournamentResultDataType = z.infer<
  typeof ClubTournamentResultData
>;

export const ClubTournamentResultResponse = z.object({
  status: z.number(),
  message: z.string(),
  data: ClubTournamentResultData,
});
export type ClubTournamentResultResponseType = z.infer<
  typeof ClubTournamentResultResponse
>;
