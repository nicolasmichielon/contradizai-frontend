"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChatInput } from "./ChatInput";
import { SuggestionChips } from "./SuggestionChips";
import { getUserIdFromToken } from "@/utils/auth";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  created_at: Date;
}

interface ChatAreaProps {
  chatId: string;
  setChatId: (id: string) => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ chatId, setChatId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch messages for selected chat
  useEffect(() => {
    setMessages([]);
    if (!chatId) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/message/chat/${chatId}`,
          {
            headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );

        if (res.status === 404) {
          // Treat 404 as empty messages, not error
          setMessages([]);
          setLoading(false);
          return;
        }

        if (!res.ok) throw new Error(`Failed to fetch messages: ${res.status}`);
        const data = await res.json();
        setMessages(
          data.map((m: any) => ({
            id: m.id,
            text: m.text,
            sender: m.sender === "user" ? "user" : "bot",
            created_at: new Date(m.created_at),
          }))
        );
      } catch (err) {
        console.error("Error loading messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending message
  const handleSendMessage = async (text: string) => {
    let usedChatId = chatId;

    // If chat doesn't exist, create it
    if (!usedChatId) {
      const userId = getUserIdFromToken();
      if (!userId) {
        alert("Não foi possível identificar o usuário!");
        return;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId, firstMessage: text }),
      });
      const data = await res.json();
      const chatdata = data.chat
      if (!chatdata || !chatdata.id) {
        alert("Erro: resposta inesperada da API ao criar chat: " + JSON.stringify(chatdata));
        return;
      }
      usedChatId = chatdata.id;
      setChatId(chatdata.id);

      // Optimistically add user's message
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text, sender: "user", created_at: new Date() },
      ]);
    } else {
      // Optimistically add user's message
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text, sender: "user", created_at: new Date() },
      ]);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ chatId: usedChatId, sender: "user", text }),
        });
        if (!res.ok) {
          console.error("API error", res.status, await res.text());
          return;
        }
      } catch (err) {
        console.error("Error sending message:", err);
      }
    }
  }

  // Always re-fetch messages after send to guarantee sync with backend:
  const fetchMessages = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/message/chat/${chatId}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error(`Failed to fetch messages: ${res.status}`);
      const data = await res.json();
      setMessages(
        data.map((m: any) => ({
          id: m.id,
          text: m.text,
          sender: m.sender === "user" ? "user" : "bot",
          created_at:
            m.created_at && !isNaN(Date.parse(m.created_at))
              ? new Date(m.created_at)
              : new Date(),
        }))
      );

    } catch (err) {
      console.error("Error loading messages:", err);


    }
    await fetchMessages();
  };

  return (
    <main className="flex-1 flex flex-col h-full">
      <header>
        <h1 className="text-[#1B2559] text-[34px] font-bold mb-[53px]">
          Chat
        </h1>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-0 mb-4">
        <div className="w-full max-w-[940px] mx-auto">
          {loading && <p>Carregando mensagens...</p>}
          {!loading && messages.length === 0 && (
            <p>Selecione um chat ou comece uma conversa!</p>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`mb-4 ${m.sender === "user" ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block p-4 rounded-[14px] max-w-[70%] ${m.sender === "user"
                  ? "bg-[#800080] text-white"
                  : "bg-gray-100 text-[#1B2559]"
                  }`}
              >
                {m.text}
              </div>
              <div className="text-[10px] text-gray-400">
                {m.created_at.toLocaleTimeString()}
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
}
