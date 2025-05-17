"use client";
import React, { useState } from 'react'
import { InputField } from '../ui/input-field'

export const RegistrationForm: React.FC = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Form submitted:', formData)
    }
  }

  return (
    <section className="flex flex-col items-start gap-[30px] flex-1 min-w-[320px] max-w-[450px] py-12 px-4">
      <div className="flex flex-col items-start gap-4 w-full">
        <h1 className="text-[#1B2559] text-4xl font-normal">
          Cadastre-se gratuitamente
        </h1>
        <p className="text-[#292929] text-xl">
          <span>Prometemos nada com nada.</span>
          <span className="text-sm block mt-1">
            Já tem conta? Faça login
            <a href="#" className="text-[#292929] underline ml-1">
              aqui
            </a>
            .
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
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

        <div className="w-full h-px bg-[#D2D2D2] my-4" />

        <button
          type="submit"
          className="w-48 h-[54px] text-white text-base font-semibold bg-[#1B2554] rounded-xl hover:bg-[#141b3d] transition-colors"
        >
          Cadastrar
        </button>
      </form>
    </section>
  )
}
