import type { ReactNode } from "react"

export default function SectionContainer({
  bgClasses,
  additionalContentClasses,
  children,
  id,
}: {
  bgClasses?: string
  additionalContentClasses?: string
  children: ReactNode
  id?: string
}) {
  return (
    <div className={`w-full ${bgClasses}`} id={id}>
      <div
        className={`layout-content-container layout-padding xl:px-0 ${additionalContentClasses}`}
      >
        {children}
      </div>
    </div>
  )
}
