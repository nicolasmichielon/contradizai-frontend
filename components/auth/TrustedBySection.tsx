import React from 'react'

interface StatisticProps {
  number: string
  label: string
}

const Statistic: React.FC<StatisticProps> = ({ number, label }) => (
  <div className="text-white uppercase max-sm:w-full max-sm:text-center">
    <div className="text-4xl mb-1">{number}</div>
    <div className="text-xl">{label}</div>
  </div>
)

export const TrustedBySection: React.FC = () => {
  return (
    <div className="absolute w-[989px] left-[37px] bottom-14 max-md:w-[90%] max-md:left-[5%]">
      <h3 className="text-white text-2xl font-semibold mb-6 max-sm:text-center max-sm:w-full">
        TRUSTED BY
      </h3>
      <div className="flex items-center gap-[120px] ml-[202px] max-md:gap-[60px] max-sm:flex-col max-sm:gap-[30px] max-sm:items-start max-sm:ml-0 max-sm:w-full max-sm:text-center">
        <Statistic number="100,000+" label="VIBE CODERS" />
        <Statistic number="500+" label="ORGANIZATIONS" />
        <Statistic number="20+" label="INDUSTRIES" />
      </div>
    </div>
  )
}
