import http from "@/lib/http";
import { FileResType } from "@/schemaValidations/common.schema";
import {
  PagedTournamentResponse,
  TournamentCreateRequest,
} from "@/schemaValidations/tournament.schema";
const tournamentApiRequest = {
  uploadImageTournament: (body: FormData) =>
    http.post<FileResType>("/admin/tournament/upload", body),

  createTournament: (body: TournamentCreateRequest) =>
    http.post("/admin/tournament", body),
  getAllTournaments: (page: number, size: number, accessToken: string) =>
    http.get<PagedTournamentResponse>(
      `/tournaments?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ),
};
export default tournamentApiRequest;
