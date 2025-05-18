"use client";
import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { ChatArea } from "./ChatArea";
import { getUserIdFromToken } from "@/utils/auth";
import { getChats } from "@/lib/actions/general.action";

export const ChatLayout: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>("");
  const [chats, setChats] = useState<Chat[]>([]);

  // Fetch chats for authenticated user
  useEffect(() => {
    const fetchChats = async () => {
      const token = localStorage.getItem("token") || ""
      const userId = getUserIdFromToken();
      if (!userId) {
        console.error("Usuário não autenticado");
        return;
      }
      const data = await getChats(userId, token) || []
      setChats(data);
    };
    fetchChats();
  }, [selectedChatId, setSelectedChatId]);

  return (
    <div className="flex p-4 gap-[53px] h-screen bg-white">
      <Sidebar
        selectedChatId={selectedChatId}
        setSelectedChatId={setSelectedChatId}
        chats={chats}
        setChatslist={setChats}

      />
      <ChatArea
        chatId={selectedChatId}
        setChatId={setSelectedChatId}
        setChats={setChats}
        setSelectedChatId={setSelectedChatId}
      />
    </div>
  );
};
