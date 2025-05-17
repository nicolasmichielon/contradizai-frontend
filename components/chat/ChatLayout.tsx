// src/components/chat/ChatLayout.tsx
"use client";
import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ChatArea } from "./ChatArea";

export const ChatLayout: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>("");

  return (
    <div className="flex gap-[53px] h-screen">
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
