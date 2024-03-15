import { v4 as uuidv4 } from "uuid"
import { RxHamburgerMenu } from "react-icons/rx"
import { MdClose } from "react-icons/md"
import { useSignOut } from "hooks/useSignOut"
import { useUser } from "hooks/useUser"
import { getLoggedInStatus } from "utils/UserAuth/functions"
import SectionContainer from "../../../SectionContainer"
import { useNavigate } from "react-router-dom"
import { navOptions } from "../constants"
import MobileNavItem from "./NavItem"

export default function MobileNav() {
  const user = useUser()
  const isLoggedIn = getLoggedInStatus(user)
  const onSignOut = useSignOut()
  const navigate = useNavigate()

  function setIsOpen() {
    document.getElementById("menu-container")?.classList.toggle("invisible")
    document.getElementById("me-bg")?.classList.toggle("opacity-0")
    document.getElementById("open-btn")?.classList.toggle("hidden")
    document.getElementById("close-btn")?.classList.toggle("hidden")
    document.getElementById("menu")?.classList.toggle("-translate-y-full")
    document.getElementById("menu")?.classList.toggle("opacity-0")
  }

  function onClickHandler(option: string) {
    const route = option.toLowerCase() === "home" ? "/" : `/${option}`
    navigate(route)
    setIsOpen()
  }

  return (
    <>
      <SectionContainer
        bgClasses="lg:hidden bg-kenConnect-black bg-gradient-to-t from-black/50 to-black/10 fixed h-16 w-screen left-0 top-0 z-50"
        additionalContentClasses="flex w-full h-16 items-center"
      >
        <div className="w-1/3">
          <button
            type="button"
            onClick={() => setIsOpen()}
            className="h-12 flex items-center"
          >
            <MdClose
              size={35}
              color={"#d1d5dc"}
              id="close-btn"
              className="hidden"
            />
            <RxHamburgerMenu size={35} color={"#d1d5dc"} id="open-btn" />
          </button>
        </div>
        <div className="relative flex w-1/3 justify-center bg-contain text-white"></div>
        <div className="w-1/3" />
      </SectionContainer>

      <div
        id="menu-container"
        className="invisible h-screen fixed top-16 left-0 w-screen inset-0 bg-kenConnect-black bg-gradient-to-b from-black/90 to-black/0 z-50"
      >
        <div
          id="menu-bg"
          className="absolute inset-0 w-full h-full opacity-0 duration-500 ease-in-out transition-all  "
        />
        <ul
          id="menu"
          className="absolute flex flex-col gap-4 w-full items-start justify-start text-kenConnect-white pb-4 md:px-1 right-0 top-0 -translate-y-full duration-500 ease-in-out transition-all opacity-0"
        >
          {navOptions.map((option) => {
            return (
              <MobileNavItem
                key={uuidv4()}
                onClickOption={option}
                onClickHandler={onClickHandler}
                title={option}
              />
            )
          })}
          {isLoggedIn ? (
            <>
              <button
                key={uuidv4()}
                type="button"
                onClick={() => onClickHandler("account")}
                className={
                  "capitalize w-full pb-4  text-[20px] font-semibold border-white border-b-2 flex items-center justify-center"
                }
              >
                Account
              </button>
              <button
                key={uuidv4()}
                type="button"
                onClick={() => onSignOut()}
                className={
                  "capitalize w-full pb-4  text-[20px] font-semibold border-white border-b-2 flex items-center justify-center"
                }
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                key={uuidv4()}
                type="button"
                onClick={() => onClickHandler("auth/signup")}
                className={
                  "capitalize w-full pb-4  text-[20px] font-semibold border-white border-b-2 flex items-center justify-center"
                }
              >
                Sign Up
              </button>
              <button
                key={uuidv4()}
                type="button"
                onClick={() => onClickHandler("auth/login")}
                className={
                  "capitalize w-full pb-4  text-[20px] font-semibold border-white border-b-2 flex items-center justify-center"
                }
              >
                Login
              </button>
            </>
          )}
        </ul>
      </div>
    </>
  )
}
