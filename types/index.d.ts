interface userData {
	id: string;
	username: string;
	created_at: string;
};

interface formData {
	username: string;
	password: string;
	confirmPassword?: string;
};

interface Chat {
	id: string;
	title: string;
	userId: string;
}

interface SidebarProps {
    selectedChatId: string;
    setSelectedChatId: (id: string) => void;
    chats: Chat[];
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatAreaProps {
  chatId: string;
  setChatId: (id: string) => void;
  setChats: (chats: Chat[]) => void;
  setSelectedChatId: (id: string) => void;
}


interface ChatInputProps {
  onSendMessage: (message: string) => void;
}
