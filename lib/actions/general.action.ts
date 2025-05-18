export async function createChat(userId: string, token: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId }),
        });
        if (!res.ok) throw new Error(`Failed to create chat: ${res.status}`);
        const newChat: Chat = await res.json();
        return newChat

	} catch (err) {
		console.error(err);
	}
}

export async function getChats(userId: string, token: string) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/chat/user/${userId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!res.ok) throw new Error(`Failed to fetch chats: ${res.status}`);
		const data: Chat[] = await res.json();
		return data
	} catch (err) {
		console.error("Error fetching chats:", err);
	}
}