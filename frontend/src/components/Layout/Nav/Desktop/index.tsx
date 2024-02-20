import { v4 as uuidv4 } from "uuid"
import SectionContainer from "../../../SectionContainer"
import { navOptions } from "../constants"
import NavItem from "./NavItem"
import UserAccountMenu from "components/Layout/Nav/UserAccountMenu"

export default function DesktopNav() {
  return (
    <SectionContainer bgClasses="hidden lg:block bg-black bg-gradient-to-t from-black/50 to-black/10 fixed h-[3.5rem] w-screen left-0 top-0 z-50 !pt-0">
      <div className="relative flex w-full justify-between h-[3.5rem] items-center">
        <div className="w-full">[LOGO]</div>
        <ul className="flex w-full justify-end gap-4">
          {navOptions.map((option) => {
            return <NavItem href={`/${option}`} title={option} key={uuidv4()} />
          })}
          <UserAccountMenu />
        </ul>
      </div>
    </SectionContainer>
  )
}
