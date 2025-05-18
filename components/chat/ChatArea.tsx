"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChatInput } from "./ChatInput";
import { SuggestionChips } from "./SuggestionChips";
import { getUserIdFromToken } from "@/utils/auth";
import { createChat } from "@/lib/actions/general.action";

export const ChatArea: React.FC<ChatAreaProps> = ({ chatId, setChatId, setChats, setSelectedChatId }) => {
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
            timestamp: new Date(m.timestamp),
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

  // const handleCreateChat = async (message: string) => {
  //   const token = localStorage.getItem("token") || ""
  //   const userId = getUserIdFromToken();
  //   if (!userId) {
  //     console.error("Usuário não autenticado");
  //     return;
  //   }
  //   try {
  //     const chat = await createChat(userId, token, message)
  //     setChats(prev => [chat!, ...prev]);
  //     setSelectedChatId(chat!.id);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
        { id: Date.now(), text, sender: "user", timestamp: new Date() },
      ]);
    } else {
      // Optimistically add user's message
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text, sender: "user", timestamp: new Date() },
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

        // Always re-fetch messages after send to guarantee sync with backend:
        const fetchMessages = async () => {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/message/chat/${usedChatId}`, {
              headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            if (!res.ok) throw new Error(`Failed to fetch messages: ${res.status}`);
            const data = await res.json();
            setMessages(
              data.map((m: any) => ({
                id: m.id,
                text: m.text,
                sender: m.sender === "user" ? "user" : "bot",
                timestamp:
                  m.timestamp && !isNaN(Date.parse(m.timestamp))
                    ? new Date(m.timestamp)
                    : new Date(),
              }))
            );

          } catch (err) {
            console.error("Error loading messages:", err);
          }
        };
        await fetchMessages();

      } catch (err) {
        console.error("Failed to fetch bot reply:", err);
      }
    }
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
                {m.timestamp.toLocaleTimeString()}
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
