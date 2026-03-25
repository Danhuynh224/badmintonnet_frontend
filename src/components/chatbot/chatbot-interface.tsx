"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Loader2, Sparkles, X } from "lucide-react";
import chatbotApiRequest from "@/apiRequest/chatbot";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const markdownComponents = {
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
    <h1
      className="mb-3 mt-4 border-b pb-1 text-xl font-bold text-foreground"
      {...props}
    />
  ),
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mb-2 mt-4 text-lg font-semibold text-foreground"
      {...props}
    />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mb-2 mt-3 text-base font-semibold text-foreground"
      {...props}
    />
  ),
  h4: (props: React.ComponentPropsWithoutRef<"h4">) => (
    <h4
      className="mb-1 mt-3 text-sm font-semibold text-foreground"
      {...props}
    />
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p
      className="my-2 whitespace-pre-wrap break-words text-sm leading-7 text-foreground"
      {...props}
    />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="my-2 list-disc space-y-1 pl-5 text-sm leading-7"
      {...props}
    />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="my-2 list-decimal space-y-1 pl-5 text-sm leading-7"
      {...props}
    />
  ),
  li: (props: React.ComponentPropsWithoutRef<"li">) => (
    <li className="marker:text-emerald-600" {...props} />
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-3 border-l-4 border-emerald-500 bg-emerald-50/70 px-3 py-2 text-sm italic text-foreground"
      {...props}
    />
  ),
  hr: (props: React.ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-4 border-border" {...props} />
  ),
  a: ({ href, ...props }: React.ComponentPropsWithoutRef<"a">) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-emerald-600 underline decoration-emerald-500/60 underline-offset-4 hover:text-emerald-700"
      {...props}
    />
  ),
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  em: (props: React.ComponentPropsWithoutRef<"em">) => (
    <em className="italic text-foreground" {...props} />
  ),
  del: (props: React.ComponentPropsWithoutRef<"del">) => (
    <del className="text-muted-foreground" {...props} />
  ),
  pre: (props: React.ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="my-3 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100"
      {...props}
    />
  ),
  code: ({ className, ...props }: React.ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn(
        "rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px] text-slate-800",
        className && "bg-transparent px-0 py-0 text-inherit",
      )}
      {...props}
    />
  ),
  table: (props: React.ComponentPropsWithoutRef<"table">) => (
    <div className="my-3 overflow-x-auto rounded-lg border border-border">
      <table
        className="w-full min-w-[480px] border-collapse text-sm"
        {...props}
      />
    </div>
  ),
  thead: (props: React.ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-muted/60" {...props} />
  ),
  tbody: (props: React.ComponentPropsWithoutRef<"tbody">) => (
    <tbody className="divide-y divide-border" {...props} />
  ),
  th: (props: React.ComponentPropsWithoutRef<"th">) => (
    <th
      className="px-3 py-2 text-left font-semibold text-foreground"
      {...props}
    />
  ),
  td: (props: React.ComponentPropsWithoutRef<"td">) => (
    <td className="px-3 py-2 align-top text-foreground" {...props} />
  ),
  img: ({ alt, ...props }: React.ComponentPropsWithoutRef<"img">) => (
    <img
      alt={alt ?? "markdown-image"}
      className="my-3 h-auto max-w-full rounded-lg border border-border"
      loading="lazy"
      {...props}
    />
  ),
};

const SUGGESTED_QUESTIONS = [
  "Làm sao để đăng ký tham gia giải đấu cầu lông?",
  "Cách tham gia câu lạc bộ?",
  "Làm thế nào để cập nhật hồ sơ cá nhân?",
  "Làm thế nào để tạo và cập nhật trình độ cá nhân?",
];

interface ChatbotInterfaceProps {
  onClose?: () => void;
}

export function ChatbotInterface({ onClose }: ChatbotInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Xin chào 👋 Tôi là trợ lý ảo BadmintonNet. Tôi có thể hỗ trợ bạn về giải đấu, câu lạc bộ và đặt sân cầu lông.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    const viewport = scrollRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    ) as HTMLElement;

    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages, loading]);

  /* ================= SEND ================= */
  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: content, sender: "user" },
    ]);
    setInput("");
    setLoading(true);

    try {
      const res = await chatbotApiRequest.askQuestion(content);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: res.payload.data.answer,
          sender: "bot",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Xin lỗi, tôi gặp sự cố. Vui lòng thử lại sau.",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      {/* ================= HEADER ================= */}
      <div className="shrink-0 border-b bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7 border border-white/60">
              <AvatarFallback className="bg-white text-emerald-600">
                <Sparkles className="h-3.5 w-3.5" />
              </AvatarFallback>
            </Avatar>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-white">
                BadmintonNet AI
              </p>
              <p className="text-[9px] text-white/80">
                Trực tuyến • Sẵn sàng hỗ trợ
              </p>
            </div>
          </div>

          {onClose && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-7 w-7 rounded-full text-white/90 hover:bg-white/20 hover:text-white"
              aria-label="Đóng chatbot"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* ================= CHAT ================= */}
      <ScrollArea
        ref={scrollRef}
        className="flex-1 min-h-0 bg-muted/20 px-3 py-2"
      >
        <div className="space-y-2.5">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex gap-2",
                m.sender === "user" ? "justify-end" : "justify-start",
              )}
            >
              {m.sender === "bot" && (
                <Avatar className="h-6 w-6 shrink-0">
                  <AvatarFallback className="bg-emerald-500 text-white">
                    <Sparkles className="h-2.5 w-2.5" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={cn(
                  "max-w-[82%] rounded-2xl px-2.5 py-1.5 text-xs leading-6 shadow-sm",
                  m.sender === "user"
                    ? "bg-emerald-500 text-white"
                    : "bg-background",
                )}
              >
                {m.sender === "bot" ? (
                  <div className="prose prose-sm max-w-none chatbot-message">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {m.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap text-sm leading-6">
                    {m.text}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* ===== Loading bubble ===== */}
          {loading && (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-emerald-500 text-white">
                  <Sparkles className="h-2.5 w-2.5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 rounded-2xl bg-background px-2.5 py-1.5 text-xs shadow-sm">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-500" />
                <span className="text-xs text-muted-foreground">
                  Đang suy nghĩ...
                </span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* ================= SUGGEST ================= */}
      {messages.length === 1 && !loading && (
        <div className="shrink-0 border-t bg-background px-2.5 py-2">
          <p className="mb-1.5 text-[11px] text-muted-foreground">
            Gợi ý câu hỏi:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="rounded-full border px-2.5 py-1 text-[11px] transition hover:bg-emerald-50 hover:text-emerald-600"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================= INPUT ================= */}
      <div className="shrink-0 border-t bg-background px-2.5 py-2">
        <div className="flex gap-1.5">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Nhập câu hỏi của bạn..."
            disabled={loading}
            className="h-9 text-sm"
          />
          <Button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="h-9 bg-emerald-500 px-3 hover:bg-emerald-600"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
        <p className="mt-1 text-center text-[9px] text-muted-foreground">
          AI có thể trả lời chưa chính xác. Vui lòng kiểm tra thông tin quan
          trọng.
        </p>
      </div>
    </div>
  );
}
