// enums.ts
export const EventTypeEnum = {
  TOURNAMENT: "TOURNAMENT",
  TRAINING: "TRAINING",
  CLUB_ACTIVITY: "CLUB_ACTIVITY",
} as const;

export const TournamentParticipationTypeEnum = {
  INDIVIDUAL: "INDIVIDUAL",
  CLUB: "CLUB",
} as const;

export type TournamentParticipationTypeEnumType =
  | keyof typeof TournamentParticipationTypeEnum
  | (typeof TournamentParticipationTypeEnum)[keyof typeof TournamentParticipationTypeEnum];

export const ClubTournamentParticipantStatusEnum = {
  DRAFT: "DRAFT",
  PENDING: "PENDING",
  PAYMENT_REQUIRED: "PAYMENT_REQUIRED",
  PAID: "PAID",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CANCELLED: "CANCELLED",
  ELIMINATED: "ELIMINATED",
} as const;

export type ClubTournamentParticipantStatusEnumType =
  | keyof typeof ClubTournamentParticipantStatusEnum
  | (typeof ClubTournamentParticipantStatusEnum)[keyof typeof ClubTournamentParticipantStatusEnum];

export type EventTypeEnumType =
  | keyof typeof EventTypeEnum
  | (typeof EventTypeEnum)[keyof typeof EventTypeEnum];

export const SportTypeEnum = {
  BADMINTON: "BADMINTON",
  FOOTBALL: "FOOTBALL",
} as const;

export type SportTypeEnumType =
  | keyof typeof SportTypeEnum
  | (typeof SportTypeEnum)[keyof typeof SportTypeEnum];
