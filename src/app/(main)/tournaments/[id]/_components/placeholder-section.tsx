export default function PlaceholderSection({ label }: { label: string }) {
  return (
    <div className="text-center text-gray-500 dark:text-gray-400 italic mt-10">
      🧩 Chức năng {label.toLowerCase()} đang phát triển...
    </div>
  );
}
