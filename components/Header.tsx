import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Wrapper from './Wrapper'

export default function Header() {
  const router = useRouter()
  const home = router.pathname === '/' ? true : false

  return (
    <header
      role="banner"
      className="flex flex-col font-sans items-center justify-between md:flex-row"
    >
      <Wrapper
        condition={home}
        wrapper={(children: React.ReactNode) => <h1 className="text-base">{children}</h1>}
      >
        <Link href="/">
          <a className="font-bold">Code Translate</a>
        </Link>
      </Wrapper>
      <nav role="navigation" aria-label="main navigation" className="mt-4 md:ml-4 md:mt-0">
        <ul className="flex items-center">
          <NavLink href="/code" title="Authors" />
        </ul>
      </nav>
    </header>
  )
}

function NavLink({ href, title }: NavLinkProps) {
  return (
    <li className="mx-2 md:ml-4 md:mx-0">
      <Link href={href}>{title}</Link>
    </li>
  )
}
