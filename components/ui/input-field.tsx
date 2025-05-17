import React from 'react'

interface InputFieldProps {
  type: string
  name: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

export const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}) => (
  <div className="flex flex-col w-full gap-1">
    <div
      className={`flex items-center gap-2 w-full border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white p-4 rounded-lg ${
        error ? 'border-red-500' : 'border-[#EFEFEF]'
      }`}
    >
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full text-[#5F5F5F] text-base border-none outline-none"
      />
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
)
