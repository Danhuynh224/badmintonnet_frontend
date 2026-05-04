"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trophy,
  Medal,
  ChevronDown,
  ChevronUp,
  Loader2,
  Swords,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import clubTournamentBracketApiRequest from "@/apiRequest/club-tournament-bracket";
import {
  ClubResultClubStatType,
  ClubResultPodiumItemType,
  ClubTournamentResultDataType,
} from "@/schemaValidations/club-tournament-result.schema";

interface ClubTournamentResultInlineProps {
  tournamentId: string;
  tournamentSlug?: string | null;
  participantId: string;
  clubId: string;
}

type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "done"; data: ClubTournamentResultDataType };

function RankingBadge({ rank }: { rank: number }) {
  if (rank === 1)
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-700">
        <Trophy className="w-3.5 h-3.5" /> Vô địch
      </span>
    );
  if (rank === 2)
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-600">
        <Medal className="w-3.5 h-3.5" /> Á quân
      </span>
    );
  if (rank === 3)
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold border border-orange-200 dark:border-orange-700">
        <Medal className="w-3.5 h-3.5" /> Hạng 3
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold border border-gray-200 dark:border-gray-700">
      Hạng {rank}
    </span>
  );
}

function PodiumAvatar({
  podiumItem,
}: {
  podiumItem: ClubResultPodiumItemType | undefined;
}) {
  if (!podiumItem) return null;
  return (
    <div className="flex items-center gap-2">
      {podiumItem.clubLogoUrl ? (
        <Image
          src={podiumItem.clubLogoUrl}
          alt={podiumItem.clubName}
          width={28}
          height={28}
          className="rounded-full border border-gray-200 dark:border-gray-700 object-cover"
        />
      ) : (
        <div className="w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-[10px] font-bold text-violet-700 dark:text-violet-300">
          {podiumItem.clubName.charAt(0)}
        </div>
      )}
      <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate max-w-[120px]">
        {podiumItem.clubName}
      </span>
    </div>
  );
}

export default function ClubTournamentResultInline({
  tournamentId,
  tournamentSlug,
  participantId,
  clubId,
}: ClubTournamentResultInlineProps) {
  const [expanded, setExpanded] = useState(false);
  const [state, setState] = useState<FetchState>({ status: "idle" });

  const handleToggle = async () => {
    if (!expanded && state.status === "idle") {
      setState({ status: "loading" });
      try {
        const res = await clubTournamentBracketApiRequest.getClubResults(tournamentId);
        setState({ status: "done", data: res.payload.data });
      } catch {
        setState({ status: "error", message: "Không thể tải kết quả. Vui lòng thử lại." });
      }
    }
    setExpanded((v) => !v);
  };

  // Find this club's ranking and stats
  const rankEntry: ClubResultPodiumItemType | undefined =
    state.status === "done"
      ? state.data.ranking.find((r) => r.participantId === participantId)
      : undefined;

  const statEntry: ClubResultClubStatType | undefined =
    state.status === "done"
      ? state.data.clubStats.find(
          (s) => s.participantId === participantId || s.clubId === clubId,
        )
      : undefined;

  // Top 3 podium entries (for champion display)
  const podium: ClubResultPodiumItemType[] =
    state.status === "done" ? state.data.podium.slice(0, 3) : [];

  return (
    <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Toggle header */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        <span className="inline-flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          Kết quả giải đấu
        </span>
        {state.status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
        ) : expanded ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 py-4 bg-white dark:bg-gray-900 space-y-4">
          {state.status === "error" && (
            <p className="text-sm text-red-500 dark:text-red-400">{state.message}</p>
          )}

          {state.status === "done" && (
            <>
              {/* My result */}
              {rankEntry ? (
                <div className="flex flex-wrap items-center gap-3">
                  <RankingBadge rank={rankEntry.ranking} />
                  {statEntry && (
                    <>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                        <Swords className="w-3.5 h-3.5 text-indigo-500" />
                        {statEntry.wins}T – {statEntry.losses}B
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                        <BarChart3 className="w-3.5 h-3.5 text-violet-500" />
                        Sets: {statEntry.setsWon}/{statEntry.setsLost}
                      </span>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Chưa có thông tin xếp hạng.
                </p>
              )}

              {/* Podium summary */}
              {podium.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    Bảng xếp hạng giải
                  </p>
                  <div className="space-y-1.5">
                    {podium.map((item) => (
                      <div
                        key={item.participantId}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                          item.participantId === participantId
                            ? "bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/40"
                            : "bg-gray-50 dark:bg-gray-800/40"
                        }`}
                      >
                        {/* Rank icon */}
                        <span className="w-6 text-center text-sm font-bold text-gray-400 dark:text-gray-500 flex-shrink-0">
                          {item.ranking === 1 ? "🥇" : item.ranking === 2 ? "🥈" : "🥉"}
                        </span>
                        <PodiumAvatar podiumItem={item} />
                        {item.participantId === participantId && (
                          <span className="ml-auto text-[10px] font-semibold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/40 px-2 py-0.5 rounded-full">
                            CLB bạn
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Link to full results */}
              {tournamentSlug && (
                <Link
                  href={`/tournaments/${tournamentSlug}?tab=results`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Xem kết quả đầy đủ
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
