import { useNavigate } from "react-router-dom"

export default function NotAMember() {
  const navigate = useNavigate()

  return (
    <>
      <div className="flex flex-col w-full h-full items-center justify-center text-kenConnect-white gap-8 mt-16">
        <span className="font-semibold text-[1.5rem]">
          Wanting to list an event?
        </span>

        <h2 className="flex flex-col md:flex-row md:gap-3 text-center text-[2.75rem] leading-[2.75rem] font-black">
          <span>Memberships</span> <span>are</span>{" "}
          <span className="border-b-8 border-kenConnect-red max-w-min self-center">
            free!
          </span>
        </h2>

        <button
          className="button button-yellow"
          type="button"
          onClick={() => navigate("/auth/signup")}
        >
          Sign up
        </button>
      </div>

      <div className="flex flex-col w-full h-full items-center justify-center text-kenConnect-white gap-8 mt-8">
        <span className="font-semibold text-[1.5rem]">Already a member?</span>

        <button
          className="button button-yellow"
          type="button"
          onClick={() => navigate("/auth/login")}
        >
          Log in
        </button>
      </div>
    </>
  )
}
