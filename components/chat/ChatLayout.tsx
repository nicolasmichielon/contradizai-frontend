// src/components/chat/ChatLayout.tsx
"use client";
import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ChatArea } from "./ChatArea";

export const ChatLayout: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>("");

  return (
    <div className="flex p-4 gap-[53px] h-screen bg-white">
      <Sidebar
        selectedChatId={selectedChatId}
        setSelectedChatId={setSelectedChatId}
      />
      <ChatArea
        chatId={selectedChatId}
        setChatId={setSelectedChatId}
      />
    </div>
  );
};
