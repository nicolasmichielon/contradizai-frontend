// src/components/chat/ChatArea.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChatInput } from "./ChatInput";
import { SuggestionChips } from "./SuggestionChips";
import { getUserIdFromToken } from "@/utils/auth";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatAreaProps {
  chatId: string;
  setChatId: (id: string) => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ chatId, setChatId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (text: string) => {
  let usedChatId = chatId;

  // Se não tem chatId, cria novo chat com o userId correto
  if (!usedChatId) {
    const userId = getUserIdFromToken();
    if (!userId) {
      alert("Não foi possível identificar o usuário!");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    if (!res.ok) {
      const text = await res.text();
      alert("Erro ao criar novo chat!\n" + text);
      return;
    }
    const data = await res.json();
    console.log("RESPOSTA CRIAR CHAT:", data); // <-- veja o campo exato!
    usedChatId = data.id || data.chatId;
    if (!usedChatId) {
      alert("Resposta inesperada da API ao criar chat: " + JSON.stringify(data));
      return;
    }
    setChatId(usedChatId);
  }


    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text, sender: "user", timestamp: new Date() },
    ]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: usedChatId, text }),
      });
      if (!res.ok) {
        console.error("API error", res.status, await res.text());
        return;
      }

      const { reply } = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: reply, sender: "bot", timestamp: new Date() },
      ]);
    } catch (err) {
      console.error("Failed to fetch bot reply:", err);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="flex-1 flex flex-col h-full">
      <header>
        <h1 className="text-[#1B2559] text-[34px] font-bold mb-[53px]">
          Chat
        </h1>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-0 mb-4">
        <div className="w-full max-w-[940px] mx-auto">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`mb-4 ${m.sender === "user" ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block p-4 rounded-[14px] max-w-[70%] ${
                  m.sender === "user"
                    ? "bg-[#800080] text-white"
                    : "bg-gray-100 text-[#1B2559]"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white py-4">
        <div className="flex flex-col items-center gap-3 w-full max-w-[940px] mx-auto">
          <ChatInput onSendMessage={handleSendMessage} />
          <SuggestionChips onSelectSuggestion={handleSendMessage} />
        </div>
      </div>
    </main>
  );
};
