import http from "@/lib/http";
import { CreateAbsentReasonBodyType } from "@/schemaValidations/absent-reason";

const absentReasonRequest = {
  createAbsentReason: (body: CreateAbsentReasonBodyType) =>
    http.post("/absent-reason", body),
};
export default absentReasonRequest;
