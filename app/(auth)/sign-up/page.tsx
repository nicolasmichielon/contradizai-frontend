// import AuthForm from "@/components/AuthForm";

// const Page = () => {
//   return <AuthForm type="sign-up" />;
// };

// export default Page;


import React from 'react'
import { RegistrationForm } from '../../../components/auth/RegistrationForm'
import { HeroSection } from '../../../components/auth/HeroSection'

export default function Home() {
  return (
    <main className="flex w-full h-screen bg-white">
      <div className="flex w-full h-full">
        <div className="flex flex-col flex-1 h-full items-start justify-start pl-32 pt-16">
          <RegistrationForm />
        </div>
        <div className="w-[50vw] h-full">
          <HeroSection />
        </div>
      </div>
    </main>
  )
}
