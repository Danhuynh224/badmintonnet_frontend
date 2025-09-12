import http from "@/lib/http";

import { ClubAdminPageResType } from "@/schemaValidations/clubs.schema";

const adminApiRequest = {
  getAllClubs: (page = 0, size = 10, token = "") =>
    http.get<ClubAdminPageResType>(
      `/admin/clubs/all?page=${page}&size=${size}`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    ),

  updateClubStatus: (clubId: string, status: string, token = "") =>
    http.put(`/admin/clubs/${clubId}/status?newStatus=${status}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),

  deleteClub: (clubId: string, token = "") =>
    http.delete(`/admin/clubs/${clubId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
};

export default adminApiRequest;
