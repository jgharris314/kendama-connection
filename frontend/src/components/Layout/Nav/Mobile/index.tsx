import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { RxHamburgerMenu } from "react-icons/rx"
import { MdClose } from "react-icons/md"
import SectionContainer from "../../../SectionContainer"
import { useNavigate } from "react-router-dom"
import { navOptions } from "../constants"
import UserAccountMenu from "../UserAccountMenu"

export default function MobileNav() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  function onClickHandler(option: string) {
    const route = `/${option}`
    navigate(route)
    setIsOpen(false)
  }

  return (
    <>
      <SectionContainer
        bgClasses="lg:hidden bg-cernik-nav bg-gradient-to-t from-black/50 to-black/10 fixed h-16 w-screen left-0 top-0 z-50"
        additionalContentClasses="flex w-full h-16 items-center"
      >
        <div className="w-1/3">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="h-12 flex items-center"
          >
            {isOpen ? (
              <MdClose size={35} color={"#d1d5dc"} />
            ) : (
              <RxHamburgerMenu size={35} color={"#d1d5dc"} />
            )}
          </button>
        </div>
        <div className="relative flex w-1/3 justify-center bg-contain">
          [logo]
        </div>
        <div className="w-1/3" />
      </SectionContainer>

      {isOpen && (
        <div className="h-screen fixed top-16 left-0 w-screen bg-kenConnect-black lg:hidden transition-transform z-50">
          {
            <ul className="flex flex-col w-full items-start justify-start text-kenConnect-white p-4 md:px-12">
              {navOptions.map((option) => {
                return (
                  <button
                    key={uuidv4()}
                    type="button"
                    onClick={() => onClickHandler(option)}
                    className={
                      "capitalize w-full h-32 text-[20px] font-semibold border-white border-b-2 flex items-center justify-center"
                    }
                  >
                    {option}
                  </button>
                )
              })}
              <UserAccountMenu />
            </ul>
          }
        </div>
      )}
    </>
  )
}
