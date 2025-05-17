import React from 'react'
import { RegistrationForm } from '../components/auth/RegistrationForm'
import { HeroSection } from '../components/auth/HeroSection'

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex w-full max-w-[1846px] justify-center items-center gap-[323px] max-md:flex-col max-md:gap-[60px]">
        <RegistrationForm />
        <HeroSection />
      </div>
    </main>
  )
}
