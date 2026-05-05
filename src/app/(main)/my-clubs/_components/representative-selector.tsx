"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Check,
  Loader2,
  Search,
  Crown,
  UserCheck,
  Info,
  Sparkles,
} from "lucide-react";
import { ClubRosterMember } from "@/schemaValidations/tournament.schema";
import clubTournamentApiRequest from "@/apiRequest/club-tournament";
import clubTournamentBracketApiRequest from "@/apiRequest/club-tournament-bracket";
import { toast } from "sonner";

interface RepresentativeSelectorProps {
  participantId: string;
  roster: ClubRosterMember[];
  /** @deprecated không còn cần thiết – component sẽ tự fetch rep hiện tại */
  representativeId?: string | null;
  onSuccess: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RepresentativeSelector({
  participantId,
  roster: initialRoster,
  onSuccess,
  open,
  onOpenChange,
}: RepresentativeSelectorProps) {
  const [roster, setRoster] = useState<ClubRosterMember[]>(initialRoster);
  const [currentRepId, setCurrentRepId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");

  // Mở dialog → fetch roster + rep hiện tại song song
  useEffect(() => {
    if (!open) return;
    setSearch("");
    setLoading(true);
    setRoster(initialRoster);

    Promise.allSettled([
      clubTournamentApiRequest.getParticipantDetail(participantId),
      clubTournamentBracketApiRequest.getRepresentative(participantId),
    ])
      .then(([detailRes, repRes]) => {
        if (detailRes.status === "fulfilled") {
          setRoster(detailRes.value.payload.data?.roster ?? []);
        }
        if (repRes.status === "fulfilled") {
          const repId = repRes.value.payload.data?.rosterEntryId ?? null;
          setCurrentRepId(repId);
          setSelected(repId);
        } else {
          setCurrentRepId(null);
          setSelected(null);
        }
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, participantId]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return roster;
    return roster.filter(
      (m) =>
        m.fullName.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q),
    );
  }, [roster, search]);

  const currentRepMember = useMemo(
    () => roster.find((m) => m.rosterEntryId === currentRepId) ?? null,
    [roster, currentRepId],
  );

  const hasChange = selected !== null && selected !== currentRepId;

  const handleSubmit = async () => {
    if (!selected) {
      toast.error("Vui lòng chọn một thành viên");
      return;
    }
    setSubmitting(true);
    try {
      await clubTournamentBracketApiRequest.setRepresentative(participantId, {
        rosterEntryId: selected,
      });
      toast.success("Đã chọn đại diện đơn nam thành công");
      setCurrentRepId(selected);
      onSuccess();
      onOpenChange(false);
    } catch {
      toast.error("Không thể chọn đại diện. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle>Chọn đại diện đơn nam</DialogTitle>
              <DialogDescription className="text-xs mt-0.5">
                Chọn 1 thành viên nam từ roster để đại diện CLB thi đấu đơn nam.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Rep hiện tại */}
        {!loading && currentRepMember && (
          <div className="flex items-center gap-3 rounded-xl border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/60 dark:bg-emerald-900/20 px-3 py-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] uppercase font-semibold text-emerald-700 dark:text-emerald-300 tracking-wide">
                Đại diện hiện tại
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {currentRepMember.fullName}
              </p>
            </div>
          </div>
        )}

        {!loading && !currentRepMember && (
          <div className="flex items-center gap-2 rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50/60 dark:bg-amber-900/20 px-3 py-2 text-xs text-amber-800 dark:text-amber-200">
            <Info className="w-4 h-4 flex-shrink-0" />
            CLB chưa chọn đại diện. Hãy chọn 1 thành viên nam từ danh sách bên
            dưới.
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên hoặc email…"
            className="pl-8 h-9 text-sm"
          />
        </div>

        {/* List */}
        <div className="flex-1 min-h-0 overflow-y-auto -mx-1 px-1 space-y-2">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-violet-600" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-8">
              {roster.length === 0
                ? "Chưa có thành viên nào trong roster."
                : "Không có thành viên khớp với từ khóa."}
            </p>
          ) : (
            filtered.map((member) => {
              const isSelected = selected === member.rosterEntryId;
              const isCurrentRep = currentRepId === member.rosterEntryId;
              return (
                <button
                  key={member.rosterEntryId}
                  type="button"
                  onClick={() => setSelected(member.rosterEntryId)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? "border-violet-500 bg-violet-50/70 dark:bg-violet-950/40 ring-1 ring-violet-500/40"
                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={member.avatarUrl ?? undefined} />
                    <AvatarFallback className="bg-violet-100 text-violet-700 text-sm font-semibold">
                      {member.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {member.fullName}
                      </p>
                      {member.role === "OWNER" && (
                        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 text-[10px] px-1.5 py-0 gap-1">
                          <Crown className="w-3 h-3" />
                          Chủ CLB
                        </Badge>
                      )}
                      {isCurrentRep && (
                        <Badge className="bg-emerald-500 text-white text-[10px] px-1.5 py-0 gap-1">
                          <Check className="w-3 h-3" />
                          Đại diện
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {member.email}
                      {member.skillLevel && (
                        <>
                          <span className="mx-1.5 text-gray-300">•</span>
                          {member.skillLevel}
                        </>
                      )}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    {isSelected ? (
                      <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitting || loading || !hasChange}
            className="bg-violet-600 hover:bg-violet-700 text-white disabled:opacity-50"
          >
            {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {currentRepId ? "Đổi đại diện" : "Xác nhận"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
