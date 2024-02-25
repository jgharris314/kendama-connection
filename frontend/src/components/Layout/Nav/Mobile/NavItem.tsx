export default function MobileNavItem({
  title,
  onClickOption,
  onClickHandler,
}: {
  title: string
  onClickOption: string
  onClickHandler: (option: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onClickHandler(onClickOption)}
      className={
        "first:border-t-2 first:pt-4 capitalize w-full pb-4  text-[20px] font-semibold border-white border-b-2 flex items-center justify-center"
      }
    >
      {title}
    </button>
  )
}
