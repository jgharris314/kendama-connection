export default function ErrorSection({ errors }: { errors: string }) {
  return (
    <div
      className={`flex h-12 w-[16rem] md:h-20 md:w-[19rem]  text-center items-center justify-center mb-4 ${
        errors && "bg-kenConnect-red text-kenConnect-white rounded"
      }`}
    >
      {errors && <span>{errors}</span>}
    </div>
  )
}
