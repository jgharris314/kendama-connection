import { navItemChildStyles, navItemParentStyles } from "../constants"

export default function NavItem({
  href,
  title,
}: {
  href: string
  title: string
}) {
  return (
    <li className={navItemParentStyles}>
      <a className={navItemChildStyles} href={href === "/home" ? "/" : href}>
        {title}
      </a>
    </li>
  )
}
