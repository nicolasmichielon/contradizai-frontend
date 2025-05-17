import React from 'react'
import { TrustedBySection } from './TrustedBySection'

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-[960px] h-[1189px] max-md:w-full max-md:h-auto max-md:min-h-[800px] bg-[#1B2554] rounded-3xl">
      <div className="absolute w-full h-full" />

      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b21bbffb801d5726de0cd80aa84e6b8fb64d3192"
        className="absolute w-[216px] h-[196px] left-[372px] top-[33px]"
        alt="Robot"
      />

      <h2 className="absolute w-[762px] text-white text-center text-[80px] tracking-[2.4px] left-[98px] top-[201px] max-md:w-[90%] max-md:text-6xl max-md:left-[5%] max-sm:text-[40px] font-normal">
        Confusão garantida. Lógica? Nem tanto.
      </h2>

      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/39f7ee0e0e29ed3427128b6780f704b0e73e15ab"
        className="absolute w-[852px] h-[458px] left-[54px] top-[463px] max-md:w-[90%] max-md:h-auto max-md:left-[5%]"
        alt="Chat interface"
      />

      <TrustedBySection />
    </section>
  )
}
