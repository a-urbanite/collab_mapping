import React from 'react'
import Link from 'next/link'

const MenuPoint = ({name, href, className}: any) => {
  return (
    <li className={className}>
      <Link href={href}>{name}</Link>
    </li>
  )
}

export default MenuPoint