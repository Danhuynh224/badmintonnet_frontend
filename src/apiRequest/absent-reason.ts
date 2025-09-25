import http from "@/lib/http";
import {
  AbsentReasonResType,
  CreateAbsentReasonBodyType,
} from "@/schemaValidations/absent-reason";

const absentReasonRequest = {
  createAbsentReason: (body: CreateAbsentReasonBodyType) =>
    http.post("/absent-reason", body),
  getAbsentReason: (idPart: string) =>
    http.get<AbsentReasonResType>(`/absent-reason/${idPart}`),
  approvedReason: (id: string) => http.put(`/absent-reason/approve/${id}`),
  rejectReason: (id: string) => http.put(`/absent-reason/reject/${id}`),
};
export default absentReasonRequest;
