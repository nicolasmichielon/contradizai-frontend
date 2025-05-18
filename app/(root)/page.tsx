'use client';
import { ChatLayout } from "@/components/chat/ChatLayout";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<userData>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('user');

    if (!token || !userInfo) {
      router.push('/sign-in');
    } else {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  if (!user) return <p>Carregando...</p>;

  return <ChatLayout />;
}
