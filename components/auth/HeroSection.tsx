import React from 'react'
import { TrustedBySection } from './TrustedBySection'

export const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full bg-[#1B2554] py-12 px-4">
      <img
        src="/herosection_robot.png"
        className="w-[120px] h-[110px] mb-6"
        alt="Robot"
      />
      <h2 className="text-white text-center text-3xl md:text-5xl font-normal mb-6 leading-tight">
        Confusão garantida.<br />Lógica? Nem tanto.
      </h2>
      <img
        src="/herosection.png"
        className="w-full max-w-[400px] h-auto mb-6"
        alt="Chat interface"
      />
      <TrustedBySection />
    </section>
  )
}
