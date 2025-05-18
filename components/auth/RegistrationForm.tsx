"use client";
import React, { useState } from 'react'
import { InputField } from '../ui/input-field'
import Link from 'next/link'
import { signUpUser } from '@/lib/actions/auth.action';
import { loginUser } from '@/lib/actions/auth.action';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';

export const RegistrationForm: React.FC = () => {
  const router = useRouter();
  const [loading, isLoading] = useState(false)
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

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!formData.username.trim()) {
      newErrors.username = 'Usuário é obrigatório'
      valid = false
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
      valid = false
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
      valid = false
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const username = formData.username
      const password = formData.password
      isLoading(true)
      try {
        await signUpUser(username, password); // cadastra
        const userData = await loginUser(username, password); // login automático

        localStorage.setItem('token', userData.token); // ou use cookies
        localStorage.setItem('user', JSON.stringify(userData.user));

        router.push('/');
      } catch (err: any) {
        isLoading(false)
        setErrors(err.message);
      }
    }
  }


  return (
    <div className="flex-1 flex justify-center items-center px-[30px] py-0">
      <div className="flex w-[497px] flex-col gap-[30px] max-sm:w-full">
        <div className="flex flex-col gap-4">
          <h1 className="text-[#1B2559] text-4xl font-normal">
            Cadastre-se gratuitamente
          </h1>
          <p className="text-[#292929] text-xl font-normal">
            Prometemos nada com nada.<br />
          </p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full">
          <InputField
            type="text"
            name="username"
            placeholder="Usuário"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
          <InputField
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <InputField
            type="password"
            name="confirmPassword"
            placeholder="Confirme a senha"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            className="h-[54px] text-white text-base font-semibold bg-[#1B2554] rounded-xl hover:bg-[#141b3d] transition-colors cursor-pointer"
          >
            {
              loading ?
              <ClipLoader color="#ffffff" size={20} />
              :
              <p>Cadastrar</p>
            }

          </button>
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-600">
              Já tem conta?{' '}
              <Link href="/sign-in" className="text-blue-600 hover:underline">
                Faça login aqui
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
