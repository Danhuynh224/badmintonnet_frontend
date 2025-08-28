import http from "@/lib/http";
import {
  ClubPageResType,
  CreateClubBodyType,
} from "@/schemaValidations/clubs.schema";

import { FileResType } from "@/schemaValidations/common.schema";

const clubServiceApi = {
  uploadImage: (body: FormData) =>
    http.post<FileResType>("/clubs/upload", body),

  createClub: (body: CreateClubBodyType) => http.post("/clubs", body),
  getAllPublicClubs: (page = 0, size = 10) =>
    http.get<ClubPageResType>(`/clubs/all_public?page=${page}&size=${size}`),
};
export default clubServiceApi;
