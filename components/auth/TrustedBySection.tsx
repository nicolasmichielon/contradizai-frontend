import React from 'react'

interface StatisticProps {
  number: string
  label: string
}

const Statistic: React.FC<StatisticProps> = ({ number, label }) => (
  <div className="text-white uppercase max-sm:w-full max-sm:text-center">
    <div className="text-2xl mb-1">{number}</div>
    <div className="text-base">{label}</div>
  </div>
)

export const TrustedBySection: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center mt-6">
      <h3 className="text-white text-2xl font-semibold mb-6 text-center">
        TRUSTED BY
      </h3>
      <div className="flex items-center justify-center gap-8 flex-wrap w-full">
        <Statistic number="100,000+" label="VIBE CODERS" />
        <Statistic number="500+" label="ORGANIZATIONS" />
        <Statistic number="20+" label="INDUSTRIES" />
      </div>
    </div>
  )
}
