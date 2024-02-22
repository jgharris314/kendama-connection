export default function ErrorSection({ errors }: { errors: string }) {
  return (
    <div
      className={`flex h-12 w-[16rem] md:w-[19rem] text-center items-center justify-center ${
        errors && "bg-kenConnect-red text-kenConnect-white rounded"
      }`}
    >
      {errors && <span>{errors}</span>}
    </div>
  )
}
