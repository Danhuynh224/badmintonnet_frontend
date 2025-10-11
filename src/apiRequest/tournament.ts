import http from "@/lib/http";
import { FileResType } from "@/schemaValidations/common.schema";
import {
  PagedTournamentResponse,
  TournamentCreateRequest,
  TournamentDetailResponse,
} from "@/schemaValidations/tournament.schema";
const tournamentApiRequest = {
  uploadImageTournament: (body: FormData) =>
    http.post<FileResType>("/admin/tournament/upload", body),

  createTournament: (body: TournamentCreateRequest) =>
    http.post("/admin/tournament", body),
  getAllTournaments: (page: number, size: number, accessToken?: string) => {
    const config = {
      params: { page, size },
      ...(accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        : {}),
    };

    return http.get<PagedTournamentResponse>("/tournaments", config);
  },
  getDetailBySlug: (slug: string, token = "") =>
    http.get<TournamentDetailResponse>(`/tournaments/${slug}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
};
export default tournamentApiRequest;
