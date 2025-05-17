import Image from 'next/image';
import React from 'react';
import { TrustedBySection } from './TrustedBySection';

export default function BrandingSection() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-6 bg-[#1B2554]">
      <div className="flex flex-col justify-center items-center gap-6 w-full">
        <div className="flex flex-col justify-center items-center gap-2.5">
          <Image
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/eedb2b20ed8d5f2d6a4de5a503477dda68eeee19"
            width={216}
            height={196}
            alt="Robot icon"
            className="object-contain"
          />
          <h2 className="text-white text-center text-[80px] font-normal tracking-[2.4px] max-md:text-6xl max-sm:text-[40px]">
            Confusão garantida. Lógica? Nem tanto.
          </h2>
        </div>
        <Image
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/028d0c2abf2ebc86886ec6cbc32aae523440d01e"
          width={852}
          height={458}
          alt="Chat interface"
          className="max-md:w-full max-md:h-auto object-contain"
        />
        <TrustedBySection />
      </div>
    </div>
  );
}
