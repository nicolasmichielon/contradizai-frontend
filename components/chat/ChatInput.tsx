"use client";
import React, { useState } from "react";

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Delegate the send to ChatArea
    onSendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2.5 w-full max-sm:flex-col">
        <input
          type="text"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 h-[54px] border border-slate-200 text-sm text-[#292929] px-5 rounded-[45px] focus:outline-1"
          aria-label="Message input"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className={`
            w-48 h-[54px] text-white text-sm font-semibold
            bg-[#4318FF] rounded-[45px] max-sm:w-full
            cursor-pointer disabled:cursor-not-allowed
            ${message.trim() ? "opacity-100" : "opacity-20"}
          `}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
