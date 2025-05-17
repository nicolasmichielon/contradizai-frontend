"use client";
import React from "react";

interface SuggestionChipsProps {
  onSelectSuggestion: (suggestion: string) => void;
}

export const SuggestionChips: React.FC<SuggestionChipsProps> = ({
  onSelectSuggestion,
}) => {
  const suggestions = [
    { emoji: "❤️", text: "Preciso de um conselho romântico." },
    { emoji: "🚀", text: "Como ficar rico rápido e sem esforço?" },
    {
      emoji: "💼",
      text: "Qual a melhor forma de impressionar numa entrevista de emprego?",
    },
  ];

  return (
    <div className="flex gap-2.5 w-full justify-center max-md:flex-col max-md:items-center max-sm:px-[15px] max-sm:py-0">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelectSuggestion(suggestion.text)}
          className="text-sm text-[#1B2559] shadow-[14px_27px_45px_4px_rgba(112,144,176,0.20)] flex-1 max-w-[300px] bg-white p-5 rounded-[14px] text-left hover:bg-gray-50 transition-colors"
        >
          {suggestion.emoji} "{suggestion.text}"
        </button>
      ))}
    </div>
  );
};
