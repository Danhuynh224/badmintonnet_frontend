"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import paymentApiRequest from "@/apiRequest/payment";
import { PaymentStatus } from "@/schemaValidations/payment";

export default function VNPayReturnPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  const [tournamentId, setTournamentId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const handlePaymentReturn = async () => {
      try {
        const response = await paymentApiRequest.handleVNPayReturn(
          searchParams
        );

        setTournamentId(response.payload.data.tournamentId);
        setCategoryId(response.payload.data.categoryId);

        const paymentStatus: PaymentStatus = response.payload.data.status;

        if (paymentStatus === "SUCCESS") {
          setStatus("success");
          setMessage("Thanh toán thành công!");
        } else if (paymentStatus === "FAILED") {
          setStatus("error");
          setMessage("Thanh toán thất bại");
        } else {
          setStatus("error");
          setMessage("Thanh toán đang được xử lý");
        }
      } catch (error: unknown) {
        setStatus("error");
        setMessage("Có lỗi xảy ra");
      }
    };

    handlePaymentReturn();
  }, [searchParams]);

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          {status === "loading" && (
            <>
              <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
              <h2 className="text-2xl font-bold mt-4">Đang xử lý...</h2>
              <p className="text-muted-foreground mt-2">
                Vui lòng đợi trong giây lát
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold mt-4 text-green-500">
                Thanh toán thành công!
              </h2>
              <p className="text-muted-foreground mt-2">{message}</p>
              <Button
                className="mt-6"
                onClick={() =>
                  router.push(
                    `/tournaments/${tournamentId}/categories/${categoryId}`
                  )
                }
              >
                Quay về trang giải đấu
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="h-16 w-16 text-red-500 mx-auto" />
              <h2 className="text-2xl font-bold mt-4 text-red-500">
                Thanh toán thất bại
              </h2>
              <p className="text-muted-foreground mt-2">{message}</p>
              <Button
                className="mt-6"
                variant="outline"
                onClick={() => router.back()}
              >
                Thử lại
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
