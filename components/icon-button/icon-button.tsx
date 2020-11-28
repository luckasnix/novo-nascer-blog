import { ComponentType } from 'react'
import Link from 'next/link'
import styles from './icon-button.module.scss'

export interface IconButtonProps {
  title: string
  link: {
    href: string
    as: string
  }
  icon: ComponentType
}

export default function IconButton({
  title,
  link,
  icon: Icon
}: IconButtonProps) {
  return (
    <Link href={link.href} as={link.as}>
      <a className={styles.iconButton}>
        <button>
          <Icon/>
          <span>{title}</span>
        </button>
      </a>
    </Link>
  )
}
