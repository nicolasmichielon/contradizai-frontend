"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputField } from "@/components/ui/input-field";
import { cn } from "@/lib/utils"; // If you use a classnames utility
import Link from "next/link";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Usuário é obrigatório" }),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Form submitted:", data);
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 w-full">
            <InputField
              {...register("username")}
              placeholder="Usuário"
              className={cn(
                "text-[#5F5F5F] text-base font-normal leading-6 border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white p-4 rounded-lg border-solid border-[#EFEFEF]",
                errors.username && "border-red-500"
              )}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <InputField
              {...register("password")}
              type="password"
              placeholder="Senha"
              className={cn(
                "text-[#5F5F5F] text-base font-normal leading-6 border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white p-4 rounded-lg border-solid border-[#EFEFEF]",
                errors.password && "border-red-500"
              )}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
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
            className="w-48 h-[54px] text-white text-base font-semibold bg-[#1B2554] rounded-xl flex items-center justify-center"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
