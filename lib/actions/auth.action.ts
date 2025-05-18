export async function signUpUser( username:string, password:string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Erro no login');
        }

        const data = await res.json();

        return { success: true, data };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}


export async function loginUser(username: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password }),
    });
  
    if (!res.ok) throw new Error('Erro ao fazer login');
  
    return res.json();
  }