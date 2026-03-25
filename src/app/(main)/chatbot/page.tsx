import { ChatbotInterface } from "@/components/chatbot/chatbot-interface";

export default function ChatbotPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="h-[calc(100vh-12rem)] min-h-[560px] overflow-hidden rounded-2xl border border-emerald-100 bg-background shadow-sm">
        <ChatbotInterface />
      </div>
    </main>
  );
}
