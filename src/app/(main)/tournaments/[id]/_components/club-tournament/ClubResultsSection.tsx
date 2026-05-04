import { cookies } from "next/headers";
import {
  Trophy,
  Medal,
  Award,
  Users,
  Activity,
  ListOrdered,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clubTournamentBracketApiRequest from "@/apiRequest/club-tournament-bracket";
import {
  ClubResultClubStatType,
  ClubResultMatchSummaryType,
  ClubResultPodiumItemType,
  ClubTournamentResultDataType,
} from "@/schemaValidations/club-tournament-result.schema";

interface ClubResultsSectionProps {
  tournamentId: string;
}

export default async function ClubResultsSection({
  tournamentId,
}: ClubResultsSectionProps) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  let data: ClubTournamentResultDataType | null = null;
  try {
    const res = await clubTournamentBracketApiRequest.getClubResults(
      tournamentId,
      accessToken,
    );
    data = res.payload.data;
  } catch (error) {
    console.error("Error fetching club tournament results:", error);
  }

  if (!data) {
    return (
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Trophy className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Chưa có dữ liệu kết quả giải đấu
          </p>
        </CardContent>
      </Card>
    );
  }

  const { finished, podium, ranking, keyMatches, clubStats, totalClubs } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-950/30 dark:to-blue-950/30 border border-violet-200 dark:border-violet-800">
        <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-5">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
              <Trophy className="w-5 h-5 text-amber-500" />
              Kết quả giải đấu CLB
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {totalClubs} CLB tham dự
            </p>
          </div>
          <Badge
            className={
              finished
                ? "bg-green-100 text-green-700 border border-green-300 dark:bg-green-950 dark:text-green-300 dark:border-green-800 px-3 py-1 text-sm"
                : "bg-blue-100 text-blue-700 border border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800 px-3 py-1 text-sm"
            }
          >
            {finished ? "Đã kết thúc" : "Đang diễn ra"}
          </Badge>
        </CardContent>
      </Card>

      {/* Empty state khi chưa có chung kết */}
      {!finished && podium.length === 0 && (
        <Card className="bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="inline-flex p-4 bg-amber-50 dark:bg-amber-950/30 rounded-full mb-4">
              <Sparkles className="w-10 h-10 text-amber-500" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Giải đấu chưa kết thúc
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
              Kết quả chính thức sẽ được cập nhật sau khi trận chung kết kết
              thúc. Bạn vẫn có thể xem thống kê các trận đã đấu bên dưới.
            </p>
          </CardContent>
        </Card>
      )}

      {/* PODIUM */}
      {podium.length > 0 && <PodiumSection podium={podium} />}

      {/* KEY MATCHES */}
      {keyMatches.length > 0 && <KeyMatchesSection matches={keyMatches} />}

      {/* FULL RANKING */}
      {ranking.length > 0 && <RankingTable ranking={ranking} />}

      {/* CLUB STATS */}
      {clubStats.some((s) => s.played > 0) && (
        <ClubStatsGrid stats={clubStats} />
      )}
    </div>
  );
}

// =========================================================
// PODIUM
// =========================================================

