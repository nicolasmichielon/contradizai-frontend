import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsernameFromToken } from "@/utils/auth";
import { Icon } from "@iconify/react";

export const Sidebar: React.FC<SidebarProps> = ({ selectedChatId, chats, setSelectedChatId, setChatslist }) => {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const name = getUsernameFromToken();
    if (!name) {
      router.push("/sign-in");
      return;
    }
    setUsername(name);
  }, [router]);

  const handleOpenNewChat = () => {
    setSelectedChatId("")
  }



  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/sign-in");
  };

  const handleDeleteChat = async (chatId: string) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/delete/${chatId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Content-Type': 'application/json',
          },
        });
        const respText = await res.text();
        console.log('Status:', res.status, 'Body:', respText);

        if (!res.ok) {
          throw new Error('Erro ao deletar chat');
        }

        // Remover do state local
        setChatslist((prev) => prev.filter((chat) => chat.id !== chatId));
        // (Opcional) Se o chat deletado era o selecionado, deselecione
        if (selectedChatId === chatId) setSelectedChatId("");
      } catch(err) {
        console.error('Erro ao deletar chat:', err);
      }
    }


  return (
    <aside className="flex flex-col gap-6 shadow-[0px_17px_40px_4px_rgba(112,144,176,0.11)] w-[310px] h-full bg-white pt-6 px-0 py-0 rounded-[20px] max-md:w-full">
      <div className=" text-center text-[28px] px-5 py-0">
        <span className="text-[#1B2559] font-semibold">
          Contradiz
          <span className="font-bold text-[#846EE3]">AI</span>
        </span>
      </div>
      <div className="h-px w-full bg-[#E9EDF7]" />

      <nav className="flex flex-col gap-2 px-4 py-2">
        <div className="flex items-center justify-between px-2">
          <div className="text-xs font-semibold text-[#6B7280] uppercase">Chats</div>
          <button
            aria-label="Create Chat"
            onClick={handleOpenNewChat}
            className="group text-[#1B2559] text-xl font-bold hover:text-[#374151]"
          >
            <Icon icon="tabler:plus" className="text-gray-600 group-hover:text-[#846EE3] transition-colors duration-100 cursor-pointer" />
          </button>
        </div>
        {chats.map(chat => (
          <div
            key={chat.id}
            className={`flex items-center justify-between group rounded-lg px-2 py-2 hover:bg-[#F3F4F6] ${selectedChatId === chat.id ? "bg-[#E9EDF7]" : ""}`}
          >
            <button
              onClick={() => setSelectedChatId(chat.id)}
              className="flex-1 text-[#1B2559] text-sm text-left truncate"
            >
              {chat.name || "Chat"}
            </button>
            <button
              aria-label="Excluir chat"
              onClick={() => handleDeleteChat(chat.id)}
              className="ml-2 opacity-60 group-hover:opacity-100 transition-opacity hover:text-red-500"
            >
              <Icon icon="tabler:trash" className="w-5 h-5" />
            </button>
          </div>
        ))}
      </nav>

      <div className="flex items-center justify-between gap-3 bg-white mt-auto mx-3.5 p-3.5 rounded-[30px] shadow-[14px_17px_40px_4px_rgba(112,144,176,0.08)]">
        <div className="text-[#1B2559] text-sm font-bold">{username}</div>
        <button aria-label="Logout" onClick={handleLogout} className="group flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-red-600 transition-colors duration-300">
          <Icon icon="tabler:logout-2" className="text-[#1B2559] group-hover:text-white transition-colors duration-100" />
        </button>
      </div>
    </aside>
  );
};

