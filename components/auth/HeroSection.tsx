import React from 'react'
import { TrustedBySection } from './TrustedBySection'

export const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full bg-[#1B2554] py-12 px-4">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b21bbffb801d5726de0cd80aa84e6b8fb64d3192"
        className="w-[120px] h-[110px] mb-6"
        alt="Robot"
      />
      <h2 className="text-white text-center text-3xl md:text-5xl font-normal mb-6 leading-tight">
        Confusão garantida.<br />Lógica? Nem tanto.
      </h2>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/39f7ee0e0e29ed3427128b6780f704b0e73e15ab"
        className="w-full max-w-[400px] h-auto mb-6"
        alt="Chat interface"
      />
      <TrustedBySection />
    </section>
  )
}