function PodiumSection({ podium }: { podium: ClubResultPodiumItemType[] }) {
  // Sắp xếp: gold ở giữa, silver bên trái, bronze bên phải
  const gold = podium.find((p) => p.ranking === 1);
  const silver = podium.find((p) => p.ranking === 2);
  const bronzes = podium.filter((p) => p.ranking === 3);

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Award className="w-5 h-5 text-amber-500" />
          Bục vinh quang
        </CardTitle>
      </CardHeader>
      <CardContent className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* Silver - left */}
          <div className="md:order-1 order-2">
            {silver ? (
              <PodiumCard item={silver} heightClass="md:h-44" />
            ) : (
              <PodiumPlaceholder rank={2} />
            )}
          </div>

          {/* Gold - center, taller */}
          <div className="md:order-2 order-1">
            {gold ? (
              <PodiumCard item={gold} heightClass="md:h-56" featured />
            ) : (
              <PodiumPlaceholder rank={1} />
            )}
          </div>

          {/* Bronze - right (có thể có 2 nếu cả 2 semi đều xong) */}
          <div className="md:order-3 order-3 space-y-3">
            {bronzes.length > 0 ? (
              bronzes.map((b) => (
                <PodiumCard
                  key={b.participantId}
                  item={b}
                  heightClass="md:h-32"
                />
              ))
            ) : (
              <PodiumPlaceholder rank={3} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PodiumCard({
  item,
  heightClass,
  featured = false,
}: {
  item: ClubResultPodiumItemType;
  heightClass: string;
  featured?: boolean;
}) {
  const config = getRankConfig(item.ranking);

  return (
    <div
      className={`relative rounded-xl border-2 ${config.border} ${config.bg} p-5 flex flex-col items-center justify-center text-center ${heightClass} transition-all hover:shadow-lg`}
    >
      {/* Rank badge */}
      <div
        className={`absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full ${config.badgeBg} border-2 ${config.border} flex items-center justify-center shadow-md`}
      >
        {config.icon}
      </div>

      {/* Club logo */}
      <Avatar
        className={`${featured ? "w-20 h-20" : "w-16 h-16"} mb-3 mt-2 border-2 ${config.border}`}
      >
        <AvatarImage src={item.clubLogoUrl ?? undefined} alt={item.clubName} />
        <AvatarFallback className={`${config.fallbackBg} font-bold`}>
          {item.clubName.charAt(0)}
        </AvatarFallback>
      </Avatar>

      {/* Club name */}
      <h4
        className={`${featured ? "text-lg" : "text-base"} font-bold text-gray-900 dark:text-white truncate w-full`}
        title={item.clubName}
      >
        {item.clubName}
      </h4>

      {/* Representative */}
      {item.representativeName && (
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-600 dark:text-gray-400">
          <Avatar className="w-5 h-5">
            <AvatarImage src={item.representativeAvatarUrl ?? undefined} />
            <AvatarFallback className="text-[10px] bg-gray-200 dark:bg-gray-700">
              {item.representativeName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="truncate" title={item.representativeName}>
            {item.representativeName}
          </span>
        </div>
      )}

      {/* Prize */}
      {item.prize && (
        <div
          className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold ${config.prizeBg}`}
        >
          {item.prize}
        </div>
      )}
    </div>
  );
}

function PodiumPlaceholder({ rank }: { rank: number }) {
  const config = getRankConfig(rank);
  return (
    <div
      className={`rounded-xl border-2 border-dashed ${config.border} bg-gray-50 dark:bg-gray-800/50 p-5 flex flex-col items-center justify-center text-center h-32 opacity-50`}
    >
      {config.icon}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Hạng {rank}
      </p>
    </div>
  );
}

// =========================================================
// KEY MATCHES
// =========================================================

function KeyMatchesSection({
  matches,
}: {
  matches: ClubResultMatchSummaryType[];
}) {
  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Activity className="w-5 h-5 text-blue-500" />
          Trận đấu quan trọng
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
        {matches.map((match) => (
          <KeyMatchCard key={match.matchId} match={match} />
        ))}
      </CardContent>
    </Card>
  );
}

function KeyMatchCard({ match }: { match: ClubResultMatchSummaryType }) {
  const isFinal = match.label === "Chung kết";
  return (
    <div
      className={`rounded-xl border-2 ${
        isFinal
          ? "border-amber-300 dark:border-amber-700 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20"
          : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30"
      } p-4`}
    >
      <div className="flex items-center justify-between mb-3">
        <Badge
          className={
            isFinal
              ? "bg-amber-100 text-amber-700 border border-amber-300 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700"
              : "bg-blue-100 text-blue-700 border border-blue-300 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700"
          }
        >
          {isFinal && <Trophy className="w-3 h-3 mr-1" />}
          {match.label}
        </Badge>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Trận {match.matchIndex}
        </span>
      </div>

      <div className="space-y-2">
        <MatchPlayerRow
          player={match.player1}
          scores={match.setScoreP1}
          isWinner={match.winnerId === match.player1?.participantId}
        />
        <div className="h-px bg-gray-200 dark:bg-gray-700" />
        <MatchPlayerRow
          player={match.player2}
          scores={match.setScoreP2}
          isWinner={match.winnerId === match.player2?.participantId}
        />
      </div>

      {match.winnerName && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center gap-1.5 text-sm">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span className="font-semibold text-green-700 dark:text-green-400">
            {match.winnerName}
          </span>
          <span className="text-gray-500 dark:text-gray-400">chiến thắng</span>
        </div>
      )}
    </div>
  );
}

function MatchPlayerRow({
  player,
  scores,
  isWinner,
}: {
  player: ClubResultMatchSummaryType["player1"];
  scores: number[] | null | undefined;
  isWinner: boolean;
}) {
  if (!player) {
    return (
      <div className="flex items-center gap-2 py-1.5 text-sm text-gray-400 italic">
        Không xác định
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 py-1.5">
      <Avatar className="w-9 h-9">
        <AvatarImage src={player.clubLogoUrl ?? undefined} />
        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
          {player.clubName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div
          className={`font-semibold truncate text-sm ${
            isWinner
              ? "text-green-600 dark:text-green-400"
              : "text-gray-900 dark:text-white"
          }`}
          title={player.clubName}
        >
          {player.clubName}
        </div>
        {player.memberName && (
          <div
            className="text-[11px] text-gray-500 dark:text-gray-400 truncate"
            title={player.memberName}
          >
            {player.memberName}
          </div>
        )}
      </div>
      {scores && scores.length > 0 && (
        <div className="flex items-center gap-1 flex-shrink-0">
          {scores.map((s, i) => (
            <div
              key={i}
              className={`w-7 h-7 flex items-center justify-center rounded text-xs font-bold ${
                isWinner
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {s}
            </div>
          ))}
          {isWinner && <Trophy className="w-3.5 h-3.5 text-amber-500 ml-0.5" />}
        </div>
      )}
    </div>
  );
}

// =========================================================
// RANKING TABLE
// =========================================================

function RankingTable({ ranking }: { ranking: ClubResultPodiumItemType[] }) {
  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <ListOrdered className="w-5 h-5 text-violet-500" />
          Bảng xếp hạng đầy đủ
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {ranking.map((item) => {
            const config = getRankConfig(item.ranking);
            const isPodium = item.ranking <= 3;
            return (
              <div
                key={`${item.participantId}-${item.ranking}`}
                className={`flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                  isPodium ? "bg-gray-50/50 dark:bg-gray-800/30" : ""
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isPodium
                      ? `${config.badgeBg} border-2 ${config.border}`
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  {isPodium ? (
                    config.icon
                  ) : (
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                      {item.ranking}
                    </span>
                  )}
                </div>

                <Avatar className="w-9 h-9">
                  <AvatarImage src={item.clubLogoUrl ?? undefined} />
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                    {item.clubName.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 dark:text-white truncate">
                    {item.clubName}
                  </div>
                  {item.representativeName && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      Đại diện: {item.representativeName}
                    </div>
                  )}
                </div>

                {item.prize && (
                  <Badge
                    className={`${config.prizeBg} text-xs font-medium hidden sm:inline-flex`}
                  >
                    {item.prize}
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// =========================================================
// CLUB STATS GRID
// =========================================================

function ClubStatsGrid({ stats }: { stats: ClubResultClubStatType[] }) {
  // Chỉ hiển thị các CLB đã đấu ít nhất 1 trận, sort theo wins desc
  const filtered = stats
    .filter((s) => s.played > 0)
    .sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.setsWon - b.setsLost - (a.setsWon - a.setsLost);
    });

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Users className="w-5 h-5 text-emerald-500" />
          Thống kê CLB
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-6">
        {filtered.map((s) => {
          const winRate = s.played > 0 ? (s.wins / s.played) * 100 : 0;
          const setDiff = s.setsWon - s.setsLost;
          return (
            <div
              key={s.participantId}
              className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={s.clubLogoUrl ?? undefined} />
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                    {s.clubName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                    {s.clubName}
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400">
                    {s.played} trận
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-md bg-green-100 dark:bg-green-900/30 px-2 py-1.5">
                  <div className="text-base font-bold text-green-700 dark:text-green-400">
                    {s.wins}
                  </div>
                  <div className="text-[10px] text-green-600/80 dark:text-green-500/80 uppercase tracking-wider">
                    Thắng
                  </div>
                </div>
                <div className="rounded-md bg-red-100 dark:bg-red-900/30 px-2 py-1.5">
                  <div className="text-base font-bold text-red-700 dark:text-red-400">
                    {s.losses}
                  </div>
                  <div className="text-[10px] text-red-600/80 dark:text-red-500/80 uppercase tracking-wider">
                    Thua
                  </div>
                </div>
                <div className="rounded-md bg-blue-100 dark:bg-blue-900/30 px-2 py-1.5">
                  <div className="text-base font-bold text-blue-700 dark:text-blue-400">
                    {winRate.toFixed(0)}%
                  </div>
                  <div className="text-[10px] text-blue-600/80 dark:text-blue-500/80 uppercase tracking-wider">
                    Tỉ lệ
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                <span>
                  Set: {s.setsWon} - {s.setsLost}
                </span>
                <span
                  className={
                    setDiff > 0
                      ? "text-green-600 dark:text-green-400 font-semibold"
                      : setDiff < 0
                        ? "text-red-600 dark:text-red-400 font-semibold"
                        : ""
                  }
                >
                  {setDiff > 0 ? `+${setDiff}` : setDiff}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

// =========================================================
// HELPERS
// =========================================================

function getRankConfig(rank: number) {
  switch (rank) {
    case 1:
      return {
        icon: <Trophy className="w-5 h-5 text-yellow-500" />,
        border: "border-yellow-400 dark:border-yellow-600",
        bg: "bg-gradient-to-b from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20",
        badgeBg: "bg-yellow-100 dark:bg-yellow-900/50",
        fallbackBg:
          "bg-yellow-200 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200",
        prizeBg:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200",
      };
    case 2:
      return {
        icon: <Medal className="w-5 h-5 text-gray-400" />,
        border: "border-gray-300 dark:border-gray-600",
        bg: "bg-gradient-to-b from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50",
        badgeBg: "bg-gray-100 dark:bg-gray-800",
        fallbackBg:
          "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
        prizeBg:
          "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
      };
    case 3:
      return {
        icon: <Award className="w-5 h-5 text-orange-500" />,
        border: "border-orange-300 dark:border-orange-700",
        bg: "bg-gradient-to-b from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20",
        badgeBg: "bg-orange-100 dark:bg-orange-900/50",
        fallbackBg:
          "bg-orange-200 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200",
        prizeBg:
          "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200",
      };
    default:
      return {
        icon: <span className="text-sm font-bold">{rank}</span>,
        border: "border-gray-200 dark:border-gray-700",
        bg: "bg-gray-50 dark:bg-gray-800/50",
        badgeBg: "bg-gray-100 dark:bg-gray-800",
        fallbackBg:
          "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
        prizeBg:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
      };
  }
}
