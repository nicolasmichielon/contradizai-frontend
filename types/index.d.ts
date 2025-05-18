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
    name: string;
    userId: string;
}

interface SidebarProps {
    selectedChatId: string;
    setSelectedChatId: (id: string) => void;
}
