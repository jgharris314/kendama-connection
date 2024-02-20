import React from "react"
import { useFormContext } from "react-hook-form"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement | HTMLInputElement> {
  name: string
  id: string
  label?: string
  defaultValue?: string
  placeholder?: string
  parentClasses?: string
  labelClasses?: string
  inputClasses?: string
  type?: string
  validation?: Record<string, any>
}

export default function Input({
  parentClasses,
  labelClasses,
  inputClasses,
  placeholder,
  validation,
  label,
  name,
  id,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<any>()

  // @ts-expect-error rows exists on html text area
  const { rows } = rest

  const Element = rows ? "textarea" : "input"

  return (
    <div className={parentClasses}>
      {label && (
        <label className={labelClasses} htmlFor={id}>
          {label}
        </label>
      )}
      <Element
        {...register(name, validation)}
        placeholder={placeholder}
        {...rest}
        className={inputClasses}
      />
      {errors[name] && (
        <p className="text-mothOrange-0">{String(errors[name]?.message)}</p>
      )}
    </div>
  )
}
