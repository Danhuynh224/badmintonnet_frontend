"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import tournamentApiRequest from "@/apiRequest/tournament";
import { toast } from "sonner";

interface CategoryParticipantsProps {
  categoryId: string;
  tournamentId: string;
}

export default function CategoryParticipants({
  categoryId,
  tournamentId,
}: CategoryParticipantsProps) {
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        // Thay đổi API endpoint phù hợp với backend của bạn
        // const response = await tournamentApiRequest.getCategoryParticipants(
        //   tournamentId,
        //   categoryId
        // );
        // setParticipants(response.payload.data || []);
      } catch (error) {
        toast.error("Không thể tải danh sách người tham gia");
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [tournamentId, categoryId]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Danh sách người chơi
            </h3>
            <Badge variant="outline" className="text-sm">
              {participants.length} người
            </Badge>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Danh sách người chơi
          </h3>
          <Badge variant="outline" className="text-sm">
            {participants.length} người
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {participants.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            Chưa có người tham gia nào
          </p>
        ) : (
          <div className="space-y-3">
            {participants.map((participant: any, index: number) => (
              <div
                key={participant.id}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750 transition border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center font-bold text-teal-600 dark:text-teal-400">
                    {index + 1}
                  </div>
                  {/* <img
                    src={
                      participant.avatar ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${participant.name}`
                    }
                    alt={participant.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700"
                  /> */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {participant.name}
                      </h4>
                      {participant.seed && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border-teal-300 dark:border-teal-700"
                        >
                          Hạt giống #{participant.seed}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {participant.club || "Chưa có CLB"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {participant.ranking && (
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Hạng #{participant.ranking}
                    </p>
                  )}
                  {participant.registeredAt && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ĐK: {participant.registeredAt}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
