"use client";

interface JoinClubButtonProps {
  clubId: string;
  clubName: string;
}

export const JoinClubButton = ({ clubId, clubName }: JoinClubButtonProps) => {
  const handleJoinClub = () => {
    // Trong thực tế, có thể gọi API hoặc redirect
    alert(`Tham gia ${clubName}! (ID: ${clubId})`);
    // await joinClub(clubId);
    // router.push(`/clubs/${clubId}/join`);
  };

  return (
    <button
      onClick={handleJoinClub}
      className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 dark:bg-green-700 dark:hover:bg-green-600"
    >
      Tham gia
    </button>
  );
};
