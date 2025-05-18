// src/components/Sidebar.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getUsernameFromToken, getUserIdFromToken } from "@/utils/auth";

interface Chat {
  id: string;
  name: string;
  userId: string;
}

interface SidebarProps {
  selectedChatId: string;
  setSelectedChatId: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ selectedChatId, setSelectedChatId }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const router = useRouter();

  useEffect(() => {
    const name = getUsernameFromToken();
    if (!name) {
      router.push("/sign-in");
      return;
    }
    setUsername(name);
  }, [router]);

  // Fetch chats for authenticated user
  useEffect(() => {
    const fetchChats = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        console.error("Usuário não autenticado");
        return;
      }
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chat/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!res.ok) throw new Error(`Failed to fetch chats: ${res.status}`);
        const data: Chat[] = await res.json();
        setChats(data);
        if (data.length && !selectedChatId) {
          setSelectedChatId(data[0].id);
        }
      } catch (err) {
        console.error("Error fetching chats:", err);
      }
    };
    fetchChats();
  }, [selectedChatId, setSelectedChatId]);

  const handleCreateChat = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      console.error("Usuário não autenticado");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error(`Failed to create chat: ${res.status}`);
      const newChat: Chat = await res.json();
      setChats(prev => [newChat, ...prev]);
      setSelectedChatId(newChat.id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/sign-in");
  };

  if (!username) return null;

  return (
    <aside className="flex flex-col gap-6 shadow-[0px_17px_40px_4px_rgba(112,144,176,0.11)] w-[310px] h-full bg-white px-0 py-0 rounded-[20px] max-md:w-full">
      <div className="text-[#1B2559] text-center text-[26px] font-bold px-5 py-0">
        ContradizAi
      </div>
      <div className="h-px w-full bg-[#E9EDF7]" />

      <nav className="flex flex-col gap-2 px-4 py-2">
        <div className="flex items-center justify-between px-2">
          <div className="text-xs font-semibold text-[#6B7280] uppercase">Chats</div>
          <button
            aria-label="Create Chat"
            onClick={handleCreateChat}
            className="text-[#1B2559] text-xl font-bold hover:text-[#374151]"
          >
            +
          </button>
        </div>
        {chats.map(chat => (
          <button
            key={chat.id}
            onClick={() => setSelectedChatId(chat.id)}
            className={`text-[#1B2559] text-sm py-2 px-2 rounded-lg hover:bg-[#F3F4F6] text-left ${
              selectedChatId === chat.id ? "bg-[#E9EDF7]" : ""
            }`}
          >
            {chat.name || "Chat"}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3 bg-white mt-auto mx-3.5 p-3.5 rounded-[30px] shadow-[14px_17px_40px_4px_rgba(112,144,176,0.08)]">
        <div className="text-[#1B2559] text-sm font-bold">{username}</div>
        <button aria-label="Logout" onClick={handleLogout} className="ml-auto cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1B2559"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 13l3-3m0 0l-3-3m3 3H9" />
            <path d="M6 21V3a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" />
          </svg>
        </button>
      </div>
    </aside>
  );
};
