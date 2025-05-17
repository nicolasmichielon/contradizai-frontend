"use client";
import React, { useState } from "react";
import { InputField } from "@/components/ui/input-field";
import Link from "next/link";
import { loginUser } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = formData.username
    const password = formData.password
    try {
      const userData = await loginUser(username, password);

      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData.user));

      router.push('/');
    } catch (err: any) {
      alert("falha no login:" + err)
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center px-[30px] py-0">
      <div className="flex w-[497px] flex-col gap-[30px] max-sm:w-full">
        <div className="flex flex-col gap-4">
          <h1 className="text-[#1B2559] text-4xl font-normal">
            Pronto para se arrepender?
          </h1>
          <p className="text-[#292929] text-xl font-normal">
            Se conseguir entrar, parabéns.<br/> 
            <span className="text-sm block mt-1">
            Não tem uma conta? Crie 
            <Link href="/sign-up" className="text-[#292929] underline ml-1">
              aqui
            </Link>
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 w-full">
            <InputField
              type="text"
              name="username"
              placeholder="Usuário"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <InputField
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
          </div>

          <button
            type="button"
            className="text-black text-xl font-medium underline tracking-[0.6px] text-center mt-2"
            onClick={() => console.log("Password reset requested")}
          >
            Esqueceu a sua senha? A gente também
          </button>

          <div className="w-full h-px bg-[#D2D2D2] my-2" />

          <button
            type="submit"
            className="w-48 h-[54px] text-white text-base font-semibold bg-[#1B2554] rounded-xl flex items-center justify-center cursor-pointer"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
