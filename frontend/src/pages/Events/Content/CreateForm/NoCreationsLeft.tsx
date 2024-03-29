export default function NoCreationsLeft() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center text-kenConnect-white gap-8 mt-16">
      <span className="font-semibold text-[1.5rem] text-center">
        Shucks! You&apos;ve hit your monthly event creation limit
      </span>

      <h2 className="flex flex-col md:flex-row md:gap-3 text-center text-[2.75rem] leading-[2.75rem] font-black border-b-8 border-kenConnect-red pb-1">
        <span>Uprgrade</span> <span>your</span>{" "}
        <span className=" max-w-min self-center">membership!</span>
      </h2>

      <button
        className="button button-yellow"
        type="button"
        onClick={() => alert("Feature under development <3")}
      >
        Upgrade Membership!
      </button>
    </div>
  )
}
