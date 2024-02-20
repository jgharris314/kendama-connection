export default function NavItem({
  href,
  title,
}: {
  href: string
  title: string
}) {
  return (
    <li className="border-r-2 border-white last:border-none w-full text-center pr-4">
      <a
        className="capitalize text-[20px] font-semibold hover:border-b-4 hover:border-black pb-2 text-white whitespace-nowrap"
        href={href === "/home" ? "/" : href}
      >
        {title}
      </a>
    </li>
  )
}
